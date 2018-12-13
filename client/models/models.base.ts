namespace GT {
    export interface Occurence
    {
        id : Id;
        receiverId : Id;
        eventId: Id;
    }

    export type EventType = "Christmas" | "Birthday";

    export type GiftStatus = "None" | "Reserved" | "Bought";

    export interface Event
    {
        id : Id;
        year : number;
        type : number;
    }
    
    export interface Individual
    {
        id : Id;
        firstName : string;
        lastName : string;
        birthDay : Date;
        userId : Id | null;
    }

    export interface Gift {
        id : Id;
        title : string;
        description : string;
        priceInCents: number;
        url : string;
        ownerId : Id;
        owner : Individual;
        buyerId : Id | null;
        buyer : Individual | null;
        eventId : Id | null;
        event : Event | null;
        status : GiftStatus;
        isVisibleToOthers: boolean;
    }
}