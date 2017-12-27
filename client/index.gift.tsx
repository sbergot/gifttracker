import * as React from "react"
import { render } from "react-dom";
import { GiftApp } from "./components/GiftApp"
import { GiftEdit } from "./components/GiftEdit";
import { GiftStore } from "./stores/store.gift"
import { GiftEditStore } from "./stores/store.giftedit"
import { ReferentialStore } from "./stores/store.referential";

const giftStore = new GiftStore();
const giftEditStore = new GiftEditStore();
const referentialStore = new ReferentialStore();

render(
    <GiftEdit store={giftEditStore} referentialStore={referentialStore} onSave={() => giftStore.refreshGifts()} />,
    document.getElementById("gift-edit"));
render(
    <GiftApp giftStore={giftStore} giftEditStore={giftEditStore} />,
    document.getElementById("gift-app"));
