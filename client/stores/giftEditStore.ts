import { produce } from "immer";
import { NEW_GIFT_ID } from "../constant/constant";
import { Container } from "unstated";

export class GiftEditStore extends Container<GT.GiftEditState> {

    state: GT.GiftEditState = {
        gift: makeGift(),
        receiverIds: []
    };

    updateGift = (update: GT.GiftUpdate) => {
        this.setState(produce(this.state, draft => {
            draft.gift[update.field] = update.value;
        }));
    }
}

function makeGift() : GT.Gift {
    return {
        id: NEW_GIFT_ID,
        ownerId: "",
        priceInCents: 0,
        title: "",
        description: "",
        url: "",
        buyerId: null,
        buyer: null,
        eventId: null,
        event: null,
        status: "None"
    };
}
