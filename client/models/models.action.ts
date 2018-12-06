namespace GT {
    export interface EditGiftActions {
        newGift(gift: Partial<GT.Gift>, receiverIds?: GT.Id[]): void;
        editGift(giftId: GT.Id): void;
        cancelEdition(): void;
        saveGift(gift : GT.Gift): void;
        deleteGift(giftId : GT.Id): void;
    }

    export interface GiftUpdate {
        field: keyof GT.Gift;
        value: string;
      }

    export interface GiftReceiverUpdate {
        giftId: GT.Id
        receiverId: GT.Id
        operation: AddRemove
    }

    export type AddRemove = "Add" | "Remove";

    export interface ReceiverUpdate {
        receiverId: GT.Id;
        operation: AddRemove;
    }
}