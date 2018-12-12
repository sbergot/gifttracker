import * as React from "react";
import { render } from "react-dom";

import { GiftAppContainer } from "./components/pages/gift/GiftApp";
import { GiftEditContainer } from "./components/shared/GiftEdit";
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
