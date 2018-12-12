import { Container } from "unstated";
import { DataStore } from "./dataStore";
import { GiftEditStore } from "./giftEditStore";

export class MainStore extends Container<{}> {
    dataStore: DataStore;
    giftEditStore: GiftEditStore;
    constructor(dataStore: DataStore, giftEditStore: GiftEditStore) {
        super();
        this.dataStore = dataStore;
        this.giftEditStore = giftEditStore;
    }

    editGift = (giftId: GT.Id) => {
        const context = this.dataStore.getContextService();
        const gift = context.getGift(giftId);
        const receiverIds = context.getReceiverIds(giftId);
        this.giftEditStore.editGift(gift, receiverIds);
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
