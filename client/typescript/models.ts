export interface Gift {
    id : number;
    ownerId : number;
    occurenceId: number;
    priceInCents: number;
    title : string;
    description : string;
}

export enum EventType
{
    Christmas,
    BirthDay
};

export interface Occurence
{
    id : number;
    receiverId : number;
    eventId: number;
}

export interface Event
{
    id : number;
    year : number;
    type : EventType;
}

export interface EventWithGifts extends Event
{
    gifts : Gift[];
}
