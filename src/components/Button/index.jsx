import React from 'react';

import "./styles.scss";

export const Button = ({
    label,
    type,
    onClick,
    primary,
    secondary,
    block
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
    return (
        <button className={classNames.join(' ')} type={type} onClick={onClick}>
            {label}
        </button>
    )
}