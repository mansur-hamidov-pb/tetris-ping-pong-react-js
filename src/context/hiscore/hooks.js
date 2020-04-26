import { useContext } from 'react';
import { HiScoreContext } from './index';

export function useHiScore () {
    return useContext(HiScoreContext);
}