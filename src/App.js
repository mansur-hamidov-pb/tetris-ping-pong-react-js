import React from 'react';

import { Touchpad } from './components/Touchpad';
import { viewMode } from './consts';

import { BrickBreaker } from './games/BrickBreaker';
import { MainMenu } from './views/MainMenu';
import { SignInScreen } from './views/SignIn';

import "./App.css";
import { useUser } from './context/user/hooks';


const App = () => {
    const [currentView, setView] = React.useState(viewMode.MAIN_MENU);
    const {
        data: {
            authorized
        },
        signIn
    } = useUser();

    React.useEffect(
        () => {
            if (authorized && currentView === viewMode.SIGN_IN_SCREEN) {
                setView(viewMode.MAIN_MENU)
            }
        },
        [authorized, currentView]
    );

    const handleSignin = (login, password) => {
        signIn({ login, password });
    }

    return (
        <div className="App">
            <div className="game-screen" id="gamescreen">
                {currentView === viewMode.MAIN_MENU && (
                    <MainMenu
                        onPlay={() => setView(viewMode.BRICK_BREAKER)}
                        onSignIn={() => setView(viewMode.SIGN_IN_SCREEN)}
                        onSignUp={() => setView(viewMode.SIGN_UP_SCREEN)}
                    />
                )}
                {currentView === viewMode.BRICK_BREAKER && (
                    <BrickBreaker
                        goToMainMenu={() => setView(viewMode.MAIN_MENU)}
                    />
                )}
                {currentView === viewMode.SIGN_IN_SCREEN && (
                    <SignInScreen
                        onSignIn={handleSignin}
                        onGoBack={() => setView(viewMode.MAIN_MENU)}
                    />
                )}
            </div>
            <Touchpad />
        </div>
    );
}

export default App;