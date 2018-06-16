import * as React from "react"
import * as ReactDom from "react-dom"
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import { GiftEditStore } from "../stores/store.giftedit"
import { ReferentialStore } from "../stores/store.referential"
import { showEvent, showGiftStatus, allGiftStatus } from '../services/service.referential';

export interface GiftEditProps
{
  store: GiftEditStore;
  referentialStore: ReferentialStore;
  onSave: () => void;
}

@observer
export class GiftEdit extends React.Component<GiftEditProps, {}>
{
  @computed
  get gift(): GT.Gift | null
  {
    return this.props.store.getCurrentGift();
  }

  @computed
  get isOpen(): boolean
  {
    return !!this.gift;
  }

  async save()
  {
    await this.props.store.saveGift(this.gift!);
    this.props.store.cancelEdition();
    this.props.onSave();
  }

  render()
  {
    return (
      <div className={"modal" + (this.isOpen ? " active" : "")} id="gift-edit" tabIndex={-1} ref = "root">
        <div className="modal-overlay" />
        {
          (this.isOpen)
            ? <GiftEditForm
                gift={this.gift!}
                individuals={this.props.referentialStore.dataContext.individuals}
                events={this.props.referentialStore.dataContext.events}
                save={() => this.save()}
                close={() => this.props.store.cancelEdition()}/>
            : null
        }
      </div>
    )
  }
}

interface GiftEditFormProps
{
  gift: GT.Gift;
  individuals: GT.Individual[];
  events: GT.Event[];
  save: (gift: GT.Gift) => void;
  close: () => void;
}

@observer
class GiftEditForm extends React.Component<GiftEditFormProps, {}>
{
  @observable
  gift: GT.Gift;

  constructor(props: GiftEditFormProps)
  {
    super(props);
    this.gift = props.gift;
  }

  onGiftChange = (event: React.FormEvent<HTMLElement>) => {
    const target = (event.target as HTMLInputElement);
    const field = target.name as keyof GT.Gift;
    this.gift[field] = target.value;
  }

  textField = (
    key: keyof GT.Gift,
    title: string,
    placeholder: string = '') => {
    const fieldid = "gift-edit-" + key;
    const fieldvalue = (this.gift[key] || '') as number | string;
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

  dropDownField = (
    key: keyof GT.Gift,
    title: string,
    options: { value: number, descr: string }[],
    emptyDescr?: string) => {
    const fieldid = "gift-edit-" + key;
    const fieldvalue = this.gift[key] as number | null;
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
    return this.props.individuals.map(individual => (
      {
        value: individual.id,
        descr: `${individual.firstName} ${individual.lastName}`
      }))
  }

  render()
  {
    //var individuals = this.props.
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
                <div className="column col-6">
                  {
                      this.dropDownField(
                        'receiverId',
                        'Receiver',
                        this.getIndividualOptions(),
                        'no receiver')
                  }
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
                      value={this.gift.description}
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
          onClick={() => this.props.save(this.gift)}>
          Save changes
        </button>
      </div>
    </div>
    )
  }
}