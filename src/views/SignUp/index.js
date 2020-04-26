import React from 'react';

import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { Loading } from '../../components/Loading';
import { Layout } from '../Layout';

import "./styles.scss";

export const SignUpScreen = ({
    onSignUp,
    onGoBack,
    isLoading,
    errors
}) => {
    const [isFormValid, setFormValid] = React.useState(false);
    const [fieldValues, setFieldValues] = React.useState({
        fullname: '',
        password: '',
        passwordRepeat: '',
        email: '',
        username: ''
    });
    const [fieldErrors, setFieldErrors] = React.useState({});

    const setFieldError = (error) => {
        
        setFieldErrors(state => ({ ...state, ...error }));
    };

    React.useEffect(
        () => {
            setFieldErrors({});
            if (fieldValues.username.length < 8) {
                if (fieldValues.username) {
                    setFieldError({ username: 'Too short username' });
                }
                setFormValid(false);
            } else {
                setFieldError({ username: null });
            }
            if (fieldValues.password.length < 6) {
                if (fieldValues.password.length) {
                    setFieldError({ password: 'Too short password' });
                }
                setFormValid(false);
            } else {
                setFieldError({ password: null });
            }
            if (fieldValues.password !== fieldValues.passwordRepeat) {
                if (fieldValues.passwordRepeat) {
                    setFieldError({ passwordRepeat: 'Passwords are different' });
                }
                setFormValid(false);
            } else {
                setFieldError({ passwordRepeat: null });
            }
            
            if(Object.keys(fieldValues).some(field => !Boolean(fieldValues[field]))) {
                setFormValid(false);
            } else {    
                setFormValid(
                    fieldValues.username.length >= 8 &&
                    fieldValues.password.length >= 6 &&
                    fieldValues.password === fieldValues.passwordRepeat
                );
            }
        },
        [fieldValues]
    );

    React.useEffect(
        () => {
            if (errors && errors.length) {
                errors.forEach(field =>  setFieldError({ [field]: `${field} already registered` }));
            }
        },
        [errors]
    )

    const handleSignUp = event => {
        event.preventDefault();
        const { passwordRepeat, ...fields } = fieldValues;
        onSignUp(fields);
    }

    const setFieldValue = React.useCallback(
        (value, field) => {
            setFieldValues(state => ({
                ...state,
                [field]: value
            }))
        },
        []
    )

    return (
        <Layout>
            <form className="sign-up" onSubmit={handleSignUp}>
                <div className="sign-up__content">
                    <TextInput
                        id="username"
                        disabled={isLoading}
                        placeholder="Enter username"
                        value={fieldValues.username}
                        errorMessage={fieldErrors.username}
                        onChange={setFieldValue}
                        label="Username"
                    />
                    <TextInput
                        id="email"
                        type="email"
                        disabled={isLoading}
                        placeholder="Enter email"
                        value={fieldValues.email}
                        errorMessage={fieldErrors.email}
                        onChange={setFieldValue}
                        label="Email"
                    />
                    <TextInput
                        id="fullname"
                        disabled={isLoading}
                        placeholder="Enter your full name"
                        value={fieldValues.fullname}
                        onChange={setFieldValue}
                        label="Full Name"
                    />
                    <TextInput
                        type="password"
                        id="password"
                        disabled={isLoading}
                        placeholder="Enter password"
                        value={fieldValues.password}
                        errorMessage={fieldErrors.password}
                        onChange={setFieldValue}
                        label="Password"
                    />
                    <TextInput
                        type="password"
                        id="passwordRepeat"
                        disabled={isLoading}
                        placeholder="Re-Enter password"
                        errorMessage={fieldErrors.passwordRepeat }
                        isValid={fieldValues.password && fieldValues.password === fieldValues.passwordRepeat}
                        value={fieldValues.passwordRepeat}
                        onChange={setFieldValue}
                        label="Password repeat"
                    />
                    <Button
                        block
                        primary
                        disabled={isLoading || !isFormValid}
                        label="SIGN UP"
                        onClick={handleSignUp}
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
