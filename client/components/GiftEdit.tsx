import * as React from "react"
import * as ReactDom from "react-dom"
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import { GiftEditStore } from "../stores/store.giftedit"

export interface GiftEditProps
{
  store: GiftEditStore
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

  render()
  {
    return (
      <div className={"modal" + (this.isOpen ? " active" : "")} id="gift-edit" tabIndex={-1} ref = "root">
        <div className="modal-overlay" />
        {
          (this.isOpen)
            ? <GiftEditForm
                gift={this.gift!}
                save={() => this.props.store.saveGift(this.gift!)}
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

  onTitleChange(event : any) { this.gift.title = event.target.value; }

  onPriceChange(event : any) { this.gift.priceInCents = event.target.value; }

  onDescriptionChange(event : any) { this.gift.description = event.target.value; }

  render()
  {
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
                placeholder="Title"
                value={this.gift.title}
                onChange={this.onTitleChange.bind(this)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="gift-edit-price">Price</label>
              <input
                className="form-input"
                id="gift-edit-price"
                placeholder="Price"
                value={this.gift.priceInCents}
                onChange={this.onPriceChange.bind(this)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="gift-edit-description">Description</label>
              <textarea
                rows={5}
                className="form-input"
                id="gift-edit-description"
                placeholder="Description"
                value={this.gift.description}
                onChange={this.onDescriptionChange.bind(this)} />
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