interface Gift {
    id : number;
    ownerId : number;
    occurenceId: number;
    priceInCents: number;
    title : string;
    description : string;
}

interface State {
    gifts : {[index : number] : Gift };
    currentEdit : number | null;
}
