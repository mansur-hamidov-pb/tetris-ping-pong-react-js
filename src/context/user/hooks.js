import { useContext } from 'react';
import { UserContext } from './index';

export function useUser () {
    return useContext(UserContext);
}