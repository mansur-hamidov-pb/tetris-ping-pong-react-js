import React from 'react';

import { Layout } from '../Layout';
import { useUser } from '../../context/user/hooks';

import "./styles.scss";

export const MainMenu = ({
    onPlay,
    onSignIn,
    onGoToRating,
    onSignUp
}) => {
    const {
        data: {
            authorized
        },
        signOut
    } = useUser();
    return (
        <Layout>
            <div className="main-menu">
                <div className="main-menu__content">
                    {!authorized ? (
                        <>
                            <button href="#" className="main-menu__content__item" onClick={onSignUp}>CREATE NEW USER</button>
                            <button href="#" className="main-menu__content__item" onClick={onSignIn}>SIGN IN</button>
                            <button href="#" className="main-menu__content__item" onClick={onPlay}>PLAY OFFLINE</button>
                        </>
                    ) : (
                        <>
                            <button href="#" className="main-menu__content__item" onClick={onPlay}>PLAY</button>
                            <button href="#" className="main-menu__content__item" onClick={signOut}>SIGN OUT</button>
                            <button href="#" className="main-menu__content__item" onClick={onGoToRating}>RATING</button>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
}