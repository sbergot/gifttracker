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

export class GiftApp
{
    state : State;
    constructor(inputState : State){
        this.state = inputState;
    }

    public start() {
        this.mountStatics();

        data.getGifts().then((response) => {
            if (response === undefined) {
                return;
            }
            const gifts = response as Gift[];
            this.state.gifts = lodash.keyBy(gifts, (g) => g.id);
            this.renderState();
        });
    }

    renderState() {
        const giftsHtml = lodash.values(this.state.gifts).map(viewGift).join("");
        jquery("#gift-list").html(giftsHtml);
        this.mountGiftButtons();
    }

    mountGiftButtons() {
        jquery(".gift-view").map((i, e) => {
            const view = $(e);
            const id = parseInt(view.attr(giftIdAttr));
            view.find(`.${giftEditClass}`).click(() => {
                this.editGift(id);
            });
            view.find(`.${giftDeleteClass}`).click(() => {
                this.deleteGift(id);
            });
        });
    }

    mountModal(prefix : string)
    {
        jquery(`#${prefix}-save`).on("click", () => {
            const title = jquery(`#${prefix}-title`).val();
            const description = jquery(`#${prefix}-description`).val();
            const currentEdit = this.state.currentEdit;
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
                    this.state.gifts[r.id] = r;
                    this.renderState();
                });
                this.toggleModal(prefix);
                return;
            }

            const currentGift = this.state.gifts[currentEdit];
            currentGift.title = jquery(`#${prefix}-title`).val();
            currentGift.description = jquery(`#${prefix}-description`).val();
            data.putGift(currentGift);
            this.renderState();
            this.state.currentEdit = null;
            this.toggleModal(prefix);
            jquery(`#${prefix}-title`).val("");
            jquery(`#${prefix}-description`).val("");
        });
    }

    mountStatics() {
        this.mountModal("gift-edit");
        this.mountModal("gift-create");
        jquery("#gift-create-open").on("click", () => {
            const prefix = "gift-create";
            jquery(`#${prefix}-title`).val("");
            jquery(`#${prefix}-description`).val("");
            this.toggleModal(prefix);
        });
    }

    editGift(giftId : number) {
        this.state.currentEdit = giftId;
        const gift = this.state.gifts[giftId];
        jquery("#gift-edit-title").val(gift.title);
        jquery("#gift-edit-description").val(gift.description);
        this.toggleModal("gift-edit");
    }

    toggleModal(id : string) {
        jquery("#" + id).modal("toggle");
    }

    deleteGift(giftId : number) {
        delete this.state.gifts[giftId];
        this.renderState();
        data.deleteGift(giftId);
    }
}

