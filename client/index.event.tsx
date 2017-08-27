import * as React from "react"
import { render } from "react-dom";
import { EventApp } from "./components/EventApp"
import { TimelineStore } from "./stores/store.timeline"

const store = new TimelineStore();

render(<EventApp store={ store } />, document.getElementById("event-app"));
