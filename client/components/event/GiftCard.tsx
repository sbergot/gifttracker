import * as React from 'react';

import { ActionButton } from '../shared/molecules/ActionButton';

function GiftTitle(gift: GT.Gift) {
    return gift.url
        ? <a href={gift.url}>{gift.title}</a>
        : <span>{gift.title}</span>;
}

interface GiftCardsProps {
    className?: string;
    gift: GT.Gift;
    isOwner: boolean;
    isInReceivers: boolean;
    onEdit(): void;
    onDelete(): void;
}

export function GiftCard(props: GiftCardsProps) {
    return <div className={`gift-view m-1 ${props.isOwner ? "" : "bg-gray"} ${props.className}`}>
        <div className="card-title mx-1 h5">
            <GiftTitle {...props.gift} />
        </div>
        {
            props.isInReceivers
                ? null
                : (props.gift.status === "Available"
                    ? <i className="icon-lock-open" />
                    : <i className="icon-lock-closed" />
                )
        }
        {
            props.isOwner
                ? <div className="gift-view-actions">
                    <ActionButton
                        onClick={() => props.onDelete()}
                        icon="cross"
                    />
                    <ActionButton
                        onClick={() => props.onEdit()}
                        icon="edit"
                    />
                </div>
                : <div className="gift-view-actions">
                    <ActionButton
                        onClick={() => props.onEdit()}
                        icon="search"
                    />
                </div>
        }
    </div>
}
