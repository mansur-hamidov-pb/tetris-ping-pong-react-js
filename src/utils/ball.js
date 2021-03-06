import { cloneDeep } from 'lodash';
import { directions, gameScreen } from '../consts';
import { getRacketVerticalPosition, getRacketHorizontalCoordinates } from './racket';
import { clearScoredItems } from './score';

export function isBallAtPoint (ballCoordinates, x, y) {
    const [,ballCurrentCoordinates] = ballCoordinates;
    return ballCurrentCoordinates.x === x && ballCurrentCoordinates.y === y;
}

export function getNextCoordinates (ballCoordinates, direction) {
    const [,currentCoordinates] = cloneDeep(ballCoordinates);
    const nextCoordinates = {};

    switch (direction) {
        case directions.TOP_LEFT:
            nextCoordinates.x = currentCoordinates.x - 1;
            nextCoordinates.y = currentCoordinates.y - 1;
            break;
        case directions.TOP_RIGHT:
            nextCoordinates.x = currentCoordinates.x + 1;
            nextCoordinates.y = currentCoordinates.y - 1;
            break;
        case directions.BOTTOM_LEFT:
            nextCoordinates.x = currentCoordinates.x - 1;
            nextCoordinates.y = currentCoordinates.y + 1;
            break;
        case directions.BOTTOM_RIGHT:
            nextCoordinates.x = currentCoordinates.x + 1;
            nextCoordinates.y = currentCoordinates.y + 1;
            break;
        case directions.RIGHT:
            nextCoordinates.x = currentCoordinates.x + 1;
            nextCoordinates.y = currentCoordinates.y;
            break;
        case directions.LEFT:
        default:
            nextCoordinates.x = currentCoordinates.x - 1;
            nextCoordinates.y = currentCoordinates.y;
    }
    return [currentCoordinates, nextCoordinates];
}

export function changeBallMoovingDirection (ballCoordinates, direction) {
    const [,currentCoordinates] = cloneDeep(ballCoordinates);
    const previousCoordinates = {};

    if (direction === directions.TOP_RIGHT) {
        previousCoordinates.x = currentCoordinates.x - 1;
        previousCoordinates.y = currentCoordinates.y + 1;
    } else if (direction === directions.TOP_LEFT) {
        previousCoordinates.x = currentCoordinates.x + 1;
        previousCoordinates.y = currentCoordinates.y + 1;
    } else {
        return ballCoordinates;
    }

    return [previousCoordinates, currentCoordinates];
}

export function getScoringResult (ballCoordinates, ballMoveDirection, scoreCoordinates) {
    const approximateScoreCoordinates = getApproximateTouchedBallAndNextDirections(ballCoordinates, ballMoveDirection);
    let { nextDirection, touchedScores} = getExactTouchedBallAndDirections(approximateScoreCoordinates, scoreCoordinates);

    if (touchedScores.length) {
        const wallTouchSide = getWallTouchedSide(ballCoordinates);
        if (wallTouchSide) {
            return {
                nextDirection: getWallTouchingBallNextDirection(ballCoordinates, wallTouchSide, nextDirection),
                touchedScores
            };
        }
        const nextData = getScoringResult(ballCoordinates, nextDirection, scoreCoordinates);
        if (nextData.touchedScores.length) {
            touchedScores = [...touchedScores, ...nextData.touchedScores];
            return {
                touchedScores,
                nextDirection: nextData.nextDirection,
            };
        } else {
            return { nextDirection, touchedScores };
        }
    } else {
        return { touchedScores, nextDirection: nextDirection || ballMoveDirection };
    }
}

