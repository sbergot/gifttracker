import * as React from 'react';

interface ActionButtonProps {
    className?: string;
    size?: 'sm' | 'lg';
    type?: 'primary' | 'default';
    icon: 'cross' | 'edit' | 'plus' | 'search';
    onClick: () => void;
}

export function ActionButton(props: ActionButtonProps) {
    return <button
        className={`btn btn-action mx-1 btn-${props.type || 'primary'} btn-${props.size || 'sm'} ${props.className || ""}`}
        onClick={props.onClick}>
        <i className={`icon icon-${props.icon}`} />
    </button>
}