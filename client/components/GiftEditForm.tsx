import * as React from "react"
import { Typeahead } from "./TypeAhead"

import { showEvent, showGiftStatus, allGiftStatus } from '../services/service.referential';

interface GiftEditFormProps
{
  gift: GT.Gift;
  individualMap: GT.KeyMap<GT.Individual>;
  events: GT.Event[];
  receiverIds: GT.Id[];
  updateGift: (update: GT.GiftUpdate) => void;
  updateReceiver: (update: GT.ReceiverUpdate) => void;
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

  onGiftChange = (event: React.FormEvent<HTMLElement>) => {
    const target = (event.target as HTMLInputElement);
    const field = target.name as keyof GT.Gift;
    const value = target.value;
    this.props.updateGift({ giftId: this.props.gift.id, field, value });
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
          selected={selected}
          options={individuals}
          removeElt={(id) => this.props.updateReceiver({
            giftId: this.props.gift.id,
            receiverId: id,
            operation: "Remove"
          })}
          addElt={(id) => this.props.updateReceiver({
            giftId: this.props.gift.id,
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
    const individuals = Object.values(this.props.individualMap);
    return this.getIndividuals().map(individual => (
      {
        value: individual.id,
        descr: `${individual.firstName} ${individual.lastName}`
      }))
  }

  render()
  {
    return (
    <div className="modal-container" id="gift-edit-modal">
      <div className="modal-header">
        <button className="btn btn-clear float-right" onClick={this.props.close}></button>
        <div className="modal-title h4">Edit gift</div>
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
                  {
                      this.dropDownField(
                        'status',
                        'Status',
                        allGiftStatus.map(status => (
                          {
                            value: status,
                            descr: showGiftStatus(status)
                          })))
                  }
                </div>
                <div className="column col-6">
                  {this.textField('url', 'Url', "An url to a website")}
                  {this.textField('priceInCents', 'Price', "The price in cents of the gift")}
                  <div className="form-group">
                    <label className="form-label" htmlFor="gift-edit-description">Description</label>
                    <textarea
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
