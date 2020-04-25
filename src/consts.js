export const API_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://brickbreaker.local'
        : 'http://brickbreaker.mygamesonline.org'

export const gameScreen = {
    width: 10,
    height: 24
}

export const animation = {
    FAST: 10,
    SLOW: 100
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

const initialLivesCount = 4;

const scoreSamples = [
    {
        y: {
            5: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true } },
            6: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true } },
        }
    },
    {    
        y: {
            5: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true } },
            6: { x: { 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } }, 
            7: { x: { 4: true, 5: true, 6: true, 7: true } },
        }
    },
    {
        y: {
            5: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true } },
            6: { x: { 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } }, 
            7: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true } },
        }
    },
    {
        y: {
            5: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true } },
            6: { x: { 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } }, 
            7: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true } },
            8: { x: { 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } }, 
        }
    },
    {
        y: {
            5: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true } },
            6: { x: { 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } }, 
            7: { x: { 4: true, 5: true, 6: true, 7: true } },
            8: { x: { 3: true, 4: true, 5: true, 6: true, 7: true, 8: true } }, 
            9: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true } },
        }
    },
    {
        y: {
            5: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true } },
            6: { x: { 3: true, 4: true, 5: true, 6: true, 7: true, 8: true} },
            7: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true } },
            8: { x: { 3: true, 4: true, 5: true, 6: true, 7: true, 8: true} },
            9: { x: { 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true } },
        }
    },
]

const racketPositionSamples = [
    [
        { x: 4, y: 24 },
        { x: 5, y: 24 },
        { x: 6, y: 24 },
        { x: 7, y: 24 },
    ],
    [
        { x: 5, y: 24 },
        { x: 6, y: 24 },
        { x: 7, y: 24 },
    ],
    [
        { x: 5, y: 24 },
        { x: 6, y: 24 },
    ],
];

const initialBallCoordinates = [
    {
        x: 6,
        y: 23
    },
    {
        x: 6,
        y: 23
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
    paused: false,
    level: 1,
    ballCoordinates: initialBallCoordinates,
    livesCount: initialLivesCount,
    loading: 0,
    ...levels[1]
};

export const asyncDataStatus = {
    INITIAL: 'initial',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
};

export const viewMode = {
    BRICK_BREAKER: 'brick_breaker',
    MAIN_MENU: 'main_menu',
    SIGN_IN_SCREEN: 'sign_in_screen',
    SIGN_UP_SCREEN: 'sign_up_screen'
}

