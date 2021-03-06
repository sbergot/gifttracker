import { produce } from "immer";
import { NEW_GIFT_ID } from "../constant/constant";
import { Container } from "unstated";

export class GiftEditStore extends Container<GT.GiftEditState> {

    state: GT.GiftEditState = {
        gift: null,
        receiverIds: []
    };

    editGift = (gift: GT.Gift, receiverIds: GT.Id[]) => {
        this.setState({ gift, receiverIds });
    }

    closeGiftForm = () => {
        this.setState({ gift: null, receiverIds: [] });
    }

    updateGift = (update: GT.GiftUpdate) => {
        if (this.state.gift === null) {
            console.log("trying to update a null gift");
            return;
        }
        this.setState(produce(this.state, draft => {
            draft.gift![update.field] = update.value;
        }));
    }

    updateReceivers = (update: GT.ReceiverUpdate) => {
        this.setState(produce(this.state, (draft) => {
            if (update.operation === "Add") {
                draft.receiverIds.push(update.receiverId);
            } else {
                draft.receiverIds = draft.receiverIds.filter(id => id !== update.receiverId);
            }
        }))
    }

    editNewGift = (gift: Partial<GT.Gift>, receiverIds: GT.Id[] = []) => {
        this.editGift({ ...makeGift(), ...gift }, receiverIds);
    }
}

function makeGift() : GT.Gift {
    return {
        id: NEW_GIFT_ID,
        ownerId: "0",
        priceInCents: 0,
        title: "",
        description: "",
        url: "",
        buyerId: null,
        eventId: null,
        status: "Available",
        isVisibleToOthers: false
    };
}
