import * as React from "react"
import { render } from "react-dom";
import { GiftApp } from "./components/GiftApp"
import { GiftEdit } from "./components/GiftEdit";
import { GiftEditStore } from "./stores/store.giftedit"
import { ReferentialStore } from "./stores/store.referential";

const referentialStore = new ReferentialStore();
const giftEditStore = new GiftEditStore(referentialStore);

render(
    <GiftEdit
        store={giftEditStore}
        referentialStore={referentialStore}
        onSave={() => referentialStore.refresh()} />,
    document.getElementById("gift-edit"));
render(
    <GiftApp giftEditStore={giftEditStore} referentialStore={referentialStore} />,
    document.getElementById("gift-app"));
