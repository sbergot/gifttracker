namespace GT {
    export interface ReferentialData
    {
        eventMap: GT.KeyMap<GT.Event>;
        individualMap: GT.KeyMap<GT.Individual>;
        giftMap: GT.KeyMap<GT.Gift>;
        giftReceiverPairs: Array<[number, number]>;
        currentUserId: number;
    }
}

