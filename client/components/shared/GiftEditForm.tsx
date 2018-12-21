import * as React from "react"

import { Typeahead } from "./molecules/TypeAhead"
import { TextField } from "./molecules/TextField"
import { EditFormLayout } from "./organisms/EditFormLayout"

import { showEvent, normalStatus } from '../../services/service.referential';
import { DropDownField } from "./molecules/DropDownField";
import { RadioButtonField } from "./molecules/RadioButtonField";
import { ToggleField } from "./molecules/ToggleField";

interface GiftEditFormProps {
    gift: GT.Gift;
    individualMap: GT.KeyMap<GT.Individual>;
    events: GT.Event[];
    receiverIds: GT.Id[];
    currentUserId: GT.Id;
    updateGift: (update: GT.GiftUpdate) => void;
    updateReceivers: (update: GT.ReceiverUpdate) => void;
    save: (gift: GT.Gift) => void;
    close: () => void;
}

export class GiftEditForm extends React.PureComponent<GiftEditFormProps, {}>
{
    constructor(props: GiftEditFormProps) {
        super(props);
    }

    getIndividuals = () => {
        return Object.values(this.props.individualMap);
    }

    IsCurrentUserOwner = () => {
        return this.props.currentUserId === this.props.gift.ownerId;
    }

    IsCurrentUserInReceiver = () => {
        return this.props.receiverIds.findIndex((v) => v === this.props.currentUserId) > -1;
    }

    onGiftChange = (event: React.FormEvent<HTMLElement>) => {
        const target = (event.target as HTMLInputElement);
        const field = target.name as keyof GT.Gift;
        const value = target.value;
        this.props.updateGift({ field, value });
    }

    getIndividualOptions() {
        return this.getIndividuals().map(individual => (
            {
                value: individual.id,
                descr: `${individual.firstName} ${individual.lastName}`
            }))
    }

    getOwnerName() {
        const owner = this.props.individualMap[this.props.gift.ownerId];
        return `${owner.firstName} ${owner.lastName}`
    }

    render() {
        return (
            <EditFormLayout
                title={`Edit gift (Owner: ${this.getOwnerName()})`}
                close={this.props.close}
                save={() => this.props.save(this.props.gift)}
            >
                <div className="column col-12">
                    <TextField
                        key="title"
                        disabled={!this.IsCurrentUserOwner()}
                        onChange={this.onGiftChange}
                        placeholder="A short title"
                        title="Title"
                        value={this.props.gift.title}
                    />
                </div>
                <div className="column col-12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="gift-edit-receivers">Receivers</label>
                        <Typeahead<GT.Individual>
                            disabled={!this.IsCurrentUserOwner()}
                            selected={this.props.receiverIds.map(i => this.props.individualMap[i])}
                            options={this.getIndividuals()}
                            removeElt={(id) => this.props.updateReceivers({
                                receiverId: id,
                                operation: "Remove"
                            })}
                            addElt={(id) => this.props.updateReceivers({
                                receiverId: id,
                                operation: "Add"
                            })}
                            displayOption={(option: GT.Individual) => `${option.firstName} ${option.lastName}`} />
                    </div>
                </div>
                <div className="column col-6">
                    {
                        this.IsCurrentUserInReceiver()
                            ? null
                            : <>
                                <DropDownField
                                    key={'buyerId'}
                                    emptyDescr="no buyer"
                                    fieldvalue={this.props.gift.buyerId}
                                    title="Buyer"
                                    onChange={this.onGiftChange}
                                    options={this.getIndividualOptions()}
                                />
                                <button
                                    className={`btn`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.props.updateGift({ field: 'buyerId', value: this.props.currentUserId });
                                    }}
                                >
                                    Make me buyer
                                </button>
                            </>
                    }
                    <DropDownField
                        key={'eventId'}
                        emptyDescr="no event"
                        fieldvalue={this.props.gift.eventId}
                        title="Event"
                        onChange={this.onGiftChange}
                        options={this.props.events.map(event => (
                            {
                                value: event.id,
                                descr: showEvent(event)
                            }))}
                        disabled={!this.IsCurrentUserOwner()}
                    />
                    <div className="form-group">
                        <RadioButtonField
                            title="Status"
                            options={normalStatus}
                            onChange={status => this.props.updateGift({
                                field: 'status',
                                value: status
                            })}
                            selected={this.props.gift.status}
                            key="status"
                        />
                        <div className="form-group">
                            <ToggleField
                                key="isVisibleToOthers"
                                fieldValue={this.props.gift.isVisibleToOthers}
                                disabled={!this.IsCurrentUserOwner()}
                                label="Visible to others"
                                onClick={() => this.props.updateGift({
                                    field: 'isVisibleToOthers',
                                    value: (!this.props.gift.isVisibleToOthers)
                                })}
                            />
                        </div>
                    </div>
                </div>
                <div className="column col-6">
                    <TextField
                        key="url"
                        disabled={!this.IsCurrentUserOwner()}
                        onChange={this.onGiftChange}
                        placeholder="An url to a website"
                        title="Url"
                        value={this.props.gift.url}
                    />
                    <TextField
                        key="priceInCents"
                        disabled={!this.IsCurrentUserOwner()}
                        onChange={this.onGiftChange}
                        placeholder="The price in cents of the gift"
                        title="Price"
                        value={this.props.gift.priceInCents}
                    />
                    <div className="form-group">
                        <label
                            className="form-label"
                            htmlFor="gift-edit-description"
                        >
                                Description
                        </label>
                        <textarea
                            disabled={!this.IsCurrentUserOwner()}
                            rows={5}
                            className="form-input"
                            id="gift-edit-description"
                            placeholder="detailed descript of the gift"
                            name="description"
                            value={this.props.gift.description}
                            onChange={this.onGiftChange} />
                    </div>
                </div>
            </EditFormLayout>
        )
    }
}
