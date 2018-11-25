import { getJson, sendJson, Verbs } from "./data.shared"

const URL = "./api/referential";

interface ReferentialData
{
    eventMap: GT.KeyMap<GT.Event>;
    individualMap: GT.KeyMap<GT.Individual>;
    giftMap: GT.KeyMap<GT.Gift>;
    giftReceiverPairs: Array<[number, number]>;
}

function groupBy<T, V>(
    coll: T[],
    keyResolver: (o:T) => string,
    valueResolver: (o:T) => V)
    : Record<string, V[]> {
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

function createDataContext(referentialData: ReferentialData): GT.DataContext {
    return {
        giftMap: referentialData.giftMap,
        individualMap: referentialData.individualMap,
        eventMap: referentialData.eventMap,
        eventGiftsMap: groupBy(Object.values(referentialData.giftMap), g => g.eventId!, g => g.id),
        giftReceiversMap: groupBy(referentialData.giftReceiverPairs, gr => gr[0].toString(), gr => gr[1].toString()),
        receiverGiftsMap: groupBy(referentialData.giftReceiverPairs, gr => gr[1].toString(), gr => gr[0].toString())
    }
}

export async function getReferential() : Promise<GT.DataContext>
{
    const rd = await getJson<ReferentialData>(URL);
    return createDataContext(rd);
}
