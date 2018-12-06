import * as React from "react";
import { render } from "react-dom";

import { EventAppContainer } from "./components/EventApp";
import { GiftEditContainer } from "./components/GiftEdit";
import { GiftTrackerProvider } from "./gifttrackerProvider";

async function main()
{
    render(
        <GiftTrackerProvider>
            <div>
                <GiftEditContainer />
                <EventAppContainer />
            </div>
        </GiftTrackerProvider>,
        document.getElementById("event-app"));
}

main();