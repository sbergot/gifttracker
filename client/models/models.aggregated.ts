namespace GT {
    export type KeyMap<T> = {[id: string]: T}

    export type ChildMap = {[id: string]: number[]}

    export interface DataContext
    {
        individualMap: KeyMap<Individual>;
        giftMap: KeyMap<Gift>;
        eventMap: KeyMap<Event>;
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