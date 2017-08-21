namespace GT {
    export interface EventWithGifts extends Event
    {
        gifts : Gift[];
    }

    export interface EventWithIndividus extends Event
    {
        individuals : Individual[]
    }

    export interface IndividualWithGifts extends Individual
    {
        gifts : Gift[];
    }
}