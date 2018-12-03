import * as dataGift from "../data/data.gift"
import * as dataContext from "../data/data.referential"
import { Dispatch } from "redux"

import { NEW_GIFT_ID } from "../constant/constant"

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

function asyncAction<T>(cb: () => Promise<T>, resultCb?: (r: T) => GT.Action) {
    return async (dispatch: Dispatch<GT.Action>) => {
        dispatch(asyncOperationStart());
        let result: T;
        try {
            result = await cb();
        } catch {
            dispatch(asyncOperationFailure());
            return;
        }
        if (resultCb) { dispatch(resultCb(result)); }
        else { dispatch(asyncOperationSuccess()); }
    };
}

export function saveGift(gift: GT.Gift) {
    return asyncAction(async () => {
        if (gift.id === NEW_GIFT_ID) {
            await dataGift.postGift(gift);
        } else {
            await dataGift.putGift(gift);
        }
    });
}

export function deleteGift(id: GT.Id) {
    return asyncAction(async () => {
        await dataGift.deleteGift(id);
    });
}

export function refreshData() {
    return asyncAction(async () => {
        return await dataContext.getReferential();
    },
    (context: GT.DataContext) => dataContextReceived(context));
}
