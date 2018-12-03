namespace GT {
    export interface AppState {
        context: DataContext;
        currentlyEditedGift: Id;
        loading: boolean;
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