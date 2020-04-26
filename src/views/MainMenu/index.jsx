import React from 'react';

import { Loading } from '../../components/Loading';
import { asyncDataStatus } from '../../consts';
import { useUser } from '../../context/user/hooks';
import { Layout } from '../Layout';

import "./styles.scss";

export const MainMenu = ({
    onPlay,
    onSignIn,
    onGoToRating,
    onSignUp
}) => {
    const {
        data: {
            authorized,
            status
        },
        signOut
    } = useUser();
    return (
        <Layout>
            <div className="main-menu">
                <div className="main-menu__content">
                    {status === asyncDataStatus.LOADING && <Loading />}
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