export function getBallMovementResult (ballCoordinates, racketCoordinates, scoreCoordinates) {
    const [previousCoordinates, currentCoordinates] = ballCoordinates;
    if (JSON.stringify(previousCoordinates) === JSON.stringify(currentCoordinates)) {
        return {
            ballCoordinates,
            scores: scoreCoordinates
        };
    }
    const ballMovementDirection = getBallMoveDirection(ballCoordinates);
    const wallTouchSide = getWallTouchedSide(ballCoordinates);
    const ballTouchesRacket = doesBallTouchRacket(ballCoordinates, racketCoordinates);

    if (ballTouchesRacket) {
        const nextDirection = getRacketTouchingBallNextDirection(ballCoordinates, wallTouchSide, ballMovementDirection);
        return {
            ballCoordinates: getNextCoordinates(ballCoordinates, nextDirection),
            scores: scoreCoordinates
        }
    }
    let nextDirection = wallTouchSide ? getWallTouchingBallNextDirection(ballCoordinates, wallTouchSide, ballMovementDirection) : ballMovementDirection;
    const ballTouchesRacketCorner = doesBallTouchRacketCorner(ballCoordinates, racketCoordinates, nextDirection);
    if (ballTouchesRacketCorner) {
        const nextDirection =
            ballMovementDirection === directions.BOTTOM_LEFT 
                ? directions.TOP_RIGHT
                : directions.TOP_LEFT;
        return {
            ballCoordinates: getNextCoordinates(ballCoordinates, nextDirection),
            scores: scoreCoordinates
        };
    }
    const scoringResult = getScoringResult(ballCoordinates, nextDirection, scoreCoordinates);

    return {
        ballCoordinates: getNextCoordinates(ballCoordinates, scoringResult.nextDirection),
        scores: clearScoredItems(scoreCoordinates, scoringResult.touchedScores),
        scored: scoringResult.touchedScores.length * 25
    }
}

export function getCurrentBallCoordinates (ballCoordinates) {
    return ballCoordinates[1];
}

export function getPreviousBallCoordinates (ballCoordinates) {
    return ballCoordinates[0];
}

export function getBallMoveDirection (ballCoordinates) {
    const [previousCoordinates, currentCoordinates] = ballCoordinates;

    if (currentCoordinates.x > previousCoordinates.x && currentCoordinates.y > previousCoordinates.y) {
        return directions.BOTTOM_RIGHT;
    } else if (currentCoordinates.x > previousCoordinates.x && currentCoordinates.y < previousCoordinates.y) {
        return directions.TOP_RIGHT;
    } else if (currentCoordinates.x < previousCoordinates.x && currentCoordinates.y > previousCoordinates.y) {
        return directions.BOTTOM_LEFT;
    } else if (currentCoordinates.x < previousCoordinates.x && currentCoordinates.y < previousCoordinates.y) {
        return directions.TOP_LEFT;
    } else {
        return null;
    }
}

export function getWallTouchedSide (ballCoordinates) {
    const [,currentCoordinates] = ballCoordinates;

    if (currentCoordinates.x === 1 && currentCoordinates.y === gameScreen.height) {
        return directions.BOTTOM_LEFT;
    } else if (currentCoordinates.x === gameScreen.width && currentCoordinates.y === gameScreen.height) {
        return directions.BOTTOM_RIGHT;
    } else if (currentCoordinates.x > 1 && currentCoordinates.y === gameScreen.height) {
        return directions.BOTTOM;
    } else if (currentCoordinates.x === 1 && currentCoordinates.y === 1 ) {
        return directions.TOP_LEFT;
    } else if (currentCoordinates.x === gameScreen.width && currentCoordinates.y === 1) {
        return directions.TOP_RIGHT
    } else if (currentCoordinates.x === 1 && currentCoordinates.y > 1) {
        return directions.LEFT;
    } else if (currentCoordinates.x === gameScreen.width && currentCoordinates.y > 1) {
        return directions.RIGHT;
    } else if (currentCoordinates.x > 1 && currentCoordinates.y === 1) {
        return directions.TOP;
    } else {
        return null;
    }
}

export function doesBallTouchGround (ballCoordinates) {
    const groundTouchSides = [directions.BOTTOM_LEFT, directions.BOTTOM, directions.BOTTOM_RIGHT];
    const wallTouchSide = getWallTouchedSide(ballCoordinates);

    return groundTouchSides.includes(wallTouchSide);
}

