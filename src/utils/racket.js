import { directions, gameScreen } from '../consts';
import { doesBallTouchRacket, getNextCoordinates as getBallNextCoordinates, changeBallMoovingDirection } from './ball';

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

export function moveRacket (direction, racketCoordinates, ballCoordinates) {
    const sliceLength = racketCoordinates.length;
    const racketVerticalPlacement = getRacketVerticalPosition(racketCoordinates);
    const ballTouchesRacket = doesBallTouchRacket(ballCoordinates, racketCoordinates);
    let nextBallCoordinates;

    if (direction === directions.LEFT) {
        const racketPlacementFromLeft = getRacketHorizontalCoordinates(racketCoordinates)[0];
        if (racketPlacementFromLeft === 1) {
            
            return { racketPosition: racketCoordinates, ballCoordinates };
        } else {
            if (ballTouchesRacket) {
                nextBallCoordinates = changeBallMoovingDirection(
                    getBallNextCoordinates(ballCoordinates, directions.LEFT),
                    directions.TOP_LEFT
                );
            } else {
                nextBallCoordinates = ballCoordinates;
            }
            return {
                ballCoordinates: nextBallCoordinates,
                racketPosition: [{x: racketPlacementFromLeft - 1, y: racketVerticalPlacement}, ...racketCoordinates].slice(0, sliceLength)
            };
        }
    } else {
        const racketPlacementFromRight = getRacketHorizontalCoordinates(racketCoordinates)[racketCoordinates.length - 1];
        if (racketPlacementFromRight === gameScreen.width) {
            return { racketPosition: racketCoordinates, ballCoordinates };
        } else {
            if (ballTouchesRacket) {
                nextBallCoordinates = changeBallMoovingDirection(
                    getBallNextCoordinates(ballCoordinates, directions.RIGHT),
                    directions.TOP_RIGHT
                );
            } else {
                nextBallCoordinates = ballCoordinates;
            }
            
            return {
                ballCoordinates:  nextBallCoordinates,
                racketPosition: [...racketCoordinates, {x: racketPlacementFromRight + 1, y: racketVerticalPlacement}].slice(-sliceLength)
            };
        }
    }
}
