import * as React from "react"
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { GiftApp } from "./components/GiftApp"
import { GiftStore } from "./stores/store.gift"
import { GiftEditStore } from "./stores/store.giftedit"

const giftStore = new GiftStore();
const giftEditStore = new GiftEditStore();

render((<GiftApp giftStore={giftStore} giftEditStore={giftEditStore} />), document.getElementById("gift-app"));
