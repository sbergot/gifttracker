import * as React from "react"
import { Provider } from "unstated"

import { MainStore } from "./stores/mainStore";
import { DataStore } from "./stores/dataStore";
import { GiftEditStore } from "./stores/giftEditStore";

const dataStore = new DataStore();
dataStore.refreshData();
const giftEditStore = new GiftEditStore();
const mainStore = new MainStore(dataStore, giftEditStore);

export function GiftTrackerProvider(props: { children: React.ReactNode }) {
    return <Provider inject={[dataStore, giftEditStore, mainStore]}>
        {props.children}
    </Provider>
}