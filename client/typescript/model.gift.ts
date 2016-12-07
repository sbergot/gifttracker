interface Gift {
    id : number;
    applicationUserId : number;
    title : string;
    description : string;
}

interface State {
    gifts : {[index : number] : Gift };
    currentEdit : number | null;
}
