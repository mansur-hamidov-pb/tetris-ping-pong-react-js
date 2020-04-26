import React from 'react';
import { UserProvider } from './user';
import { HiScoreProvider } from './hiscore';

export const Provider = ({ children }) => (
    <UserProvider>
        <HiScoreProvider>
            {children}
        </HiScoreProvider>
    </UserProvider>
);
