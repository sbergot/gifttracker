import * as React from "react"
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { GiftApp } from "./components/GiftApp"
import { GiftStore } from "./stores/store.gift"

const giftStore = new GiftStore();

render((<GiftApp giftStore={giftStore} />), document.getElementById("gift-app"));
