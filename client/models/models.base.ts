namespace GT {
    export interface Gift {
        id : number;
        title : string;
        description : string;
        priceInCents: number;
        url : string;
        ownerId : number;
        receiverId : number | null;
        receiver : Individual | null;
        buyerId : number | null;
        buyer : Individual | null;
        eventId : number | null;
        event : Event | null;
        status : GiftStatus
    }

    export interface Occurence
    {
        id : number;
        receiverId : number;
        eventId: number;
    }

    export enum EventType
    {
        Christmas,
        Birthday
    };

    export enum GiftStatus
    {
        None,
        Reserved,
        Bought
    };

    export interface Event
    {
        id : number;
        year : number;
        type : EventType;
    }
    
    export interface Individual
    {
        id : number;
        firstName : string;
        lastName : string;
        birthDay : Date;
        userId : number | null;
    }
}