import * as React from "react"

interface TextFieldProps {
    key: keyof GT.Gift;
    value: number | string;
    title: string;
    placeholder?: string
    disabled?: boolean
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function TextField(props: TextFieldProps) {
    const fieldid = "gift-edit-" + props.key;
    return <div className="form-group">
        <label className="form-label" htmlFor={fieldid}>{props.title}</label>
        <input
            disabled={props.disabled}
            className="form-input"
            id={fieldid}
            placeholder={props.placeholder}
            name={props.key}
            value={props.value}
            onChange={props.onChange} />
    </div>;
}