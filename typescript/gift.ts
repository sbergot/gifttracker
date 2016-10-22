import * as jquery from "jquery"
import * as lodash from "lodash"

interface Gift {
    id : Number;
    applicationUserId : Number;
    title : string;
    description : string;
}

interface State {
    gifts : Gift[]
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

function postGift(gift : Gift) : JQueryPromise<Gift>
{
    return postJson(gifturl, gift);
}

function getGifts() : JQueryPromise<Gift[]>
{
    return jquery.getJSON(gifturl);
}

function viewGift(gift : Gift) : string {
    return `
    <div class="panel panel-default">
        <div class="panel-body">
            <dl class="dl-horizontal">
                <dt>Titre</dt>
                <dd>${gift.title}</dd>
                <dt>Description</dt>
                <dd>${gift.description}</dd>
            </dl>
            <button onclick="alert(${gift.id})">
                <span class="glyphicon glyphicon-pencil" />
            </button>
        </div>
    </div>
    `;
}

// function

function renderState(state : State) {
    let giftsHtml = state.gifts.map(viewGift).join("");
    jquery("#gift-list").append(giftsHtml);
}

let state : State = {
    gifts : []
};

getGifts().then((response) => {
    if (response === undefined) {
        return;
    }
    state.gifts = response;
    renderState(state);
});
