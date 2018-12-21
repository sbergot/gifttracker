import * as React from "react"

interface EditFormLayoutProps {
    title: string;
    children: React.ReactNode
    save: () => void;
    close: () => void;
}

export function EditFormLayout(props: EditFormLayoutProps) {
    return (
        <div className="modal-container" id="gift-edit-modal">
            <div className="modal-header">
                <button className="btn btn-clear float-right" onClick={props.close}></button>
                <div className="modal-title h4">{props.title}</div>
            </div>
            <div className="modal-body">
                <div className="content">
                    <form>
                        <div className="container">
                            <div className="columns">
                                {props.children}
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
                    onClick={props.close}>
                    Close
        </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    id="gift-edit-save"
                    onClick={props.save}>
                    Save changes
        </button>
            </div>
        </div>
    )
}

