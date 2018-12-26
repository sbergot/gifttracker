namespace GT {
    export interface EditGiftActions {
        newGift(gift: Partial<GT.Gift>, receiverIds?: GT.Id[]): void;
        editGift(giftId: GT.Id): void;
        cancelEdition(): void;
        saveGift(gift: GT.Gift): void;
        deleteGift(giftId: GT.Id): void;
    }

    export interface GiftUpdate {
        field: keyof GT.Gift;
        value: GiftVals;
    }

    export interface GiftReceiverUpdate {
        giftId: GT.Id
        receiverId: GT.Id
        operation: AddRemove
    }

    export type AddRemove = "Add" | "Remove";

    export type GiftVals = GT.Gift[keyof GT.Gift];

    export interface ReceiverUpdate {
        receiverId: GT.Id;
        operation: AddRemove;
    }

    export interface Field<TO, TV> {
        label: string;
        key: keyof TO;
        value: TV;
    }
}