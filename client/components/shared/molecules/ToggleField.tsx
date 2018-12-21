import * as React from "react"

export function ToggleField(props: {
    key: keyof GT.Gift;
    label: string;
    disabled: boolean;
    fieldValue: boolean;
    onClick: () => void;
}) {
    return <label
        className="form-switch"
        htmlFor="isVisibleToOthers"
        onClick={() => props.onClick()}
    >
        <input
            type="checkbox"
            disabled={props.disabled}
            checked={props.fieldValue}
            readOnly
        />
        <i className="form-icon"></i> {props.label}
    </label>

}