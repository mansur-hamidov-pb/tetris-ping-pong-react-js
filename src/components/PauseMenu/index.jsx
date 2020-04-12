import React from 'react';

import './index.css';

export const PauseMenu = ({ paused }) => {
    if (!paused) {
        return null;
    }

    return (
        <div className="pause-menu">
            PAUSED
        </div>
    );
}