namespace GT {
    export type keyMap<T> = {[id: number]: T}

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
        individualMap: keyMap<Individual>;
    }

    export interface EventWithIndividuals
    {
        event: Event;
        individuals: IndividualWithGifts[];
    }

    export interface TimeLineViewModel
    {
        events: EventWithIndividuals[];
        giftMap: keyMap<Gift>;
    }

    export interface ReferentialData
    {
        individuals: Individual[];
        events: Event[];
    }
}