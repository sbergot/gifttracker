class GiftEdit
{
    render()
    {
        return (
            <div className="modal fade" id="gift-edit" tabIndex={-1}>
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
                                    <input className="form-control" id="gift-edit-title" placeholder="Title" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="gift-edit-description">Description</label>
                                    <textarea rows={5} className="form-control" id="gift-edit-description" placeholder="Description">
                                    </textarea>
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