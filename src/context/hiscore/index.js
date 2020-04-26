import React from 'react';

import { hiScoreService } from '../../services/hiscore';
import { asyncDataStatus } from '../../consts';

export const HiScoreContext = React.createContext({
    record: null,
    setHiScore: null,
    rating: null,
    getRating: null
});

export const HiScoreProvider = ({
    children
}) => {
    const [record, updateRecord] = React.useState(localStorage.getItem('hiScore'));
    const [rating, setRatingTable] = React.useState({
        status: asyncDataStatus.INITIAL,
        data: []
    });

    React.useEffect(
        () => {
            hiScoreService.getHiScore()
                .then(response => {
                    updateRecord(response.data || '0');
                    localStorage.setItem('hiScore', response.data || '0')
                });
        }
    );

    const setHiScore = (score) => {
        if (score > record) {
            score = score.toString();
            updateRecord(score);
            localStorage.setItem('hiScore', score);
            hiScoreService.setHiScore(score);
        }
    }

    const getRating = () => {
        setRatingTable(state => ({...state, status: asyncDataStatus.LOADING}));
        hiScoreService.getRating()
            .then(({ data }) => setRatingTable(
                state => ({
                    ...state,
                    data,
                    status: asyncDataStatus.SUCCESS
                }))
            )
            .catch(() => setRatingTable(state => ({ ...state, status: asyncDataStatus.ERROR })))
    }

    return (
        <HiScoreContext.Provider value={{ record, setHiScore, rating, getRating }}>
            {children}
        </HiScoreContext.Provider>
    )
}