export function doesBallTouchRacket (ballCoordinates, racketCoordinates) {
    const [, currentCoordinates] = ballCoordinates;
    const racketVerticalPosition = getRacketVerticalPosition(racketCoordinates);
    const ballMoveDirection = getBallMoveDirection(ballCoordinates);

    if ([directions.TOP_RIGHT, directions.TOP_LEFT].includes(ballMoveDirection)) {
        return false;
    }

    if (currentCoordinates.y !== racketVerticalPosition - 1) {
        return false;
    } else  {
        return getRacketHorizontalCoordinates(racketCoordinates).includes(currentCoordinates.x);
    }
}

export function doesBallTouchRacketCorner (ballCoordinates, racketCoordinates, ballMovementDirection) {
    const { BOTTOM_RIGHT, BOTTOM_LEFT } = directions;
    const racketRightCorner = racketCoordinates[racketCoordinates.length - 1];
    const racketLeftCorner = racketCoordinates[0];
    const [, currentCoordinates] = ballCoordinates;

    const isBallOnLeftCorner = currentCoordinates.x === racketLeftCorner.x - 1 && currentCoordinates.y === racketLeftCorner.y - 1;
    const isBallOnRightCorner = currentCoordinates.x === racketRightCorner.x + 1 && currentCoordinates.y === racketRightCorner.y - 1;
    return (isBallOnLeftCorner && ballMovementDirection === BOTTOM_RIGHT) || (isBallOnRightCorner && ballMovementDirection === BOTTOM_LEFT);
}

export function getApproximateTouchedBallAndNextDirections (ballCoordinates, ballMoveDirection) {
    const [,currentCoordinates] = ballCoordinates;
    const possibleScoresToTouch = [];
    const possibleNextDirections = [];
    let possibleCornerScoreToTouch = null;

    switch (ballMoveDirection) {
        case directions.TOP_LEFT:
            possibleScoresToTouch[0] = {
                x: currentCoordinates.x,
                y: currentCoordinates.y - 1,
            };
            possibleNextDirections[0] = directions.BOTTOM_LEFT;
            possibleScoresToTouch[1] = {
                x: currentCoordinates.x - 1,
                y: currentCoordinates.y,
            };
            possibleNextDirections[1] = directions.TOP_RIGHT;
            possibleCornerScoreToTouch = {
                x: currentCoordinates.x - 1,
                y: currentCoordinates.y - 1
            };
            possibleNextDirections[2] = directions.BOTTOM_RIGHT;
            break;

        case directions.TOP_RIGHT:
            possibleScoresToTouch[0] = {
                x: currentCoordinates.x,
                y: currentCoordinates.y - 1,
            };
            possibleNextDirections[0] = directions.BOTTOM_RIGHT;
            possibleScoresToTouch[1] = {
                x: currentCoordinates.x + 1,
                y: currentCoordinates.y,
            };
            possibleNextDirections[1] = directions.TOP_LEFT;
            possibleCornerScoreToTouch = {
                x: currentCoordinates.x + 1,
                y: currentCoordinates.y - 1
            };
            possibleNextDirections[2] = directions.BOTTOM_LEFT;
            break;

        case directions.BOTTOM_RIGHT:
            possibleScoresToTouch[0] = {
                x: currentCoordinates.x,
                y: currentCoordinates.y + 1,
            };
            possibleNextDirections[0] = directions.TOP_RIGHT;
            possibleScoresToTouch[1] = {
                x: currentCoordinates.x + 1,
                y: currentCoordinates.y,
            };
            possibleNextDirections[1] = directions.BOTTOM_LEFT;
            possibleCornerScoreToTouch = {
                x: currentCoordinates.x + 1,
                y: currentCoordinates.y + 1
            };
            possibleNextDirections[2] = directions.TOP_LEFT;
            break;
            
        case directions.BOTTOM_LEFT:
        default:
            possibleScoresToTouch[0] = {
                x: currentCoordinates.x,
                y: currentCoordinates.y + 1,
            };
            possibleNextDirections[0] = directions.TOP_LEFT;
            possibleScoresToTouch[1] = {
                x: currentCoordinates.x - 1,
                y: currentCoordinates.y,
            };
            possibleNextDirections[1] = directions.BOTTOM_RIGHT;
            possibleCornerScoreToTouch = {
                x: currentCoordinates.x - 1,
                y: currentCoordinates.y + 1
            };
            possibleNextDirections[2] = directions.TOP_RIGHT;
    }

    return {
        possibleScoresToTouch,
        possibleNextDirections,
        possibleCornerScoreToTouch
    }
}

