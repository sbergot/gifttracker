import * as React from 'react';

import { ActionButton } from './ActionButton';

interface GiftCardsProps {
    gift: GT.Gift;
    buyer: GT.Individual | null;
    onEdit(): void;
    onDelete(): void;
    children?: React.ReactNode;
}


function GiftTitle(gift: GT.Gift) {
    return gift.url
        ? <a href={gift.url}>{gift.title}</a>
        : <span>{gift.title}</span>;
}

function GiftSubTitle(props: { gift: GT.Gift, buyer: GT.Individual | null }) {
    const status = props.gift.status != "None" ? props.gift.status : "";
    const buyerText = status && (props.buyer !== null)
        ? `by ${props.buyer.firstName} ${props.buyer.lastName}`
        : '';
    const priceText = props.gift.priceInCents ? `${props.gift.priceInCents / 100} €` : '';
    return <div className="card-subtitle text-gray">
        {status} {buyerText} {priceText}
    </div>
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
                buyer={props.buyer}
                gift={props.gift}
            />
        </div>
        <div className="card-body">
            {props.children}
        </div>
    </div>
}
