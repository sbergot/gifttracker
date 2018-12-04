import * as dataGift from "../data/data.gift";
import * as dataGiftReceiver from "../data/data.giftreceiver";
import * as dataContext from "../data/data.referential";
import { ThunkDispatch } from "redux-thunk";

import { NEW_GIFT_ID } from "../constant/constant";
import { Dispatch } from "redux";

type AsyncAction = (dispatch: Dispatch<GT.Action>) => Promise<void>;
type AnyAction = GT.Action | AsyncAction;

export function newGift(gift: Partial<GT.Gift>, edit: boolean = false): GT.NewGiftAction {
    return { type: "NewGift", gift, edit };
}

export function editGift(id: GT.Id): GT.EditGiftAction {
    return { type: "EditGift", id };
}

export function cancelEdition(): GT.CancelEditionAction {
    return { type: "CancelEdition" };
}

export function updateGift(update: GT.GiftUpdate): GT.UpdateGiftAction {
    return { type: "UpdateGift", update}
}

export function asyncOperationStart(): GT.AsyncOperationStartAction {
    return { type: "AsyncOperationStart" };
}

export function asyncOperationSuccess(): GT.AsyncOperationSuccessAction {
    return { type: "AsyncOperationSuccess" };
}

export function asyncOperationFailure(): GT.AsyncOperationFailureAction {
    return { type: "AsyncOperationFailure" };
}

export function dataContextReceived(dataContext: GT.DataContext): GT.DataContextReceivedAction {
    return { type: "DataContextReceived", dataContext };
}

export function updateReceiver(receiverUpdate: GT.ReceiverUpdate): GT.ReceiverUpdateAction {
    return { type: "ReceiverUpdate", receiverUpdate };
}

function asyncAction<T>(cb: () => Promise<T>, resultCb?: (r: T) => AnyAction) {
    return async (dispatch: ThunkDispatch<GT.AppState, void, GT.Action>) => {
        dispatch(asyncOperationStart());
        let result: T;
        try {
            result = await cb();
        } catch {
            dispatch(asyncOperationFailure());
            return;
        }
        dispatch(asyncOperationSuccess());
        if (resultCb) { dispatch(resultCb(result) as any); }
    };
}

export function saveGift(gift: GT.Gift) {
    return asyncAction(async () => {
        if (gift.id === NEW_GIFT_ID) {
            await dataGift.postGift(gift);
        } else {
            await dataGift.putGift(gift);
        }
    },
    () => refreshData());
}

export function deleteGift(id: GT.Id) {
    return asyncAction(async () => {
        await dataGift.deleteGift(id);
    },
    () => refreshData());
}

export function refreshData() {
    return asyncAction(async () => {
        return await dataContext.getReferential();
    },
    (context: GT.DataContext) => dataContextReceived(context));
}

export function persistedUpdateReceiver(receiverUpdate: GT.ReceiverUpdate) {
    return async (dispatch: ThunkDispatch<GT.AppState, void, GT.Action>) => {
        dispatch(updateReceiver(receiverUpdate));
        dispatch(asyncAction(async () => {
            if (receiverUpdate.operation === 'Add') {
                return await dataGiftReceiver.postGiftReceiver(receiverUpdate.giftId, receiverUpdate.receiverId);
            } else {
                return await dataGiftReceiver.deleteGiftReceiver(receiverUpdate.giftId, receiverUpdate.receiverId);
            }
        }))
    };
}