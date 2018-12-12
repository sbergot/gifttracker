import * as React from 'react';

import { ActionButton } from '../../shared/ActionButton';

export function Gift(
    props: {
        gift: GT.Gift,
        editGift: (giftId: GT.Id) => void,
        deleteGift: (giftId: GT.Id) => void
    }) {
    const giftId = props.gift.id;
    return <div className="card gift-view" key={giftId}>
        <div className="card-header">
            <ActionButton
                className="float-right"
                onClick={() => props.deleteGift(giftId)}
                type="cross"
            />
            <ActionButton
                className="float-right"
                onClick={() => props.editGift(giftId)}
                type="edit"
            />
            <div className="card-title h5">
                <GiftTitle {...props.gift} />
            </div>
        </div>
    </div>;
}

function GiftTitle(gift: GT.Gift) {
    return gift.url
        ? <a href={gift.url} >{gift.title}</a>
        : <span>{gift.title}</span>;
}
