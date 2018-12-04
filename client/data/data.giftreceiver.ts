import * as data from "./data.shared";

const gifturl = "./api/giftreceiver";

function buildurl(giftId : GT.Id, receiverId: GT.Id): string {
    return `${gifturl}/${giftId}/${receiverId}`
}

export function postGiftReceiver(giftId : GT.Id, receiverId: GT.Id) : Promise<unknown>
{
    return data.postJson(buildurl(giftId, receiverId), {});
}

export function deleteGiftReceiver(giftId : GT.Id, receiverId: GT.Id) : Promise<unknown>
{
    return data.sendJson(buildurl(giftId, receiverId), data.Verbs.DELETE, null);
}
