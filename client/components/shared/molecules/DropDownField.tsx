import * as React from "react"

export function DropDownField<TO>(
    props: {
        field: GT.Field<TO, string | null>
        options: { value: GT.Id, descr: string }[],
        emptyDescr?: string,
        disabled?: boolean,
        onChange: React.ChangeEventHandler<HTMLSelectElement>
    }) {
    const fieldid = "gift-edit-" + props.field.key;
    return (
        <div className="form-group">
            <label className="form-label" htmlFor={fieldid}>{props.field.label}</label>
            <select
                disabled={props.disabled}
                className="form-input"
                id={fieldid}
                value={props.field.value || -1}
                name={props.field.key as string}
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
