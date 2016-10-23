import * as jquery from "jquery"
import * as lodash from "lodash"
import "bootstrap"

let giftIdAttr = "gift-id";

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

export function renderState(state : State) {
    let giftsHtml = lodash.values(state.gifts).map(viewGift).join("");
    jquery("#gift-list").html(giftsHtml);
    jquery(".gift-view").map((i, e) => {
        let view = $(e);
        let id = parseInt(view.attr(giftIdAttr));
        view.find("button").click(() => { editGift(id) });
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
    });
}

function editGift(giftId : number) {
    state.currentEdit = giftId;
    let gift = state.gifts[giftId];
    jquery("#gift-edit-title").val(gift.title);
    jquery("#gift-edit-description").val(gift.description);
    jquery("#gift-edit").modal();
}