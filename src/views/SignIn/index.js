import React from 'react';

import { Layout } from '../Layout';

import "./styles.scss";
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';

export const SignInScreen = ({
    onSignIn,
    onGoBack,
    errors
}) => {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleSignin = event => {
        event.preventDefault();
        onSignIn(login, password);
    }
    return (
        <Layout>
            <form className="sign-in" onSubmit={handleSignin}>
                <div className="sign-in__content">
                    <TextInput
                        id="login"
                        placeholder="Enter username or email"
                        value={login}
                        onChange={setLogin}
                        label="Username or email"
                    />
                    <TextInput
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={setPassword}
                        label="Password"
                    />
                    <Button
                        block
                        primary
                        label="SIGN IN"
                        onClick={handleSignin}
                    />
                    <Button
                        block
                        secondary
                        label="GO BACK"
                        type="button"
                        onClick={onGoBack}
                    />
                </div>
            </form>
        </Layout>
    );
};
