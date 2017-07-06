import * as React from 'react';

import { Gift } from "../models/models.base";

export interface GiftProps {
    gift : Gift;
    onDelete : (id : number) => void;
    onEdit :   (id : number) => void;
}

export class GiftView extends React.Component<GiftProps, {}>
{
    render()
    {
        const gift = this.props.gift;
        return (
        <div className="panel panel-default gift-view">
            <div className="panel-body">
                <dl className="dl-horizontal">
                    <dt>Titre</dt>
                    <dd>{gift.title}</dd>
                    <dt>Description</dt>
                    <dd>{gift.description}</dd>
                    <dt>Prix</dt>
                    <dd>{gift.priceInCents}</dd>
                    <dt>Destinataire</dt>
                    <dd>{gift.description}</dd>
                </dl>
                <button
                    className="gift-edit"
                    onClick={() => this.props.onEdit(gift.id)}>
                    <span className="glyphicon glyphicon-pencil" />
                </button>
                <button
                    className="gift-delete"
                    onClick={() => this.props.onDelete(gift.id)}>
                    <span className="glyphicon glyphicon-remove" />
                </button>
            </div>
        </div>
        );
    }
}
