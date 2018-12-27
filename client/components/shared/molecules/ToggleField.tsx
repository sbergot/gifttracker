import * as React from "react"

export function ToggleField<TO>(props: {
    field: GT.Field<TO, boolean>;
    disabled?: boolean;
    onClick: () => void;
}) {
    return <label
        className="form-switch"
        htmlFor={props.field.key as string}
        onClick={(e) => {
            e.preventDefault();
            props.onClick();
        }}
    >
        <input
            type="checkbox"
            id={props.field.key as string}
            disabled={props.disabled}
            checked={props.field.value}
            readOnly
        />
        <i className="form-icon"></i> {props.field.label}
    </label>

}