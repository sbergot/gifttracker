import * as jquery from "jquery"
import { sendJson } from "./data.shared";
import { Gift } from "./models";

let gifturl = "./api/gift";

export function postGift(gift : Gift) : JQueryPromise<Gift>
{
    return sendJson(gifturl, "POST", gift);
}

export function putGift(gift : Gift) : JQueryPromise<Gift>
{
    return sendJson(`${gifturl}/${gift.id}`, "PUT", gift);
}

export function deleteGift(giftId : number) : JQueryPromise<Gift>
{
    return sendJson(`${gifturl}/${giftId}`, "DELETE", {});
}

export function getGifts() : JQueryPromise<Gift[]>
{
    return jquery.getJSON(gifturl);
}
