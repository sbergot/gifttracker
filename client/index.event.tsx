import * as React from "react";
import { render } from "react-dom";

import { EventAppContainer } from "./components/event/EventAppContainer";
import { GiftEditContainer } from "./components/giftEdit/GiftEditContainer";
import { GiftTrackerProvider } from "./gifttrackerProvider";
import { FiltersContainer } from "./components/filters/FiltersContainer";

async function main()
{
    render(
        <GiftTrackerProvider>
            <GiftEditContainer />
            <FiltersContainer />
            <EventAppContainer />
        </GiftTrackerProvider>,
        document.getElementById("event-app"));
}

main();