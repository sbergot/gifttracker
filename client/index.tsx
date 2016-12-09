import { render } from "react-dom";
import { GiftAppState } from "./components/Gift"
import * as data from "./typescript/data.gift"

const state : State = {
    gifts : [],
    currentEdit : null
};

data.getGifts().then((gifts) => {
    gifts = gifts || [];
    state.gifts = gifts;
    const app = GiftAppState(state);
    render(
        GiftAppState(state),
        document.getElementById("gift-list")
    );
});

