import { produce } from "immer";
import { NEW_GIFT_ID } from "../constant/constant";
import { refreshDataContext } from "../services/service.referential"

function removeFrom<T>(arr: T[], elt: T): T[] {
    const idx = arr.indexOf(elt);
    if (idx > -1) {
        arr.splice(idx, 1);
    }
    return arr;
}

export function reducer(state: GT.AppState | undefined, action: GT.Action): GT.AppState {
    if (!state) {
        return makeSate();
    }
    switch (action.type) {
        case "NewGift":
            return produce(state, draft => {
                draft.context.giftMap[NEW_GIFT_ID] = {
                    ...makeGift(),
                    ...action.gift
                };
                draft.currentlyEditedGift = NEW_GIFT_ID;
            });
        case "EditGift":
            return {...state, currentlyEditedGift: action.id}
        case "CancelEdition":
            return {...state, currentlyEditedGift: "-1"};
        case "UpdateGift":
            return produce(state, draft => {
                const update = action.update;
                draft.context.giftMap[update.giftId][update.field] = update.value;
            });
        case "AsyncOperationStart":
            return {...state, loading: true};
        case "AsyncOperationSuccess":
            return {...state, loading: false};
        case "AsyncOperationFailure":
            return {...state, loading: false};
        case "DataContextReceived":
            return {...state, context: action.dataContext, loading: false};
        case "ReceiverUpdate":
            return produce(state, draft => {
                const update = action.receiverUpdate;
                const giftId = update.giftId.toString();
                const receiverId = update.receiverId.toString();
                const isMatch = (p: [GT.Id, GT.Id]) => p[0] === giftId && p[1] === receiverId;
                const pairs = draft.context.giftReceiverPairs
                const pairExists = pairs.some(isMatch);

                if (update.operation === 'Add' && !pairExists) {
                    pairs.push([giftId, receiverId])
                }

                if (update.operation === 'Remove') {
                    draft.context.giftReceiverPairs = pairs.filter(p => !isMatch(p));
                }

                draft.context = refreshDataContext(draft.context);
            });
        default:
            return state;
    }
}

function makeSate(): GT.AppState {
    return {
        context: {
            eventGiftsMap: {},
            eventMap: {},
            giftMap: {},
            giftReceiverPairs: [],
            giftReceiversMap: {},
            individualMap: {},
            receiverGiftsMap: {},
        },
        currentlyEditedGift: "-1",
        loading: false
    }
}

function makeGift() : GT.Gift {
    return {
        id: NEW_GIFT_ID,
        ownerId: "",
        priceInCents: 0,
        title: "",
        description: "",
        url: "",
        buyerId: null,
        buyer: null,
        eventId: null,
        event: null,
        status: "None"
    };
}
