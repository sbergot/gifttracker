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

export function refreshDataContext(context: GT.DataContext): GT.DataContext {
    return {
        ...context,
        eventGiftsMap: groupBy(Object.values(context.giftMap), g => g.eventId!, g => g.id),
        giftReceiversMap: groupBy(context.giftReceiverPairs, gr => gr[0].toString(), gr => gr[1].toString()),
        receiverGiftsMap: groupBy(context.giftReceiverPairs, gr => gr[1].toString(), gr => gr[0].toString()),
    }
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

    getSortedEvents(): GT.Event[] {
        return sortByEvents(this.getAllEvents(), e => e);
    }

    getSortedIndividuals(): GT.Individual[] {
        return sortByIndividuals(this.getAllIndividuals(), i => i);
    }

    getGiftsReceived = (indivId: string): GT.Gift[] => {
        const giftIds = this.context.receiverGiftsMap[indivId] || [];
        return giftIds.map(this.getGift);
    }
}