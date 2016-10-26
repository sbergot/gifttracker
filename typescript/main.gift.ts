import * as lodash from "lodash"
import * as data from "./data.gift"
import * as view from "./view.gift"

let state : State = {
    gifts : [],
    currentEdit : null
};

view.mountStatics(state);

data.getGifts().then((response) => {
    if (response === undefined) {
        return;
    }
    let gifts = response as Gift[];
    state.gifts = lodash.keyBy(gifts, (g) => g.id);
    view.renderState(state);
});