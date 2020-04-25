import React from 'react';

import "./styles.scss";

export const Button = ({
    label,
    type,
    onClick,
    primary,
    secondary,
    block,
    disabled
}) => {
    const classNames = ['button'];
    if (primary) {
        classNames.push('button--primary');
    }
    if (secondary) {
        classNames.push('button--secondary');
    }
    if (block) {
        classNames.push('button--block');
    }
    if (disabled) {
        classNames.push('button--disabled');
    }
    return (
        <button className={classNames.join(' ')} type={type} onClick={!disabled && onClick} disabled={disabled}>
            {label}
        </button>
    )
}