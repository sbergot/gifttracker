import * as React from "react";
import { render } from "react-dom";

import { EventAppContainer } from "./components/pages/event/EventApp";
import { GiftEditContainer } from "./components/shared/GiftEdit";
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