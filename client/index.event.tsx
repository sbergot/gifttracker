import * as React from "react";
import { render } from "react-dom";
import { EventApp } from "./components/EventApp";
import { GiftEdit } from "./components/GiftEdit";
import { TimelineStore } from "./stores/store.timeline";
import { GiftEditStore } from "./stores/store.giftedit";
import { ReferentialStore } from "./stores/store.referential";

async function main()
{
    const store = new TimelineStore();
    const referentialStore = new ReferentialStore();
    await referentialStore.refresh();
    const editStore = new GiftEditStore(referentialStore);
    
    render(
        <GiftEdit store={editStore} referentialStore={referentialStore} onSave={() => store.refreshTimelineData()} />,
        document.getElementById("gift-edit"));
    render(
        <EventApp referentialStore={referentialStore} timelineStore={store} editStore={editStore} />,
        document.getElementById("event-app"));
}

main();