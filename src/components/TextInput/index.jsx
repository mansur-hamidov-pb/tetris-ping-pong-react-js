import React from 'react';

import "./styles.scss";

export const TextInput = ({
    disabled,
    errorMessage,
    isValid,
    id,
    label,
    onChange,
    placeholder,
    type = 'text',
    value,
}) => {
    const classeNames = ['input-wrapper__input'];
    if (errorMessage) {
        classeNames.push('input-wrapper__input--invalid');
    } else if (isValid) {
        classeNames.push('input-wrapper__input--valid');
    }

    return (
        <div className="input-wrapper">
            <label className="input-wrapper__label" htmlFor={id}>{label}</label>
            <input
                autoComplete="off"
                className={classeNames.join(' ')}
                disabled={disabled}
                id={id}
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value, id)}
                placeholder={placeholder}
            />
            {isValid && !errorMessage && (
                <div className="input-wrapper__tick">&#10004;</div>
            )}
            {errorMessage && (
                <>
                    <div className="input-wrapper__error">{errorMessage}</div>
                    <div className="input-wrapper__cross">&#10005;</div>
                </>
            )}
        </div>
    );
};