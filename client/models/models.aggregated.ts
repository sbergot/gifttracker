namespace GT {
    export interface GiftWithReceivers
    {
        gift: Gift;
        receiverIds: number[];
    }

    export interface EventWithGifts
    {
        event: Event;
        gifts : Gift[];
    }

    export interface IndividualWithGifts
    {
        individual: Individual;
        gifts : Gift[];
    }

    export interface TimeLineData
    {
        events: EventWithGifts[];
        individuals: Individual[];
    }

    export interface EventWithIndividuals
    {
        event: Event;
        individuals: IndividualWithGifts[];
    }

    export interface TimeLineViewModel
    {
        events: EventWithIndividuals[];
    }

    export interface ReferentialData
    {
        individuals: Individual[];
        events: Event[];
    }
}