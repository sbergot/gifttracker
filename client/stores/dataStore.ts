import { NEW_GIFT_ID } from "../constant/constant";
import { Container } from "unstated";
import * as dataGift from "../data/data.gift";
import * as dataContext from "../data/data.referential";
import * as dataGiftReceiver from "../data/data.giftreceiver";
import { diffArray } from "../services/services.arraydiff";
import { fromReferentialData, ContextServiceImpl } from "../services/service.context";

export class DataStore extends Container<GT.AppState> {

    state: GT.AppState = makeState();

    getContextService = (): GT.ContextService => new ContextServiceImpl(this.state.context);

    asyncOperationStart = () => this.setState({ loading: true });

    asyncOperationSuccess = () => this.setState({ loading: false });

    asyncOperationFailure = () => this.setState({ loading: false });

    dataContextReceived = (dataContext: GT.DataContext) => {
        this.setState({ context: dataContext })
    };

    asyncAction = async <T>(cb: () => Promise<T>) => {
        this.asyncOperationStart();
        let result: T;
        try {
            result = await cb();
        } catch (e) {
            console.error("error while performing an async action");
            console.error(e);
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
            this.dataContextReceived(fromReferentialData(context));
        }
    }

    saveGift = async (gift: GT.Gift, refresh: boolean = true) => {
        const result = await this.asyncAction(async () => {
            if (gift.id === NEW_GIFT_ID) {
                return await dataGift.postGift(gift);
            } else {
                return await dataGift.putGift(gift);
            }
        });
        if (refresh){
            await this.refreshData();
        }
        return result;
    }

    deleteGift = async (id: GT.Id) => {
        await this.asyncAction(async () => {
            await dataGift.deleteGift(id);
        });
        await this.refreshData();
    }

    updateReceiver = async (giftId: GT.Id, receiverIds: GT.Id[]) => {
        const previousReceiverIds = this.getContextService().getReceiverIds(giftId);
        const diff = diffArray(previousReceiverIds, receiverIds);
        const added = diff.added.map(receiverId => {
            const update: GT.GiftReceiverUpdate = { giftId, receiverId, operation: "Add" };
            return update
        });
        const removed = diff.removed.map(receiverId => {
            const update: GT.GiftReceiverUpdate = { giftId, receiverId, operation: "Remove" };
            return update
        });
        const updates = [...added, ...removed];
        if (updates.length > 0) {
            await dataGiftReceiver.updateGiftReceivers(updates);
        }
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
            currentUserId: "0"
        },
        loading: false
    }
}
