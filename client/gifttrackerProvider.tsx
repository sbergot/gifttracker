import * as React from "react"
import { Provider } from "unstated"

import { MainStore } from "./stores/mainStore";
import { GiftEditStore } from "./stores/giftEditStore";

const mainStore = new MainStore();
mainStore.refreshData();
const giftEditStore = new GiftEditStore();

export function GiftTrackerProvider(props: { children: React.ReactNode }) {
    return <Provider inject={[mainStore, giftEditStore]}>
        {props.children}
    </Provider>
}