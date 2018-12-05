namespace GT {
    export interface EditGiftActions {
        newGift(gift: Partial<GT.Gift>, edit?: boolean): void;
        editGift(giftId: GT.Id): void;
        cancelEdition(): void;
        saveGift(gift : GT.Gift): void;
        deleteGift(giftId : GT.Id): void;
    }

    export interface GiftUpdate {
        giftId: GT.Id;
        field: keyof GT.Gift;
        value: string;
      }

    export type AddRemove = "Add" | "Remove";

    export interface ReceiverUpdate {
        giftId: GT.Id;
        receiverId: GT.Id;
        operation: AddRemove;
    }
}