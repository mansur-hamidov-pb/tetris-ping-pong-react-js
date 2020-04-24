import React from 'react';

import './styles.scss';

export const PauseMenu = ({
    paused,
    onResume,
    onRestart,
    onReturnMainMenu
}) => {
    if (!paused) {
        return null;
    }

    return (
        <div className="pause-menu">
            <div className="pause-menu__content">
                <button href="#" className="pause-menu__content__item" onClick={onResume}>RESUME</button>
                <button href="#" className="pause-menu__content__item" onClick={onRestart}>RESTART</button>
                <button href="#" className="pause-menu__content__item" onClick={onReturnMainMenu}>MAIN MENU</button>
            </div>
        </div>
    );
}