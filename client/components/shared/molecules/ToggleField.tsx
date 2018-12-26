import * as React from "react"

export function ToggleField(props: {
    field: GT.Field<GT.Gift, boolean>;
    disabled: boolean;
    onClick: () => void;
}) {
    return <label
        className="form-switch"
        htmlFor={props.field.key}
        onClick={() => props.onClick()}
    >
        <input
            type="checkbox"
            id={props.field.key}
            disabled={props.disabled}
            checked={props.field.value}
            readOnly
        />
        <i className="form-icon"></i> {props.field.label}
    </label>

}