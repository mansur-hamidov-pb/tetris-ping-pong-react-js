import React from 'react';
import "./styles.scss";

export const Point = ({ filled }) => {
    let className = 'point';
    if (filled) {
        className += ' point--filled';
    }
    return (
        <div className={className}/>
    )
}