import React from 'react';
import "./style.css";

export const Point = ({ filled }) => {
    let className = 'point';
    if (filled) {
        className += ' point--filled';
    }
    return (
        <div className={className}/>
    )
}