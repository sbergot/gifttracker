import * as view from "./view.gift"

const state : State = {
    gifts : [],
    currentEdit : null
};

const app = new view.GiftApp(state);
app.start();