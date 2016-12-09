import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as lodash from "lodash"

export interface GiftProps { gift : Gift }

const giftEditClass = "gift-edit";
const giftDeleteClass = "gift-delete";

function makeGift(title : string, description : string) : Gift {
    return {
        id : 0,
        ownerId : 0,
        occurenceId : 0,
        priceInCents : 0,
        title : title,
        description : description
    }
}

export const Gift = (gift : Gift) => {
    return (
    <div className="panel panel-default gift-view" gift-id={gift.id} key={gift.id}>
        <div className="panel-body">
            <dl className="dl-horizontal">
                <dt>Titre</dt>
                <dd>{gift.title}</dd>
                <dt>Description</dt>
                <dd>{gift.description}</dd>
            </dl>
            <button className={giftEditClass}>
                <span className="glyphicon glyphicon-pencil" />
            </button>
            <button className={giftDeleteClass}>
                <span className="glyphicon glyphicon-remove" />
            </button>
        </div>
    </div>
    );
}

export const GiftAppState = (state : State) => {
    const gifts = lodash.values(state.gifts);
    return (
        <div>
            {gifts.map((g : Gift) => <div>{Gift(g)}</div>)}
        </div>
    );
}

