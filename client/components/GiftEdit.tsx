import * as React from "react"
import * as ReactDom from "react-dom"

export interface GiftEditProps
{
  gift ?: Gift;
  onClose : () => void;
  onSave : () => void;
}

export class GiftEdit extends React.Component<GiftEditProps, undefined>
{
  componentDidMount(){
    $(this.refs["root"]).modal('show');
    $(this.refs["root"]).on('hidden.bs.modal', this.props.onClose);
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
                    value={this.giftTitle()} />
                </div>
                <div className="form-group">
                  <label htmlFor="gift-edit-description">Description</label>
                  <textarea
                    rows={5}
                    className="form-control"
                    id="gift-edit-description"
                    placeholder="Description"
                    value={this.giftDescription()} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" id="gift-edit-save">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}