export function getExactTouchedBallAndDirections (approximateData, scoreCoordinates) {
    const {
        possibleScoresToTouch,
        possibleNextDirections,
        possibleCornerScoreToTouch,
    } = approximateData;
    const exactlyTouchedScores = [];
    let touchedScoresCount = 0;
    let exactDirection;

    possibleScoresToTouch.forEach(({x, y}, index) => {
        if (scoreCoordinates.y[y] && scoreCoordinates.y[y].x[x]) {
            touchedScoresCount++;
            exactlyTouchedScores.push({ x, y });
            exactDirection = possibleNextDirections[index];
        }
    });

    if (touchedScoresCount === 2) {
        exactDirection = possibleNextDirections[2];
    } else if (!touchedScoresCount) {
        const { x, y } = possibleCornerScoreToTouch;
        if (scoreCoordinates.y[y] && scoreCoordinates.y[y].x[x]) {
            exactlyTouchedScores.push({ x, y });
            exactDirection = possibleNextDirections[2];
        }
    }

    return { nextDirection: exactDirection, touchedScores: exactlyTouchedScores};
}

export function getWallTouchingBallNextDirection (ballCoordinates, wallTouchSide, ballMoveDirection) {

    if (wallTouchSide === directions.TOP_RIGHT) {
        return directions.BOTTOM_LEFT;
    } else if (wallTouchSide === directions.TOP_LEFT) {
        return directions.BOTTOM_RIGHT;
    } else if (wallTouchSide === directions.RIGHT && ballMoveDirection === directions.TOP_RIGHT) {
        return directions.TOP_LEFT;
    } else if (wallTouchSide === directions.RIGHT && ballMoveDirection === directions.BOTTOM_RIGHT) {
        return directions.BOTTOM_LEFT
    } else if (wallTouchSide === directions.LEFT && ballMoveDirection === directions.TOP_LEFT) {
        return directions.TOP_RIGHT
    } else if (wallTouchSide === directions.LEFT && ballMoveDirection === directions.BOTTOM_LEFT) {
        return directions.BOTTOM_RIGHT
    } else if (wallTouchSide === directions.TOP && ballMoveDirection === directions.TOP_RIGHT) {
        return directions.BOTTOM_RIGHT;
    } else if (wallTouchSide === directions.TOP && ballMoveDirection === directions.TOP_LEFT) {
        return directions.BOTTOM_LEFT;
    } else if (wallTouchSide === directions.BOTTOM && ballMoveDirection === directions.BOTTOM_LEFT) {
        return directions.TOP_LEFT;
    } else if (wallTouchSide === directions.BOTTOM && ballMoveDirection === directions.BOTTOM_RIGHT) {
        return directions.TOP_RIGHT;
    } else if (wallTouchSide === directions.BOTTOM_LEFT) {
        return directions.TOP_RIGHT
    } else if (wallTouchSide === directions.BOTTOM_RIGHT) {
        return directions.TOP_LEFT;
    }
}

export function getRacketTouchingBallNextDirection (ballCoordinates, wallTouchSide) {
    const ballMoveDirection = getBallMoveDirection(ballCoordinates);

    if ([directions.LEFT, directions.BOTTOM_LEFT].includes(wallTouchSide)) {
        return directions.TOP_RIGHT;
    } else if ([directions.RIGHT, directions.BOTTOM_RIGHT].includes(wallTouchSide)) {
        return directions.TOP_LEFT;
    } else if (ballMoveDirection === directions.BOTTOM_LEFT) {
        return directions.TOP_LEFT;
    } else if (ballMoveDirection === directions.BOTTOM_RIGHT) {
        return directions.TOP_RIGHT;
    }
}

export function resetBallPosition (racketCoordinates) {
    const ballCoordinates = {
        x: racketCoordinates[racketCoordinates.length - 2].x + 1,
        y: getRacketVerticalPosition(racketCoordinates) - 1
    };

    return [ballCoordinates, ballCoordinates];
}