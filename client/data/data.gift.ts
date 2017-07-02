import * as data from "./data.shared";
import { Gift } from "../models/models.base";

const gifturl = "./api/gift";

export function postGift(gift : Gift) : Promise<Gift>
{
    return data.postJson(gifturl, gift);
}

export function putGift(gift : Gift) : Promise<Gift>
{
    return data.putJson(`${gifturl}/${gift.id}`, gift);
}

export async function deleteGift(giftId : number) : Promise<Gift>
{
    const response = await data.sendJson(`${gifturl}/${giftId}`, data.Verbs.DELETE, null);
    return await response.json();
}

export async function getGifts() : Promise<Gift[]>
{
    return data.getJson<Gift[]>(gifturl);
}
