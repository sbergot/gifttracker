import * as React from 'react';

export interface GiftProps {
    gift : GT.Gift;
    onDelete : (id : number) => void;
    onEdit :   (id : number) => void;
}

export class GiftView extends React.Component<GiftProps, {}>
{
    render()
    {
        const gift = this.props.gift;
        return (
        <div className="gift-view">
            <dl>
                <dt>{gift.title} - {gift.priceInCents / 100} €</dt>
                <dd>Description</dd>
                {
                    gift.receiver !== null ? [
                        <dt key="receiver-label" >Receiver</dt>,
                        <dd key="receiver-input">
                            {gift.receiver.firstName + " " + gift.receiver.lastName}
                        </dd>
                    ] : null
                }
            </dl>
            <button
                className="gift-edit btn btn-primary btn-action btn-lg"
                onClick={() => this.props.onEdit(gift.id)}>
                <i className="icon icon-edit" />
            </button>
            <button
                className="gift-delete btn btn-primary btn-action btn-lg"
                onClick={() => this.props.onDelete(gift.id)}>
                <i className="icon icon-cross" />
            </button>
        </div>
        );
    }
}
