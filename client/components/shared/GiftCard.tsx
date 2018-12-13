import * as React from 'react';

import { ActionButton } from './ActionButton';

interface GiftCardsProps {
    gift: GT.Gift;
    onEdit(): void;
    onDelete(): void;
    children?: React.ReactNode;
}


function GiftTitle(gift: GT.Gift) {
    return gift.url
        ? <a href={gift.url}>{gift.title}</a>
        : <span>{gift.title}</span>;
}

export function GiftCard(props: GiftCardsProps) {
    return <div className="card gift-view">
        <div className="card-header">
            <ActionButton
                className="gift-delete float-right"
                onClick={() => props.onDelete()}
                icon="cross"
            />
            <ActionButton
                className="gift-edit float-right"
                onClick={() => props.onEdit()}
                icon="edit"
            />
            <div className="card-title h4">
                <GiftTitle {...props.gift} />
            </div>
            <div className="card-subtitle text-gray">
                {props.gift.priceInCents / 100} €
        </div>
        </div>
        <div className="card-body">
            {props.children}
        </div>
    </div>
}
