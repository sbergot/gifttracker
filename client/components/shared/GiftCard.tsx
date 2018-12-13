import * as React from 'react';

import { ActionButton } from './ActionButton';

function GiftTitle(gift: GT.Gift) {
    const title = `${gift.title} ${gift.ownerId}`;
    return gift.url
        ? <a href={gift.url}>{gift.title}</a>
        : <span>{gift.title}</span>;
}

function GiftSubTitle(props: { gift: GT.Gift }) {
    const status = props.gift.status != "None" ? props.gift.status : "";
    const buyerText = status && (props.gift.buyer !== null)
        ? `by ${props.gift.buyer.firstName} ${props.gift.buyer.lastName}`
        : '';
    const priceText = props.gift.priceInCents ? `${props.gift.priceInCents / 100} €` : '';
    return <div className="card-subtitle text-gray">
        {status} {buyerText} {priceText}
    </div>
}

interface GiftCardsProps {
    gift: GT.Gift;
    onEdit(): void;
    onDelete(): void;
    children?: React.ReactNode;
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
            <GiftSubTitle
                gift={props.gift}
            />
        </div>
        <div className="card-body">
            {props.children}
        </div>
    </div>
}
