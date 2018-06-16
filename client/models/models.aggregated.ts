namespace GT {
    export type KeyMap<T> = {[id: number]: T}

    export interface GiftWithReceivers
    {
        gift: Gift;
        receiverIds: number[];
    }

    export interface IndividualWithGifts
    {
        individual: Individual;
        giftIds : number[];
    }

    export interface EventWithGifts
    {
        event: Event;
        gifts: GiftWithReceivers[];
    }

    export interface TimeLineData
    {
        events: EventWithGifts[];
        individualMap: KeyMap<Individual>;
    }

    export interface EventWithIndividuals
    {
        event: Event;
        individuals: IndividualWithGifts[];
    }

    export interface TimeLineViewModel
    {
        events: EventWithIndividuals[];
        giftMap: KeyMap<Gift>;
    }

    export interface IndividualViewModel
    {
        individuals: IndividualWithGifts[];
        giftMap: KeyMap<Gift>;
    }

    export interface GiftViewModel
    {
        gifts: GiftWithReceivers[];
        individualMap: KeyMap<Individual>;
    }

    export interface ReferentialData
    {
        individuals: Individual[];
        events: Event[];
    }
}