import * as jquery from "jquery"

interface Gift {
    Id : Number;
    ApplicationUserId : Number;
    Title : string;
    Description : string;
}

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

function postGift(gift : Gift) : JQueryXHR
{
    return postJson(gifturl, gift);
}

function getGifts() : JQueryXHR
{
    return jquery.getJSON(gifturl);
}