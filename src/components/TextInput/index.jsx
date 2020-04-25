import React from 'react';

import "./styles.scss";

export const TextInput = ({
    onChange,
    value,
    placeholder,
    label,
    id,
    password,
    disabled
}) => (
    <div className="input-wrapper">
        <label className="input-wrapper__label" htmlFor={id}>{label}</label>
        <input
            autoComplete="off"
            className="input-wrapper__input"
            disabled={disabled}
            id={id}
            type={password ? "password" : "text"}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
        />
    </div>
)