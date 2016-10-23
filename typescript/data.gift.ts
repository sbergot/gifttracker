import * as jquery from "jquery"

let gifturl = "./api/gift";

function sendJson<T>(url : string, verb : string, payload : T) : JQueryXHR
{
    let settings : JQueryAjaxSettings = {
        url : url,
        method : verb,
        data : JSON.stringify(payload),
        headers : {"Content-Type" : "application/json"}
    };
    return jquery.ajax(settings);
}

export function postGift(gift : Gift) : JQueryPromise<Gift>
{
    return sendJson(gifturl, "POST", gift);
}

export function putGift(gift : Gift) : JQueryPromise<Gift>
{
    return sendJson(gifturl + `/${gift.id}`, "PUT", gift);
}

export function getGifts() : JQueryPromise<Gift[]>
{
    return jquery.getJSON(gifturl);
}
