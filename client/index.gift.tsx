import * as React from "react";
import { render } from "react-dom";

import { GiftAppContainer } from "./components/GiftApp";
import { GiftEditContainer } from "./components/GiftEdit";
import { GiftTrackerProvider } from "./gifttrackerProvider";

async function main()
{
    render(
        <GiftTrackerProvider>
            <div>
                <GiftEditContainer />
                <GiftAppContainer />
            </div>
        </GiftTrackerProvider>,
        document.getElementById("gift-app"));
}

main();
