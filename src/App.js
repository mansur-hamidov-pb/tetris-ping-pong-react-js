import React from 'react';

import { Touchpad } from './components/Touchpad';
import { asyncDataStatus, viewMode } from './consts';

import { BrickBreaker } from './games/BrickBreaker';
import { MainMenu } from './views/MainMenu';
import { SignInScreen } from './views/SignIn';
import { SignUpScreen } from './views/SignUp';

import "./App.css";
import { useUser } from './context/user/hooks';
import { useHiScore } from './context/hiscore/hooks';
import { Rating } from './views/Rating';


const App = () => {
    const [currentView, setView] = React.useState(viewMode.MAIN_MENU);
    const {
        data: {
            authorized,
            status,
            errors
        },
        signIn,
        signUp,
        clearErrors
    } = useUser();
    const { record, setHiScore } = useHiScore();

    React.useEffect(clearErrors, [currentView])

    React.useEffect(
        () => {
            if (authorized && [viewMode.SIGN_IN_SCREEN, viewMode.SIGN_UP_SCREEN].includes(currentView)) {
                setView(viewMode.MAIN_MENU)
            }
        },
        [authorized, currentView]
    );

    const handleSignin = (login, password) => {
        signIn({ login, password });
    }

    const handleSignup = (data) => {
        signUp(data);
    }

    return (
        <div className="App">
            <div className="game-screen" id="gamescreen">
                {currentView === viewMode.MAIN_MENU && (
                    <MainMenu
                        onPlay={() => setView(viewMode.BRICK_BREAKER)}
                        onSignIn={() => setView(viewMode.SIGN_IN_SCREEN)}
                        onSignUp={() => setView(viewMode.SIGN_UP_SCREEN)}
                        onGoToRating={() => setView(viewMode.RATING_TABLE)}
                    />
                )}
                {currentView === viewMode.BRICK_BREAKER && (
                    <BrickBreaker
                        goToMainMenu={() => setView(viewMode.MAIN_MENU)}
                        record={record}
                        setHiScore={(score) => setHiScore(score, authorized)}
                    />
                )}
                {currentView === viewMode.SIGN_IN_SCREEN && (
                    <SignInScreen
                        errors={errors}
                        onSignIn={handleSignin}
                        onGoBack={() => setView(viewMode.MAIN_MENU)}
                        isLoading={status === asyncDataStatus.LOADING}
                    />
                )}
                {currentView === viewMode.SIGN_UP_SCREEN && (
                    <SignUpScreen
                        onGoBack={() => setView(viewMode.MAIN_MENU)}
                        isLoading={status === asyncDataStatus.LOADING}
                        onSignUp={handleSignup}
                        errors={errors}
                    />
                )}
                {currentView === viewMode.RATING_TABLE && (
                    <Rating onGoBack={() => setView(viewMode.MAIN_MENU)} />
                )}
            </div>
            <Touchpad />
        </div>
    );
}

export default App;