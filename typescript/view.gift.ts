import * as jquery from "jquery"
import * as lodash from "lodash"
import "bootstrap"
import * as data from "./data.gift"

const giftIdAttr = "gift-id";
const giftEditClass = "gift-edit";
const giftDeleteClass = "gift-delete";

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
    const giftsHtml = lodash.values(state.gifts).map(viewGift).join("");
    jquery("#gift-list").html(giftsHtml);
    jquery(".gift-view").map((i, e) => {
        const view = $(e);
        const id = parseInt(view.attr(giftIdAttr));
        view.find(`.${giftEditClass}`).click(() => {
            editGift(state, id);
        });
        view.find(`.${giftDeleteClass}`).click(() => {
            deleteGift(state, id);
        });
    });
}

function mountModal(state : State, prefix : string)
{
    jquery(`#${prefix}-save`).on("click", () => {
        const title = jquery(`#${prefix}-title`).val();
        const description = jquery(`#${prefix}-description`).val();
        const currentEdit = state.currentEdit;
        if (currentEdit == null) {
            const newGift = {
                id : 0,
                applicationUserId : 0,
                title : title,
                description : description
            };
            data.postGift(newGift).then((r) => {
                if (r == undefined) {
                    return;
                }
                state.gifts[r.id] = r;
                renderState(state);
            });
            toggleModal(prefix);
            return;
        }

        const currentGift = state.gifts[currentEdit];
        if (currentGift === undefined) {
            console.error("cannot save because current edit gift id is null");
            return;
        }
        currentGift.title = jquery(`#${prefix}-title`).val();
        currentGift.description = jquery(`#${prefix}-description`).val();
        data.putGift(currentGift);
        renderState(state);
        state.currentEdit = null;
        toggleModal(prefix);
        jquery(`#${prefix}-title`).val("");
        jquery(`#${prefix}-description`).val("");
    });
}

export function mountStatics(state : State) {
    mountModal(state, "gift-edit");
    mountModal(state, "gift-create");
    jquery("#gift-create-open").on("click", () => {
        const prefix = "gift-create";
        jquery(`#${prefix}-title`).val("");
        jquery(`#${prefix}-description`).val("");
        const newgift : Gift = {
            id : 0,
            applicationUserId : 0,
            title : "",
            description : ""
        };
        state
        toggleModal("gift-create");
    });
}

function editGift(state : State, giftId : number) {
    state.currentEdit = giftId;
    const gift = state.gifts[giftId];
    if (gift === undefined) {
        return;
    }
    jquery("#gift-edit-title").val(gift.title);
    jquery("#gift-edit-description").val(gift.description);
    toggleModal("gift-edit");
}

function toggleModal(id : string) {
    jquery("#" + id).modal("toggle");
}

function deleteGift(state : State, giftId : number) {
    delete state.gifts[giftId];
    renderState(state);
    data.deleteGift(giftId);
}