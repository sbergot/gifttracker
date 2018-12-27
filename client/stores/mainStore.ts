import { Container } from "unstated";
import { DataStore } from "./dataStore";
import { GiftEditStore } from "./giftEditStore";
import { FilterStore } from "./filterStore";
import { ContextServiceImpl } from "../services/service.context";

export class MainStore extends Container<{}> {
    constructor(
        private dataStore: DataStore,
        private giftEditStore: GiftEditStore,
        private filterStore: FilterStore
    ) {
        super();
        this.dataStore.subscribe(() => this.setState({}));
        this.filterStore.subscribe(() => this.setState({}));
    }

    getContextService = (): GT.ContextService => new ContextServiceImpl(
        this.dataStore.state.context,
        this.filterStore.state);

    editGift = (giftId: GT.Id) => {
        const context = this.getContextService();
        const gift = context.getGift(giftId);
        const receiverIds = context.getReceiverIds(giftId);
        this.giftEditStore.editGift(gift, receiverIds);
    }

    editNewGift = (gift: Partial<GT.Gift>, receiverIds: GT.Id[] = []) => {
        const newGift = {...gift};
        const context = this.getContextService();
        const currentUser = context.getCurrentUser();
        if (!newGift.ownerId) { newGift.ownerId = currentUser.id; }
        this.giftEditStore.editNewGift(newGift, receiverIds);
    }

    saveGift = async (gift: GT.Gift, receiverIds: GT.Id[]) => {
        const savedGift = await this.dataStore.saveGift(gift, false);
        if (!savedGift) {
            console.error("error while saving a gift");
            return;
        }

        const newGiftId = savedGift.id;
        this.dataStore.updateReceiver(newGiftId, receiverIds);
    }
}
