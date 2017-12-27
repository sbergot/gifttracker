import * as React from "react";
import { render } from "react-dom";
import { EventApp } from "./components/EventApp";
import { GiftEdit } from "./components/GiftEdit";
import { TimelineStore } from "./stores/store.timeline";
import { GiftEditStore } from "./stores/store.giftedit";
import { ReferentialStore } from "./stores/store.referential";

const store = new TimelineStore();
const editStore = new GiftEditStore();
const referentialStore = new ReferentialStore();

render(
    <GiftEdit store={editStore} referentialStore={referentialStore} onSave={() => store.refreshTimelineData()} />,
    document.getElementById("gift-edit"));
render(
    <EventApp store={store} editStore={editStore} />,
    document.getElementById("event-app"));
