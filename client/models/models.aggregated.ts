namespace GT {
    export interface DataContext
    {
        eventMap: KeyMap<Event>;
        individualMap: KeyMap<Individual>;
        giftMap: KeyMap<Gift>;
        eventGiftsMap: ChildMap;
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