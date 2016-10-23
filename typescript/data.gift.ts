import * as jquery from "jquery"

let gifturl = "./api/gift";

function postJson<T>(url : string, payload : T) : JQueryXHR
{
    let settings : JQueryAjaxSettings = {
        url : url,
        method : "POST",
        data : payload,
        headers : {"Content-Type" : "application/json"}
    };
    return jquery.ajax(settings);
}

export function postGift(gift : Gift) : JQueryPromise<Gift>
{
    return postJson(gifturl, gift);
}

export function getGifts() : JQueryPromise<Gift[]>
{
    return jquery.getJSON(gifturl);
}
