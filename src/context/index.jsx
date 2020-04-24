import React from 'react';
import { UserProvider } from './user';

export const Provider = ({ children }) => (
    <UserProvider>
        {children}
    </UserProvider>
);
