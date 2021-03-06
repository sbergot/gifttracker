import * as data from "./data.shared";

const gifturl = "./api/gift";

export function postGift(gift : GT.Gift) : Promise<GT.Gift>
{
    return data.postJson(gifturl, gift);
}

export function putGift(gift : GT.Gift) : Promise<GT.Gift>
{
    return data.putJson(`${gifturl}/${gift.id}`, gift);
}

export async function deleteGift(giftId : GT.Id) : Promise<Response>
{
    const response = await data.sendJson(`${gifturl}/${giftId}`, data.Verbs.DELETE, null);
    return response;
}

export async function getGifts() : Promise<GT.Gift[]>
{
    return data.getJson<GT.Gift[]>(gifturl);
}
