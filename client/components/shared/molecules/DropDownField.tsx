import * as React from "react"

export function DropDownField(
    props: {
        key: keyof GT.Gift,
        title: string,
        options: { value: GT.Id, descr: string }[],
        emptyDescr?: string,
        disabled?: boolean,
        fieldvalue: string | null
        onChange: React.ChangeEventHandler<HTMLSelectElement>
    }) {
    const fieldid = "gift-edit-" + props.key;
    return (
        <div className="form-group">
            <label className="form-label" htmlFor={fieldid}>{props.title}</label>
            <select
                disabled={props.disabled}
                className="form-input"
                id={fieldid}
                value={props.fieldvalue || -1}
                name={props.key}
                onChange={props.onChange} >
                {
                    props.emptyDescr
                        ? <option key="no_value" value="">{props.emptyDescr}</option>
                        : null
                }
                {
                    props.options.map(o => (
                        <option key={o.value} value={o.value}>
                            {o.descr}
                        </option>
                    ))
                }
            </select>
        </div>);
}
