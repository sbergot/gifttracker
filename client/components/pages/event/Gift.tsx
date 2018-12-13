import * as React from 'react';
import { GiftCard } from '../../shared/GiftCard';

export function Gift(
    props: {
        gift: GT.Gift,
        editGift: (giftId: GT.Id) => void,
        deleteGift: (giftId: GT.Id) => void
    }) {
    const giftId = props.gift.id;
    return <GiftCard
        gift={props.gift}
        onEdit={() => props.editGift(giftId)}
        onDelete={() => props.deleteGift(giftId)}
    >
    </GiftCard>
}


