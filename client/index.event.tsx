import * as React from "react";
import { render } from "react-dom";
import { Provider } from "unstated";

import { EventAppContainer } from "./components/EventApp";
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
                <EventAppContainer />
            </div>
        </Provider>,
        document.getElementById("event-app"));
}

main();