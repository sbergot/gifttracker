import * as data from "./data.shared";

const gifturl = "./api/giftreceiver";

function buildurl(giftId : GT.Id, receiverId: GT.Id): string {
    return `${gifturl}/${giftId}/${receiverId}`
}

export async function postGiftReceiver(giftId : GT.Id, receiverId: GT.Id) : Promise<void>
{
    await data.sendJson(buildurl(giftId, receiverId), data.Verbs.POST, {});
}

export async function deleteGiftReceiver(giftId : GT.Id, receiverId: GT.Id) : Promise<void>
{
    await data.sendJson(buildurl(giftId, receiverId), data.Verbs.DELETE, null);
}

export async function updateGiftReceivers(updates: GT.GiftReceiverUpdate[]): Promise<void> {
    await data.sendJson(`${gifturl}/updates`, data.Verbs.POST, updates);
}