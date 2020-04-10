import React from 'react';
import "./style.css";
import { gameScreen } from '../../consts';

export const Point = ({ filled, positioned, x, y }) => {
    let className = 'point';
    const style = {}
    if (filled) {
        className += ' point--filled';
    }
    if (positioned) {
        style.position = 'absolute';
        style.left = `${((x - 1) / (gameScreen.width + 5)) * 100}%`;
        style.top = `${((y - 1) / gameScreen.height) * 100}%`;
        style.width = `${1 / (gameScreen.width + 5) * 100}%`;
        style.height = '27px';
    }
    return (
        <div className={className} style={style}/>
    )
}