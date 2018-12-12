import * as React from 'react';

import { ActionButton } from '../../shared/ActionButton';

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
        <div className="card gift-view">
            <div className="card-header">
                <ActionButton
                    className="gift-delete float-right"
                    onClick={() => props.onDelete()}
                    type="cross"
                />
                <ActionButton
                    className="gift-edit float-right"
                    onClick={() => props.onEdit()}
                    type="edit"
                />
                <div className="card-title h4">
                    {gift.title}
                </div>
                <div className="card-subtitle text-gray">
                    {gift.priceInCents / 100} €
                </div>
            </div>
            <div className="card-body">
                <p>{gift.description}</p>
                {
                    receivers.length > 0 ? [
                        <h5 key="receiver-label" >Receivers</h5>,
                        <p key="receiver-value">
                            {receivers.map((receiver) =>
                                <span className="receiver" key={receiver.id} >
                                    {receiver.firstName + " " + receiver.lastName}
                                </span>
                            )
                            }
                        </p>
                    ] : null
                }
            </div>
        </div>
    );
}
