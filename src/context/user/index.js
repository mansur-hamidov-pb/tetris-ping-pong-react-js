import React, { createContext, useState } from 'react';
import { asyncDataStatus } from '../../consts';
import { userService } from '../../services/user';
import { httpClient } from '../../httpClient';

export const UserContext = createContext({
    data: null,
    clearErrors: null,
    signIn: null,
    signOut: null,
    signUp: null,
});

export const UserProvider = ({ children }) => {
    const [data, setData] = useState({
        authorized: false,
        status: asyncDataStatus.INITIAL,
        erros: null
    });

    React.useEffect(
        () => {
            const authToken = localStorage.getItem('authToken');
            if (authToken) {
                setData({
                    status: asyncDataStatus.LOADING
                });
    
                userService.getData()
                    .then(({ data: _data }) => {
                        if (_data) {
                            setData({
                                authorized: true,
                                username: _data.username,
                                avatar: _data.avatar,
                                status: asyncDataStatus.SUCCESS
                            });
                        } 
                    })
                    .catch(() => {
                        setData({
                            authorized: false,
                            status: asyncDataStatus.INITIAL
                        });
                    });
            }
        },
        []
    );

    const handleSignIn = (_data) => {
        setData(() => ({
            status: asyncDataStatus.LOADING
        }));

        userService.signIn(_data)
            .then(({ data }) => {
                localStorage.setItem('authToken', data['Auth-Token']);
                httpClient.defaults.headers['Auth-Token'] = data['Auth-Token'];
                setData(() => ({
                    authorized: true,
                    username: data.username,
                    avatar: data.avatar,
                    status: asyncDataStatus.SUCCESS,
                    errors: null
                }));
            })
            .catch(error => {
                if (error.response) {
                    setData({
                        authorized: false,
                        status: asyncDataStatus.ERROR,
                        errors: ["Invalid login/password"]
                    });
                }
            });
    };

    const handleSignOut = () => {
        setData({
            status: asyncDataStatus.LOADING,
            errors: null
        });

        userService.signOut()
            .then(() => {
                httpClient.defaults.headers['Auth-Token'] = null;
                setData({
                    authorized: false,
                    status: asyncDataStatus.INITIAL
                })
            })
            .catch(() => setData({ status: asyncDataStatus.ERROR }));
    };

    const handleSignUp = (_data) => {
        setData({
            status: asyncDataStatus.LOADING
        });

        userService.signUp(_data)
            .then(({ data }) => {
                localStorage.setItem('authToken', data['Auth-Token']);
                httpClient.defaults.headers['Auth-Token'] = data['Auth-Token'];
                setData({
                    authorized: true,
                    username: data.username,
                    avatar: data.avatar,
                    status: asyncDataStatus.SUCCESS,
                    errors: null
                });
            })
            .catch(error => {
                if (error.response) {
                    setData({
                        authorized: false,
                        status: asyncDataStatus.ERROR,
                        errors: error.response.data.error_fields
                    });
                }
            });
    };

    const clearErrors = () => {
        setData(state => ({
            ...state,
            status: asyncDataStatus.INITIAL,
            errors: null
        }));
    }


    return (
        <UserContext.Provider value={{
            data,
            clearErrors,
            signIn: handleSignIn,
            signOut: handleSignOut,
            signUp: handleSignUp
        }}>
            {children}
        </UserContext.Provider>
    )
};
