import * as React from "react"
import * as ReactDom from "react-dom"
import { observable, computed } from "mobx";
import { observer } from "mobx-react";

import { Gift } from "../models/models.base";

export interface NewGift
{
  gift : Gift;
  isNew : Boolean;
}

export interface GiftEditProps extends NewGift
{
  onClose : () => void;
  onSave : (newGift : NewGift) => void;
}

@observer
export class GiftEdit extends React.Component<GiftEditProps, {}>
{
  @observable
  gift : Gift;

  @observable
  isOpen : boolean;

  constructor(props : GiftEditProps)
  {
    super(props);
    this.gift = props.gift;
  }

  componentDidMount()
  {
    this.isOpen = true;
  }

  componentWillUnmount()
  {
    this.isOpen = false;
  }

  @computed
  get giftTitle()
  {
    const gift = this.gift;
    if (gift == undefined) {
      return "";
    } else {
      return gift.title;
    }
  }

  @computed
  get giftPrice()
  {
    const gift = this.gift;
    if (gift == undefined) {
      return 0;
    } else {
      return gift.priceInCents;
    }
  }

  @computed
  get giftDescription()
  {
    const gift = this.gift;
    if (gift == undefined) {
      return "";
    } else {
      return gift.description;
    }
  }

  onTitleChange(event : any)
  {
    this.gift.title = event.target.value;
  }

  onPriceChange(event : any)
  {
    this.gift.priceInCents = event.target.value;
  }

  onDescriptionChange(event : any)
  {
    this.gift.description = event.target.value;
  }

  render()
  {
    return (
      <div className={"modal" + (this.isOpen ? " active" : "")} id="gift-edit" tabIndex={-1} ref = "root">
        <div className="modal-overlay" />
        <div className="modal-container">
          <div className="modal-header">
            <button className="btn btn-clear float-right" onClick={this.props.onClose}></button>
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
                    value={this.giftTitle}
                    onChange={this.onTitleChange.bind(this)} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="gift-edit-price">Price</label>
                  <input
                    className="form-input"
                    id="gift-edit-price"
                    placeholder="Price"
                    value={this.giftPrice}
                    onChange={this.onPriceChange.bind(this)} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="gift-edit-description">Description</label>
                  <textarea
                    rows={5}
                    className="form-input"
                    id="gift-edit-description"
                    placeholder="Description"
                    value={this.giftDescription}
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
              onClick={this.props.onClose}>
              Close
            </button>
            <button
              type="button" 
              className="btn btn-primary" 
              id="gift-edit-save"
              onClick={() => this.props.onSave(
                { gift : this.gift, isNew : this.props.isNew })}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    )
  }
}