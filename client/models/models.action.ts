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

    export interface NewGiftAction {
        type: "NewGift";
        gift: Partial<GT.Gift>;
        edit: boolean;
    }

    export interface EditGiftAction {
        type: "EditGift";
        id: Id;
    }

    export interface CancelEditionAction {
        type: "CancelEdition";
    }

    export interface UpdateGiftAction {
        type: "UpdateGift";
        update: GiftUpdate;
    }

    export type AddRemove = "Add" | "Remove";

    export interface ReceiverUpdate {
        giftId: GT.Id;
        receiverIds: GT.Id[];
    }

    export interface ReceiverUpdateAction {
        type: "ReceiverUpdate";
        receiverUpdate: ReceiverUpdate;
    }

    export interface AsyncOperationStartAction {
        type: "AsyncOperationStart";
    }

    export interface AsyncOperationSuccessAction {
        type: "AsyncOperationSuccess";
    }

    export interface AsyncOperationFailureAction {
        type: "AsyncOperationFailure";
    }

    export interface DataContextReceivedAction {
        type: "DataContextReceived";
        dataContext: DataContext;
    }

    export type Action
        = NewGiftAction
        | EditGiftAction
        | CancelEditionAction
        | UpdateGiftAction
        | AsyncOperationStartAction
        | AsyncOperationSuccessAction
        | AsyncOperationFailureAction
        | DataContextReceivedAction
        | ReceiverUpdateAction
}