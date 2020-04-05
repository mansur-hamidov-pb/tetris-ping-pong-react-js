import { cloneDeep } from 'lodash';

export function isScoreAtPoint (scoreCoordinates, x, y) {
    return scoreCoordinates.y[y] && scoreCoordinates.y[y].x && scoreCoordinates.y[y].x[x]
}

export function clearScoredItems (scoreCoordinates, touchedScores) {
    const newScoreCoordinates = cloneDeep(scoreCoordinates);

    if (touchedScores.length) {
        touchedScores.forEach(({ x, y }) => {
            newScoreCoordinates.y[y].x[x] = false;
        });
    }
    return newScoreCoordinates;
}

export function isLevelCompleted (scoreCoordinates) {
    return Object.values(scoreCoordinates.y).every(_y => {
        return Object.values(_y.x).every(_x => {
            return !_x;
        });
    });
}

export function getHiScore () {
    return localStorage.getItem('hiScore') || 0;
}

export function checkAndSetHiScore (score) {
    const currentHiScore = getHiScore();

    if (score > currentHiScore) {
        localStorage.setItem('hiScore', score);
    }
}
