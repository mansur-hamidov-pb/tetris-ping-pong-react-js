import React from 'react';

import { Layout } from '../Layout';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';

import "./styles.scss";
import { Loading } from '../../components/Loading';

export const SignInScreen = ({
    onSignIn,
    onGoBack,
    isLoading,
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
                        disabled={isLoading}
                        placeholder="Enter username or email"
                        value={login}
                        onChange={setLogin}
                        label="Username or email"
                    />
                    <TextInput
                        password
                        id="password"
                        disabled={isLoading}
                        placeholder="Enter password"
                        value={password}
                        onChange={setPassword}
                        label="Password"
                    />
                    <Button
                        block
                        primary
                        disabled={isLoading}
                        label="SIGN IN"
                        onClick={handleSignin}
                    />
                    <Button
                        block
                        secondary
                        disabled={isLoading}
                        label="GO BACK"
                        type="button"
                        onClick={onGoBack}
                    />
                    {isLoading && <Loading />}
                </div>
            </form>
        </Layout>
    );
};
