import * as React from "react"
import * as ReactDom from "react-dom"
import { observable, computed } from "mobx";
import { observer } from "mobx-react";

import { Gift } from "../typescript/models";

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

export interface GiftEditState
{
  gift : Gift;
}

@observer
export class GiftEdit extends React.Component<GiftEditProps, {}>
{
  @observable
  gift : Gift;

  constructor(props : GiftEditProps)
  {
    super(props);
    this.gift = props.gift;
  }

  componentDidMount()
  {
    $(this.refs["root"]).modal('show');
    $(this.refs["root"]).on('hidden.bs.modal', this.props.onClose);
  }

  componentWillUnmount()
  {
    $(this.refs["root"]).modal('hide');
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

  onDescriptionChange(event : any)
  {
    this.gift.description = event.target.value;
  }

  render()
  {
    return (
      <div className="modal fade" id="gift-edit" tabIndex={-1} ref = "root">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
              <span>
                &times;
              </span>
              </button>
              <h4 className="modal-title">Edit gift</h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="gift-edit-title">Title</label>
                  <input
                    className="form-control"
                    id="gift-edit-title"
                    placeholder="Title"
                    value={this.giftTitle}
                    onChange={this.onTitleChange.bind(this)} />
                </div>
                <div className="form-group">
                  <label htmlFor="gift-edit-description">Description</label>
                  <textarea
                    rows={5}
                    className="form-control"
                    id="gift-edit-description"
                    placeholder="Description"
                    value={this.giftDescription}
                    onChange={this.onDescriptionChange.bind(this)} />
                </div>
              </form>
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
      </div>
    )
  }
}