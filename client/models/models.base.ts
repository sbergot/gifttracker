namespace GT {
    export interface Gift {
        id : number;
        ownerId : string;
        occurenceId: number;
        priceInCents: number;
        title : string;
        description : string;
        receiverId : number | null;
        receiver : Individual | null;
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
    
    export interface Individual
    {
        id : number;
        firstName : string;
        lastName : string;
        birthDay : Date;
        userId : number | null;
    }
}