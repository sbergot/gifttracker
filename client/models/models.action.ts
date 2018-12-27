namespace GT {
    export interface EditGiftActions {
        newGift(gift: Partial<GT.Gift>, receiverIds?: GT.Id[]): void;
        editGift(giftId: GT.Id): void;
        deleteGift(giftId: GT.Id): void;
    }

    export interface GiftUpdate {
        field: keyof GT.Gift;
        value: GiftVals;
    }

    export interface FilterUpdate {
        field: keyof GT.FilterState;
        value: FilterVals;
    }

    export interface GiftReceiverUpdate {
        giftId: GT.Id
        receiverId: GT.Id
        operation: AddRemove
    }

    export type AddRemove = "Add" | "Remove";

    export type GiftVals = GT.Gift[keyof GT.Gift];

    export type FilterVals = GT.FilterState[keyof GT.FilterState];

    export interface ReceiverUpdate {
        receiverId: GT.Id;
        operation: AddRemove;
    }
}