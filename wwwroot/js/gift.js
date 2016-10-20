import * as jquery from "jquery";
var gifturl = "./api/gift";
function postJson(url, payload) {
    var settings = {
        url: url,
        method: "POST",
        data: payload,
        headers: { "Content-Type": "application/json" }
    };
    return jquery.ajax(settings);
}
function postGift(gift) {
    return postJson(gifturl, gift);
}
function getGifts() {
    return jquery.getJSON(gifturl);
}
