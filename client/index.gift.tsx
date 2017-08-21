import * as React from "react"
import { render } from "react-dom";
import { GiftApp } from "./components/GiftApp"
import { GiftStore } from "./stores/store.gift"

const store = new GiftStore();

render(<GiftApp store={store} />, document.getElementById("gift-app"));
