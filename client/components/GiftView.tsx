import * as React from 'react';

export interface GiftProps {
    context: GT.DataContext;
    gift : GT.Gift;
    onDelete : () => void;
    onEdit :   () => void;
}

export function GiftView(props: GiftProps)
{
    const gift = props.gift;
    const receiverIds = props.context.giftReceiversMap[gift.id] || [];
    const receivers = receiverIds.map((r) => props.context.individualMap[r]);
    return (
    <div className="gift-view">
        <dl>
            <dt>{gift.title} - {gift.priceInCents / 100} €</dt>
            <dd>{gift.description}</dd>
            {
                receivers.length > 0 ? [
                    <dt key="receiver-label" >Receivers</dt>,
                    <dd key="receiver-input">
                        {receivers.map((receiver) =>
                            <span className="receiver" key={receiver.id} >
                                {receiver.firstName + " " + receiver.lastName}
                            </span>
                            )
                        }
                    </dd>
                ] : null
            }
        </dl>
        <button
            className="gift-edit btn btn-primary btn-action btn-lg"
            onClick={() => props.onEdit()}>
            <i className="icon icon-edit" />
        </button>
        <button
            className="gift-delete btn btn-primary btn-action btn-lg"
            onClick={() => props.onDelete()}>
            <i className="icon icon-cross" />
        </button>
    </div>
    );
}
