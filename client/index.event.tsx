import * as React from "react";
import { render } from "react-dom";
import { EventApp } from "./components/EventApp";
import { GiftEdit } from "./components/GiftEdit";
import { TimelineStore } from "./stores/store.timeline";
import { GiftEditStore } from "./stores/store.giftedit";

const store = new TimelineStore();
const editStore = new GiftEditStore();

render(
    <GiftEdit store={editStore} onSave={() => store.refreshTimelineData()} />,
    document.getElementById("gift-edit"));
render(
    <EventApp store={store} editStore={editStore} />,
    document.getElementById("event-app"));
