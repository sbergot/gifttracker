import * as React from "react";
import { render } from "react-dom";
import { Provider } from "unstated";

import { GiftAppContainer } from "./components/GiftApp";
import { GiftEditContainer } from "./components/GiftEdit";
import { Store } from "./stores/store";

async function main()
{
    const store = new Store();
    store.refreshData();
    render(
        <Provider inject={[store]}>
            <div>
                <GiftEditContainer />
                <GiftAppContainer />
            </div>
        </Provider>,
        document.getElementById("gift-app"));
}

main();
