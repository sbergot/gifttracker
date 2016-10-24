import * as jquery from "jquery"
import * as lodash from "lodash"
import "bootstrap"
import * as data from "./data.gift"

let giftIdAttr = "gift-id";
let giftEditClass = "gift-edit";
let giftDeleteClass = "gift-delete";

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
            <button class="${giftEditClass}">
                <span class="glyphicon glyphicon-pencil" />
            </button>
            <button class="${giftDeleteClass}">
                <span class="glyphicon glyphicon-remove" />
            </button>
        </div>
    </div>
    `;
}

// function

export function renderState(state : State) {
    let giftsHtml = lodash.values(state.gifts).map(viewGift).join("");
    jquery("#gift-list").html(giftsHtml);
    jquery(".gift-view").map((i, e) => {
        let view = $(e);
        let id = parseInt(view.attr(giftIdAttr));
        view.find(`.${giftEditClass}`).click(() => { editGift(state, id); });
        view.find(`.${giftDeleteClass}`).click(() => { deleteGift(state, id); });
    });
}

export function mountModal(state : State)
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
        data.putGift(currentGift);
    });
    jquery("#gift-create").on("click", () => {
        openGiftEditModal();
    });
}

function editGift(state : State, giftId : number) {
    state.currentEdit = giftId;
    let gift = state.gifts[giftId];
    jquery("#gift-edit-title").val(gift.title);
    jquery("#gift-edit-description").val(gift.description);
}

function openGiftEditModal() {
    jquery("#gift-edit").modal();
}

function deleteGift(state : State, giftId : number) {
    delete state.gifts[giftId];
    renderState(state);
    data.deleteGift(giftId);
}