namespace GT {
    export interface Occurence
    {
        id : Id;
        receiverId : Id;
        eventId: Id;
    }

    export type EventType = "Christmas" | "Birthday";

    export type GiftStatus = "Available" | "Reserved" | "Deleted";

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
        buyerId : Id | null;
        eventId : Id | null;
        status : GiftStatus;
        isVisibleToOthers: boolean;
    }
}