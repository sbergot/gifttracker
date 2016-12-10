import * as React from "react"
import * as ReactDom from "react-dom"

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

export class GiftEdit extends React.Component<GiftEditProps, GiftEditState>
{
  constructor(props : GiftEditProps)
  {
    super(props);
    this.state = { gift : props.gift }
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

  giftTitle()
  {
    const gift = this.props.gift;
    if (gift == undefined) {
      return "";
    } else {
      return gift.title;
    }
  }

  giftDescription()
  {
    const gift = this.props.gift;
    if (gift == undefined) {
      return "";
    } else {
      return gift.description;
    }
  }

  onTitleChange(event : any)
  {
    const newState = {... this.state };
    newState.gift.title = event.target.value;
    this.setState(newState);
  }

  onDescriptionChange(event : any)
  {
    const newState = {... this.state };
    newState.gift.description = event.target.value;
    this.setState(newState);
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
                    value={this.giftTitle()}
                    onChange={this.onTitleChange.bind(this)} />
                </div>
                <div className="form-group">
                  <label htmlFor="gift-edit-description">Description</label>
                  <textarea
                    rows={5}
                    className="form-control"
                    id="gift-edit-description"
                    placeholder="Description"
                    value={this.giftDescription()}
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
                  { gift : this.state.gift, isNew : this.props.isNew })}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}