import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { EventAppContainer } from "./components/EventApp";
import { GiftEditContainer } from "./components/GiftEdit";
import { reducer } from "./reducer/reducer";

async function main()
{
    const store = createStore(reducer, applyMiddleware(thunk));
    render(
        <Provider store={store}>
            <div>
                <GiftEditContainer />
                <EventAppContainer />
            </div>
        </Provider>,
        document.getElementById("event-app"));
}

main();