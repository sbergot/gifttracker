import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { GiftAppContainer } from "./components/GiftApp";
import { GiftEditContainer } from "./components/GiftEdit";
import { reducer } from "./reducer/reducer";

async function main()
{
    const store = createStore(reducer, applyMiddleware(thunk));
    render(
        <Provider store={store}>
            <div>
                <GiftEditContainer />
                <GiftAppContainer />
            </div>
        </Provider>,
        document.getElementById("gift-app"));
}

main();
