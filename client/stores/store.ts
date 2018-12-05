import { produce } from "immer";
import { NEW_GIFT_ID, NO_GIFT_ID } from "../constant/constant";
import { refreshDataContext } from "../services/service.referential"
import { Container } from "unstated";
import * as dataGift from "../data/data.gift";
import * as dataContext from "../data/data.referential";
import * as dataGiftReceiver from "../data/data.giftreceiver";

export class Store extends Container<GT.AppState> {

    state: GT.AppState = makeState();

    newGift = (gift: Partial<GT.Gift>) => {
        this.setState(produce(this.state, draft => {
            draft.context.giftMap[NEW_GIFT_ID] = {
                ...makeGift(),
                ...gift
            };
            draft.currentlyEditedGift = NEW_GIFT_ID;
        }))
    }

    editGift = (id: GT.Id) => this.setState({ currentlyEditedGift: id })

    cancelEdition = () => this.setState({ currentlyEditedGift: NO_GIFT_ID })

    updateGift = (update: GT.GiftUpdate) => {
        this.setState(produce(this.state, draft => {
            draft.context.giftMap[update.giftId][update.field] = update.value;
        }));
    }

    asyncOperationStart = () => this.setState({ loading: true })

    asyncOperationSuccess = () => this.setState({ loading: false })

    asyncOperationFailure = () => this.setState({ loading: false })

    dataContextReceived = (dataContext: GT.DataContext) => {
        this.setState({ context: dataContext })
    }

    updateReceiver = (update: GT.ReceiverUpdate) => {
        this.setState(produce(this.state, draft => {
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
        }))
    }

    asyncAction = async <T>(cb: () => Promise<T>) => {
        this.asyncOperationStart();
        let result: T;
        try {
            result = await cb();
        } catch {
            this.asyncOperationFailure();
            return null;
        }
        this.asyncOperationSuccess();
        return result;
    }

    refreshData = async () => {
        const context = await this.asyncAction(async () => {
            return await dataContext.getReferential();
        });
        if (context) {
            this.dataContextReceived(context);
        }
    }

    saveGift = async (gift: GT.Gift) => {
        await this.asyncAction(async () => {
            if (gift.id === NEW_GIFT_ID) {
                await dataGift.postGift(gift);
            } else {
                await dataGift.putGift(gift);
            }
        });
        this.refreshData();
    }

    deleteGift = async (id: GT.Id) => {
        await this.asyncAction(async () => {
            await dataGift.deleteGift(id);
        });
        this.refreshData();
    }

    persistedUpdateReceiver = async (receiverUpdate: GT.ReceiverUpdate) => {
        this.updateReceiver(receiverUpdate);
        await this.asyncAction(async () => {
            if (receiverUpdate.operation === 'Add') {
                dataGiftReceiver.postGiftReceiver(receiverUpdate.giftId, receiverUpdate.receiverId);
            } else {
                dataGiftReceiver.deleteGiftReceiver(receiverUpdate.giftId, receiverUpdate.receiverId);
            }
        });
        this.refreshData();
    }
}

function makeState(): GT.AppState {
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
        currentlyEditedGift: NO_GIFT_ID,
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

function removeFrom<T>(arr: T[], elt: T): T[] {
    const idx = arr.indexOf(elt);
    if (idx > -1) {
        arr.splice(idx, 1);
    }
    return arr;
}

