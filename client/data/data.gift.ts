import { sendJson, Verbs } from "./data.shared";
import { Gift } from "../models/models.base";

const gifturl = "./api/gift";

export function postGift(gift : Gift) : JQueryPromise<Gift>
{
    return sendJson(gifturl, Verbs.POST, gift);
}

export function putGift(gift : Gift) : JQueryPromise<Gift>
{
    return sendJson(`${gifturl}/${gift.id}`, Verbs.PUT, gift);
}

export function deleteGift(giftId : number) : JQueryPromise<Gift>
{
    return sendJson(`${gifturl}/${giftId}`, Verbs.DELETE, null);
}

export function getGifts() : JQueryPromise<Gift[]>
{
    return jquery.getJSON(gifturl);
}
