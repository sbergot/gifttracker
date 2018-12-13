import * as React from 'react';
import { GiftCard } from '../../shared/GiftCard';

export function Gift(
    props: {
        gift: GT.Gift,
        buyer: GT.Individual | null,
        editGift: (giftId: GT.Id) => void,
        deleteGift: (giftId: GT.Id) => void
    }) {
    const giftId = props.gift.id;
    return <GiftCard
        gift={props.gift}
        buyer={props.buyer}
        onEdit={() => props.editGift(giftId)}
        onDelete={() => props.deleteGift(giftId)}
    >
    </GiftCard>
}


