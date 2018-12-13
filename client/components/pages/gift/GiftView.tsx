import * as React from 'react';
import { GiftCard } from '../../shared/GiftCard';

export interface GiftProps {
    receivers: GT.Individual[];
    gift: GT.Gift;
    onDelete: () => void;
    onEdit: () => void;
}

export function GiftView(props: GiftProps) {
    const gift = props.gift;
    const receivers = props.receivers;
    return (
        <GiftCard
            gift={gift}
            onDelete={props.onDelete}
            onEdit={props.onEdit}>
            <p>{gift.description}</p>
            {
                receivers.length > 0 ? [
                    <h5 key="receiver-label">Receivers</h5>,
                    <p key="receiver-value">
                        {receivers.map((receiver) =>
                            <span className="mx-1" key={receiver.id} >
                                {receiver.firstName + " " + receiver.lastName}
                            </span>)}
                    </p>
                ] : null
            }
        </GiftCard>
    );
}
