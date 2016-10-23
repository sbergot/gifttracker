import * as jquery from "jquery"
import * as lodash from "lodash"
import "bootstrap"

interface Gift {
    id : number;
    applicationUserId : number;
    title : string;
    description : string;
}

interface State {
    gifts : {[index : number] : Gift};
    currentEdit : number | null;
}

let state : State = {
    gifts : [],
    currentEdit : null
};

let gifturl = "./api/gift";
let giftIdAttr = "gift-id";

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
    <div class="panel panel-default gift-view" ${giftIdAttr}="${gift.id}">
        <div class="panel-body">
            <dl class="dl-horizontal">
                <dt>Titre</dt>
                <dd>${gift.title}</dd>
                <dt>Description</dt>
                <dd>${gift.description}</dd>
            </dl>
            <button>
                <span class="glyphicon glyphicon-pencil" />
            </button>
        </div>
    </div>
    `;
}

// function

function renderState(state : State) {
    let giftsHtml = lodash.values(state.gifts).map(viewGift).join("");
    jquery("#gift-list").html(giftsHtml);
    jquery(".gift-view").map((i, e) => {
        let view = $(e);
        let id = parseInt(view.attr(giftIdAttr));
        view.find("button").click(() => { editGift(id) });
    });
}

function mountModal(state : State)
{
    jquery("#gift-edit-save").on("click", () => {
        let currentEdit = state.currentEdit;
        if (currentEdit === null) {
            console.error("cannot save because current edit gift id is null");
            return;
        }
        let currentGift = state.gifts[currentEdit];
        currentGift.title = jquery("#gift-edit-title").val();
        currentGift.description = jquery("#gift-edit-description").val();
        jquery("#gift-edit").modal("toggle");
        renderState(state);
    });
}

function editGift(giftId : number) {
    state.currentEdit = giftId;
    let gift = state.gifts[giftId];
    jquery("#gift-edit-title").val(gift.title);
    jquery("#gift-edit-description").val(gift.description);
    jquery("#gift-edit").modal();
}

getGifts().then((response) => {
    if (response === undefined) {
        return;
    }
    let gifts = response as Gift[];
    state.gifts = lodash.keyBy(gifts, (g) => g.id);
    renderState(state);
    mountModal(state);
});
