export const gameScreen = {
    width: 10,
    height: 24
}

export const directions = {
    TOP: 'top',
    LEFT: 'left',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right'
}

export const keyCodes = {
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    RESTART: 82
}

const initialLivesCount = 4;

const scoreSamples = [
    {
        y: {
            3: { x: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } },
            4: { x: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } },
        }
    },
    {    
        y: {
            3: { x: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } },
            4: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true } }, 
            5: { x: { 3: true, 4: true, 5: true, 6: true } },
        }
    },
    {
        y: {
            3: { x: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } },
            4: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true } }, 
            5: { x: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } },
        }
    },
    {
        y: {
            3: { x: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } },
            4: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true } }, 
            5: { x: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } },
            6: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true } }, 
        }
    },
    {
        y: {
            3: { x: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } },
            4: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true } }, 
            5: { x: { 3: true, 4: true, 5: true, 6: true } },
            6: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true } }, 
            7: { x: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } },
        }
    },
    {
        y: {
            3: { x: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } },
            4: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true } }, 
            5: { x: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } },
            6: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true } }, 
            7: { x: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } },
        }
    },
]

const racketPositionSamples = [
    [
        { x: 3, y: 22 },
        { x: 4, y: 22 },
        { x: 5, y: 22 },
        { x: 6, y: 22 },
    ],
    [
        { x: 4, y: 22 },
        { x: 5, y: 22 },
        { x: 6, y: 22 },
    ],
    [
        { x: 4, y: 22 },
        { x: 5, y: 22 },
    ],
];

const initialBallCoordinates = [
    {
        x: 4,
        y: 23
    },
    {
        x: 5,
        y: 22
    }
];

export const levels = {
    1: {
        racketPosition: racketPositionSamples[0],
        scores: scoreSamples[0],
        ballMovingInterval: 170
    },
    2: {
        racketPosition: racketPositionSamples[0],
        scores: scoreSamples[0],
        ballMovingInterval: 160
    },
    3: {
        racketPosition: racketPositionSamples[0],
        scores: scoreSamples[1],
        ballMovingInterval: 150
    },
    4: {
        racketPosition: racketPositionSamples[0],
        scores: scoreSamples[1],
        ballMovingInterval: 140
    },
    5: {
        racketPosition: racketPositionSamples[1],
        scores: scoreSamples[2],
        ballMovingInterval: 130
    },
    6: {
        racketPosition: racketPositionSamples[1],
        scores: scoreSamples[2],
        ballMovingInterval: 120
    },
    7: {
        racketPosition: racketPositionSamples[1],
        scores: scoreSamples[3],
        ballMovingInterval: 110
    },
    8: {
        racketPosition: racketPositionSamples[1],
        scores: scoreSamples[3],
        ballMovingInterval: 100
    },
    9: {
        racketPosition: racketPositionSamples[2],
        scores: scoreSamples[4],
        ballMovingInterval: 90
    },
    10: {
        racketPosition: racketPositionSamples[2],
        scores: scoreSamples[4],
        ballMovingInterval: 80
    },
    11: {
        racketPosition: racketPositionSamples[2],
        scores: scoreSamples[5],
        ballMovingInterval: 70
    },
    12: {
        racketPosition: racketPositionSamples[2],
        scores: scoreSamples[5],
        ballMovingInterval: 60
    },
}

export const levelsCount = Object.keys(levels).length;

export const gameInitialState = {
    paused: true,
    level: 1,
    ballCoordinates: initialBallCoordinates,
    livesCount: initialLivesCount,
    ...levels[1]
}

