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

function makeGift(title : string, description : string) : Gift {
    return {
        id : 0,
        applicationUserId : 0,
        title : title,
        description : description
    }
}

export class GiftApp
{
    state : State;
    constructor(inputState : State){
        this.state = inputState;
    }

    public start() {
        this.mountStatics();
        this.refreshGifts();
    }

    refreshGifts() {
        data.getGifts().then((response) => {
            if (response === undefined) {
                return;
            }
            const gifts = response as Gift[];
            this.state.gifts = lodash.keyBy(gifts, (g) => g.id);
            this.renderState();
            this.mountGiftButtons();
        });
    }

    renderState() {
        const giftsHtml = lodash.values(this.state.gifts).map(viewGift).join("");
        jquery("#gift-list").html(giftsHtml);
    }

    mountStatics() {
        this.mountEditGiftModal();
        this.mountCreateGiftButton();
    }

    mountEditGiftModal()
    {
        jquery('#gift-edit-save').on("click", () => this.saveGift());
        jquery('#gift-edit').on("hide.bs.modal", () => {
            jquery('#gift-edit-title').val("");
            jquery('#gift-edit-description').val("");
            this.state.currentEdit = null;
        });
    }

    mountCreateGiftButton() {
        jquery("#gift-create-open").on("click", () => {
            jquery('#gift-edit-title').val("");
            jquery('#gift-edit-description').val("");
            const newGift = makeGift("", "");
            this.openModal(newGift);
        });
    }

    saveGift() {
        const title = jquery('#gift-edit-title').val();
        const description = jquery('#gift-edit-description').val();
        const currentEdit = this.state.currentEdit;
        let request : JQueryPromise<Gift>;
        if (currentEdit == null) {
            const newGift = makeGift(title, description);
            request = data.postGift(newGift);
        } else {
            const currentGift = this.state.gifts[currentEdit];
            currentGift.title = title;
            currentGift.description = description;
            request = data.putGift(currentGift);
        }
        request.then(() => this.refreshGifts());
        this.closeModal();
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

    editGift(giftId : number) {
        this.state.currentEdit = giftId;
        const gift = this.state.gifts[giftId];
        this.openModal(gift);
    }

    deleteGift(giftId : number) {
        data.deleteGift(giftId).then(() => this.refreshGifts());
    }
    
    openModal(gift : Gift) {
        jquery("#gift-edit-title").val(gift.title);
        jquery("#gift-edit-description").val(gift.description);
        jquery('#gift-edit').modal("show");
    }

    closeModal() {
        jquery('#gift-edit').modal("hide");
    }
}

