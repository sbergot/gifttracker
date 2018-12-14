import { produce } from "immer";
import { sortByEvents, sortByIndividuals } from "./service.referential";

function groupBy<T, V>(
    coll: T[],
    keyResolver: (o: T) => string,
    valueResolver: (o: T) => V): Record<string, V[]> {
    const result: Record<string, V[]> = {};
    coll.forEach(v => {
        const key = keyResolver(v);
        if (!(key in result)) {
            result[key] = [];
        }
        result[key].push(valueResolver(v));
    })
    return result;
}

function convertIds(context: GT.DataContext): GT.DataContext {
    return produce(context, draft => {
        Object.values(draft.individualMap).forEach(i => { i.id = i.id.toString(); })
        Object.values(draft.eventMap).forEach(g => { g.id = g.id.toString(); })
        Object.values(draft.giftMap).forEach(g => {
            g.id = g.id.toString();
            g.ownerId = g.ownerId.toString();
            if (g.buyerId) { g.buyerId = g.buyerId.toString(); }
            if (g.eventId) { g.eventId = g.eventId.toString(); }
        })
    });
}

function refreshChildMaps(context: GT.DataContext): GT.DataContext {
    return produce(context, draft => {
        draft.eventGiftsMap = groupBy(Object.values(context.giftMap), g => g.eventId!, g => g.id);
        draft.giftReceiversMap = groupBy(context.giftReceiverPairs, gr => gr[0], gr => gr[1]);
        draft.receiverGiftsMap = groupBy(context.giftReceiverPairs, gr => gr[1], gr => gr[0]);
    });
}

export function refreshDataContext(context: GT.DataContext): GT.DataContext {
    return refreshChildMaps(convertIds(context));
}

export function fromReferentialData(referentialData: GT.ReferentialData): GT.DataContext {
    return refreshDataContext({
        giftMap: referentialData.giftMap,
        individualMap: referentialData.individualMap,
        eventMap: referentialData.eventMap,
        giftReceiverPairs: referentialData.giftReceiverPairs
            .map(([giftid, individ]) => [giftid.toString(), individ.toString()] as [GT.Id, GT.Id]),
        eventGiftsMap: {},
        giftReceiversMap: {},
        receiverGiftsMap: {},
        currentUserId: referentialData.currentUserId.toString()
    });
}

export class ContextServiceImpl implements GT.ContextService {
    constructor(private context: GT.DataContext) {
    }

    static fromReferentialData(referentialData: GT.ReferentialData) {
        return new ContextServiceImpl(fromReferentialData(referentialData));
    }

    getGift = (id: GT.Id) => this.context.giftMap[id];

    getEvent = (id: GT.Id) => this.context.eventMap[id];

    getIndividual = (id: GT.Id) => this.context.individualMap[id];

    getReceivers = (giftId: string): GT.Individual[] => {
        const receiverIds = this.getReceiverIds(giftId);
        return receiverIds.map(this.getIndividual);
    }

    getReceiverIds = (giftId: string): GT.Id[] => {
        return this.context.giftReceiversMap[giftId] || [];
    }

    getAllGifts = (): GT.Gift[] => {
        return Object.values(this.context.giftMap);
    }

    getAllEvents = (): GT.Event[] => {
        return Object.values(this.context.eventMap);
    }

    getAllIndividuals = (): GT.Individual[] => {
        return Object.values(this.context.individualMap);
    }

    getSortedEvents = (): GT.Event[] => {
        return sortByEvents(this.getAllEvents(), e => e);
    }

    getSortedIndividuals = (): GT.Individual[] => {
        return sortByIndividuals(this.getAllIndividuals(), i => i);
    }

    getGiftsReceived = (indivId: string): GT.Gift[] => {
        const giftIds = this.context.receiverGiftsMap[indivId] || [];
        return giftIds.map(this.getGift);
    }

    getCurrentUser = (): GT.Individual => {
        return this.getIndividual(this.context.currentUserId);
    }
}