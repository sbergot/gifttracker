namespace GT {
    export type KeyMap<T> = {[id: number]: T}

    export interface DataContext
    {
        individualMap: KeyMap<Individual>;
        giftMap: KeyMap<Gift>;
        eventMap: KeyMap<Event>;
    }

    export interface GiftWithReceivers
    {
        giftId: number;
        receiverIds: number[];
    }

    export interface IndividualWithGifts
    {
        individualId: number;
        giftIds : number[];
    }

    export interface EventWithGifts
    {
        eventId: number;
        gifts: GiftWithReceivers[];
    }

    export interface EventWithIndividuals
    {
        eventId: number;
        individuals: IndividualWithGifts[];
    }
}