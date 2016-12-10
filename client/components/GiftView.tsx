import * as React from 'react';

export interface GiftProps {
    gift : Gift;
    onDelete : (id : number) => void;
    onEdit :   (id : number) => void;
}

export class GiftView extends React.Component<GiftProps, undefined>
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
