namespace GT {
    export interface AppState {
        context: DataContext;
        loading: boolean;
    }

    export interface GiftEditState {
        gift: Gift | null;
        receiverIds: Id[];
    }

    export interface DataContext
    {
        eventMap: KeyMap<Event>;
        individualMap: KeyMap<Individual>;
        giftMap: KeyMap<Gift>;
        eventGiftsMap: ChildMap;
        giftReceiverPairs: Array<[Id, Id]>;
        giftReceiversMap: ChildMap;
        receiverGiftsMap: ChildMap;
        currentUserId: Id;
    }

    export interface GiftWithReceivers
    {
        giftReceiverMap: ChildMap;
    }

    export interface IndividualWithGifts
    {
        individualGiftMap : ChildMap;
    }

    export interface EventWithGifts
    {
        eventGiftMap: ChildMap;
    }

    export interface EventWithIndividuals
    {
        eventIndividualMap: ChildMap;
    }
}