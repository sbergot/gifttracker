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
    Id : number;
    ReceiverId : number;
    EventId: number;
}

export interface Event
{
    Id : number;
    Year : number;
    Type : EventType;
    Gifts ?: Gift[];
}
