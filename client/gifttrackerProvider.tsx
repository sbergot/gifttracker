import * as React from "react"
import { Provider } from "unstated"

import { MainStore } from "./stores/mainStore";
import { DataStore } from "./stores/dataStore";
import { GiftEditStore } from "./stores/giftEditStore";
import { FilterStore } from "./stores/filterStore";

const dataStore = new DataStore();
dataStore.refreshData();
const giftEditStore = new GiftEditStore();
const filterStore = new FilterStore();
const mainStore = new MainStore(dataStore, giftEditStore, filterStore);

export function GiftTrackerProvider(props: { children: React.ReactNode }) {
    return <Provider inject={[dataStore, giftEditStore, mainStore, filterStore]}>
        {props.children}
    </Provider>
}