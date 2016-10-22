System.register(["jquery"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var jquery;
    var gifturl;
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
    return {
        setters:[
            function (jquery_1) {
                jquery = jquery_1;
            }],
        execute: function() {
            gifturl = "./api/gift";
        }
    }
});
