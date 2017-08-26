namespace GT {
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
}