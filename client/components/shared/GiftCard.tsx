import * as React from 'react';

import { ActionButton } from './ActionButton';

function GiftTitle(gift: GT.Gift) {
    return gift.url
        ? <a href={gift.url}>{gift.title}</a>
        : <span>{gift.title}</span>;
}

interface GiftCardsProps {
    className?: string;
    gift: GT.Gift;
    isOwner: boolean;
    onEdit(): void;
    onDelete(): void;
}

export function GiftCard(props: GiftCardsProps) {
    return <div className={`card gift-view m-2 ${props.isOwner ? "" : "bg-gray"} ${props.className}`}>
        <div className="card-body">
            <div className="card-title mx-2 h4">
                <GiftTitle {...props.gift} />
            </div>
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
    </div>
}
