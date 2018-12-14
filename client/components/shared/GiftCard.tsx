import * as React from 'react';

import { ActionButton } from './ActionButton';

function GiftTitle(gift: GT.Gift) {
    return gift.url
        ? <a href={gift.url}>{gift.title}</a>
        : <span>{gift.title}</span>;
}

interface GiftCardsProps {
    gift: GT.Gift;
    onEdit(): void;
    onDelete(): void;
}

export function GiftCard(props: GiftCardsProps) {
    return <div className="card gift-view">
        <div className="card-body">
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
        </div>
    </div>
}
