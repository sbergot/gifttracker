import * as React from "react"

interface TextFieldProps {
    field: GT.Field<GT.Gift, number | string>
    placeholder?: string
    disabled?: boolean
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function TextField(props: TextFieldProps) {
    const fieldid = "gift-edit-" + props.field.key;
    return <div className="form-group">
        <label className="form-label" htmlFor={fieldid}>{props.field.label}</label>
        <input
            disabled={props.disabled}
            className="form-input"
            id={fieldid}
            placeholder={props.placeholder}
            name={props.field.key}
            value={props.field.value}
            onChange={props.onChange} />
    </div>;
}