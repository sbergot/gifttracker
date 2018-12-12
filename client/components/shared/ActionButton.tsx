import * as React from 'react';

interface ActionButtonProps {
    className?: string;
    type: 'cross' | 'edit';
    onClick: () => void;
}

export function ActionButton(props: ActionButtonProps) {
    return <button
        className={`btn btn-primary btn-action btn-lg mx-1 ${props.className || ""}`}
        onClick={props.onClick}>
        <i className={`icon icon-${props.type}`} />
    </button>
}