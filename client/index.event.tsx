import * as React from "react";
import { render } from "react-dom";
import { EventApp } from "./components/EventApp";
import { GiftEdit } from "./components/GiftEdit";
import { GiftEditStore } from "./stores/store.giftedit";
import { ReferentialStore } from "./stores/store.referential";

async function main()
{
    const referentialStore = new ReferentialStore();
    await referentialStore.refresh();
    const editStore = new GiftEditStore(referentialStore);
    
    render(
        <GiftEdit store={editStore} referentialStore={referentialStore} onSave={() => referentialStore.refresh()} />,
        document.getElementById("gift-edit"));
    render(
        <EventApp referentialStore={referentialStore} editStore={editStore} />,
        document.getElementById("event-app"));
}

main();