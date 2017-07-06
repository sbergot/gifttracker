export interface Gift {
    id : number;
    ownerId : string;
    occurenceId: number;
    priceInCents: number;
    title : string;
    description : string;
    receiverId : number | null;
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

export interface rawIndividual
{
    id : number;
    firstName : string;
    lastName : string;
    birthDay : Date;
    userId : number | null;
}
