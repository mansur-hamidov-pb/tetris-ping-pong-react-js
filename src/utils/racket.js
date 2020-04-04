import { directions, gameScreen } from '../consts';

export function isRacketAtPoint (racketCoordinates, x, y) {
    const isRacketAtThisRow = getRacketVerticalPosition(racketCoordinates) === y;
    const racketX = getRacketHorizontalCoordinates(racketCoordinates);

    return racketX.includes(x) && isRacketAtThisRow;
}

export function getRacketVerticalPosition (racketCoordinates) {
    return racketCoordinates[0].y
}

export function getRacketHorizontalCoordinates (racketCoordinates) {
    return racketCoordinates.map(coordinate => coordinate.x);
}

export function moveRacket (direction, racketCoordinates) {
    const sliceLength = racketCoordinates.length;
    const racketVerticalPlacement = getRacketVerticalPosition(racketCoordinates);

    if (direction === directions.LEFT) {
        const racketPlacementFromLeft = getRacketHorizontalCoordinates(racketCoordinates)[0];
        if (racketPlacementFromLeft === 0) {
            return racketCoordinates;
        } else {
            return [{x: racketPlacementFromLeft - 1, y: racketVerticalPlacement}, ...racketCoordinates].slice(0, sliceLength);
        }
    } else {
        const racketPlacementFromRight = getRacketHorizontalCoordinates(racketCoordinates)[racketCoordinates.length - 1];
        if (racketPlacementFromRight === gameScreen.width - 1) {
            return racketCoordinates;
        } else {
            return [...racketCoordinates, {x: racketPlacementFromRight + 1, y: racketVerticalPlacement}].slice(-sliceLength);
        }
    }
}
