import React from 'react';

import "./styles.scss";

export const TextInput = ({
    onChange,
    value,
    placeholder,
    label,
    id
}) => (
    <div className="input-wrapper">
        <label className="input-wrapper__label" htmlFor={id}>{label}</label>
        <input
            autoComplete="new-password"
            className="input-wrapper__input"
            id={id}
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
        />
    </div>
)