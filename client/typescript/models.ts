export interface Gift {
    id : number;
    ownerId : number;
    occurenceId: number;
    priceInCents: number;
    title : string;
    description : string;
}

export enum OccurenceType
{
    Christmas,
    BirthDay
};

export interface Occurence
{
    Id : number;
    ReceiverId : number;
    Year : number;
    Type : OccurenceType;
    Gifts ?: Gift[];
}
