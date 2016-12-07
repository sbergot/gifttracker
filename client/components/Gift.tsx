import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface GiftProps { gift : Gift }

const giftEditClass = "gift-edit";
const giftDeleteClass = "gift-delete";

export const Gift =  (gift : Gift) => {
    return (
    <div className="panel panel-default gift-view" gift-id={gift.id}>
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