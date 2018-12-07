import { getJson } from "./data.shared"
import { refreshDataContext } from "../services/service.referential"

const URL = "./api/referential";

interface ReferentialData
{
    eventMap: GT.KeyMap<GT.Event>;
    individualMap: GT.KeyMap<GT.Individual>;
    giftMap: GT.KeyMap<GT.Gift>;
    giftReceiverPairs: Array<[number, number]>;
    currentUserId: number;
}

function createDataContext(referentialData: ReferentialData): GT.DataContext {
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
    })
}

export async function getReferential() : Promise<GT.DataContext>
{
    const rd = await getJson<ReferentialData>(URL);
    return createDataContext(rd);
}
