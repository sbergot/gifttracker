import * as React from "react"
import * as ReactDom from "react-dom"
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import { GiftEditStore } from "../stores/store.giftedit"
import { ReferentialStore } from "../stores/store.referential"

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
                individuals={this.props.referentialStore.referentialdata.individuals}
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

  render()
  {
    //var individuals = this.props.
    return (
    <div className="modal-container">
      <div className="modal-header">
        <button className="btn btn-clear float-right" onClick={this.props.close}></button>
        <div className="modal-title h4">Edit gift</div>
      </div>
      <div className="modal-body">
        <div className="content">
          <form>
            <div className="form-group">
              <label className="form-label" htmlFor="gift-edit-title">Title</label>
              <input
                className="form-input"
                id="gift-edit-title"
                placeholder="A short title"
                name="title"
                value={this.gift.title}
                onChange={this.onGiftChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="gift-edit-price">Price</label>
              <input
                className="form-input"
                id="gift-edit-price"
                placeholder="The price in cents of the gift"
                name="priceInCents"
                value={this.gift.priceInCents}
                onChange={this.onGiftChange} />
            </div>
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
            <div className="form-group">
              <label className="form-label" htmlFor="gift-edit-url">Url</label>
              <input
                className="form-input"
                id="gift-edit-url"
                placeholder="An url to a website"
                value={this.gift.url}
                name="url"
                onChange={this.onGiftChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="gift-edit-receiver">Receiver</label>
              <select
                className="form-input"
                id="gift-edit-receiver"
                value={(this.gift.receiverId || -1).toString()}
                name="receiverId"
                onChange={this.onGiftChange} >
                <option value="">no receiver</option>
                {
                  this.props.individuals.map(i => (
                  <option value={i.id}>
                    { `${i.firstName} ${i.lastName}` }
                  </option>
                    ))
                }
              </select>
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