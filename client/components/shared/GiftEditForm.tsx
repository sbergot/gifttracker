import * as React from "react"

import { Typeahead } from "./TypeAhead"
import { showEvent, showGiftStatus, allGiftStatus } from '../../services/service.referential';

interface GiftEditFormProps
{
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
  constructor(props: GiftEditFormProps)
  {
    super(props);
  }

  getIndividuals = () => {
    return Object.values(this.props.individualMap);
  }

  getIsOwner = () => {
    return this.props.currentUserId === this.props.gift.ownerId.toString();
  }

  onGiftChange = (event: React.FormEvent<HTMLElement>) => {
    const target = (event.target as HTMLInputElement);
    const field = target.name as keyof GT.Gift;
    const value = target.value;
    this.props.updateGift({ field, value });
  }

  textField = (
    key: keyof GT.Gift,
    title: string,
    placeholder: string = '') => {
    const fieldid = "gift-edit-" + key;
    const fieldvalue = (this.props.gift[key] || '') as number | string;
    return (
      <div className="form-group">
        <label className="form-label" htmlFor={fieldid}>{title}</label>
        <input
          disabled={!this.getIsOwner()}
          className="form-input"
          id={fieldid}
          placeholder={placeholder}
          name={key}
          value={fieldvalue}
          onChange={this.onGiftChange} />
      </div>);
  }

  typeaheadTextField = (
    title: string) => {
    const fieldid = "gift-edit-receivers";
    const individuals = this.getIndividuals();
    const selected = this.props.receiverIds.map(i => this.props.individualMap[i]);
    return (
      <div className="form-group">
        <label className="form-label" htmlFor={fieldid}>{title}</label>
        <Typeahead<GT.Individual>
          disabled={!this.getIsOwner()}
          selected={selected}
          options={individuals}
          removeElt={(id) => this.props.updateReceivers({
            receiverId: id,
            operation: "Remove"
          })}
          addElt={(id) => this.props.updateReceivers({
            receiverId: id,
            operation: "Add"
          })}
          displayOption={(option: GT.Individual) => `${option.firstName} ${option.lastName}`} />
      </div>);
  }

  dropDownField = (
    key: keyof GT.Gift,
    title: string,
    options: { value: GT.Id, descr: string }[],
    emptyDescr?: string) => {
    const fieldid = "gift-edit-" + key;
    const fieldvalue = this.props.gift[key] as number | null;
    return (
      <div className="form-group">
        <label className="form-label" htmlFor={fieldid}>{title}</label>
        <select
          disabled={!this.getIsOwner()}
          className="form-input"
          id={fieldid}
          value={fieldvalue || -1}
          name={key}
          onChange={this.onGiftChange} >
          {
            emptyDescr
            ? <option key="no_value" value="">{emptyDescr}</option>
            : null
          }
          {
            options.map(o => (
            <option key={o.value} value={o.value}>
              {o.descr}
            </option>
            ))
          }
        </select>
      </div>);
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

  render()
  {
    return (
    <div className="modal-container" id="gift-edit-modal">
      <div className="modal-header">
        <button className="btn btn-clear float-right" onClick={this.props.close}></button>
        <div className="modal-title h4">Edit gift (Owner: {this.getOwnerName()})</div>
      </div>
      <div className="modal-body">
        <div className="content">
          <form>
            <div className="container">
              <div className="columns">
                <div className="column col-12">
                  {this.textField('title', 'Title', 'A short title')}
                </div>
                <div className="column col-12">
                  {this.typeaheadTextField('Receivers')}
                </div>
                <div className="column col-6">
                  {
                      this.dropDownField(
                        'buyerId',
                        'Buyer',
                        this.getIndividualOptions(),
                        'no buyer')
                  }
                  {
                      this.dropDownField(
                        'eventId',
                        'Event',
                        this.props.events.map(event => (
                          {
                            value: event.id,
                            descr: showEvent(event)
                          })),
                        'no event')
                  }
                  <div className="form-group">
                  <label className="form-label" htmlFor="status">Status</label>
                  {
                    allGiftStatus.map((status) => (
                      <button
                        key={status}
                        disabled={!this.getIsOwner()}
                        className={`btn ${status === this.props.gift.status ? 'btn-primary' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          this.props.updateGift({ field: 'status', value: status });
                        }}
                      >
                        {status}
                      </button>
                    )) 
                      }
                      <div className="form-group">
                        <label
                          className="form-switch"
                          htmlFor="isVisibleToOthers"
                          onClick={() => this.props.updateGift({
                            field: 'isVisibleToOthers',
                            value: (!this.props.gift.isVisibleToOthers)
                          })}
                        >
                          <input
                            type="checkbox"
                            disabled={!this.getIsOwner()}
                            checked={this.props.gift.isVisibleToOthers}
                            readOnly
                          />
                          <i className="form-icon"></i> Visible to others
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="column col-6">
                    {this.textField('url', 'Url', "An url to a website")}
                  {this.textField('priceInCents', 'Price', "The price in cents of the gift")}
                  <div className="form-group">
                    <label className="form-label" htmlFor="gift-edit-description">Description</label>
                    <textarea
                      disabled={!this.getIsOwner()}
                      rows={5}
                      className="form-input"
                      id="gift-edit-description"
                      placeholder="detailed descript of the gift"
                      name="description"
                      value={this.props.gift.description}
                      onChange={this.onGiftChange} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button" 
          className="btn btn-default" 
          data-dismiss="modal"
          onClick={this.props.close}>
          Close
        </button>
        <button
          type="button" 
          className="btn btn-primary" 
          id="gift-edit-save"
          onClick={() => this.props.save(this.props.gift)}>
          Save changes
        </button>
      </div>
    </div>
    )
  }
}
