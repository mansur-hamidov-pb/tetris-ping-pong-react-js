import React from 'react';
import { range } from 'lodash';

import { InfoScreen } from './components/InfoPanel';
import { PauseMenu } from './components/PauseMenu';
import { Point } from './components/Point';
import { PointRow } from './components/PointRow';
import { Touchpad } from './components/Touchpad';

import {
    animation,
    directions,
    gameInitialState,
    gameScreen,
    levels,
    levelsCount,
} from './consts';

import controls from './utils/controls';
import {
    doesBallTouchGround,
    getBallMovementResult,
    isBallAtPoint,
    resetBallPosition
} from './utils/ball';
import { isRacketAtPoint, moveRacket } from './utils/racket';
import {
    checkAndSetHiScore,
    isLevelCompleted,
    isScoreAtPoint,
} from './utils/score';

import "./App.css";

class App extends React.Component {
    state = {
        ...gameInitialState,
        scored: 0
    };

    ballMovingInterval = null;
    loadingTimeout = null;

    isRowFilled = (row, col) => {
        return Boolean(this.state.loading) && this.state.loading <= row && col <= gameScreen.width;
    }

    goToTheNextLevel = () => {
        const { level, livesCount } = this.state;
        const nextLevel = level >= levelsCount ? 1 : level + 1;
        this.setState(
            {
                ...gameInitialState,
                ...levels[nextLevel],
                level: nextLevel,
                livesCount: livesCount
            },
            () => {
                clearInterval(this.ballMovingInterval);
                this.ballMovingInterval = setInterval(this.handleBallMove, this.state.ballMovingInterval);
                this.toggleLoadingAnimation(animation.FAST);
            }
        );  
    };

    togglePause = () => {
        const { paused, loading } = this.state;
        if (loading) {
            this.toggleLoadingAnimation();
        } else if (paused) {
            this.ballMovingInterval = setInterval(this.handleBallMove, this.state.ballMovingInterval);
        } else {
            clearInterval(this.ballMovingInterval);
        }
        if (!loading) {
            this.setState({ paused: !this.state.paused });
        }
    }

    restartGame = (fullRestart) => {
        const { scores, ballCoordinates, racketPosition, livesCount, ballMovingInterval } = gameInitialState;
        if (fullRestart) {
            checkAndSetHiScore(this.state.scored);
            this.toggleLoadingAnimation(animation.SLOW);
        } else {
            this.toggleLoadingAnimation(animation.FAST);
        }

        this.setState(state => ({
            ballMovingInterval: fullRestart ? ballMovingInterval : state.ballMovingInterval,
            level: fullRestart ? 1 : state.level,
            scores: fullRestart ? scores : state.scores,
            ballCoordinates: fullRestart ? ballCoordinates : resetBallPosition(state.racketPosition),
            racketPosition: fullRestart ? racketPosition : state.racketPosition,
            livesCount: fullRestart ? livesCount : state.livesCount - 1,
            scored: fullRestart ? 0 : state.scored,
            paused: false
        }));

        clearInterval(this.ballMovingInterval);
        this.ballMovingInterval = setInterval(this.handleBallMove, gameInitialState.ballMovingInterval);
    };

    toggleLoadingAnimation = (speed) => {
        const { loading } = this.state;
        if (loading) {
            clearInterval(this.loadingTimeout);
            this.loadingTimeout = null;
            this.setState({ loading: 0 });
        } else {
            this.setState({ loading: gameScreen.height });
            this.loadingTimeout = setInterval(
                () => {
                    if (this.state.loading) {
                        this.setState(state => ({ loading: state.loading - 1}));
                    } else {
                        clearInterval(this.loadingTimeout);
                        this.loadingTimeout = null;
                    }
                },
                speed
            );
        }
    };

    handleBallMove = () => {
        if (doesBallTouchGround(this.state.ballCoordinates)) {
            const remainingLivesCount = this.state.livesCount - 1;
            this.restartGame(!remainingLivesCount);
            return false;
        }
        if (isLevelCompleted(this.state.scores)) {
            this.goToTheNextLevel();
            return true;
        }
        const { ballCoordinates, scores, scored } = getBallMovementResult(this.state.ballCoordinates, this.state.racketPosition, this.state.scores);
        this.setState(state => ({ ballCoordinates, scores, scored: state.scored + (scored || 0) }))
    };

    componentDidMount () {
        controls.init();
        const { gameEvents } = controls;
        this.toggleLoadingAnimation(animation.SLOW);
        this.ballMovingInterval = setInterval(this.handleBallMove, this.state.ballMovingInterval);

        window.addEventListener('blur', () => {
            if (!this.state.paused) {
                this.togglePause();
            }
        });

        window.addEventListener(gameEvents.MOVE_RACKET_LEFT, () => {
            if (this.state.paused || this.state.loading) return;
            this.setState(state => moveRacket(directions.LEFT, state.racketPosition, state.ballCoordinates));
        });

        window.addEventListener(gameEvents.MOVE_RACKET_RIGHT, () => {
            if (this.state.paused || this.state.loading) return;
            this.setState(state => moveRacket(directions.RIGHT, state.racketPosition, state.ballCoordinates));
        });

        window.addEventListener(gameEvents.TOGGLE_PAUSE, () => {
            this.togglePause();
        });

        window.addEventListener(gameEvents.RESTART_GAME, () => {
            this.restartGame(true);
        });
    }

    render () {
        return (
            <div className="App">
                <div className="game-screen" id="gamescreen">
                    {range(1, gameScreen.height + 1).map((row) => (
                        <PointRow key={row}>
                            {range(1, gameScreen.width + 6).map((col) => (
                                <Point
                                    key={col}
                                    filled={
                                        isRacketAtPoint(this.state.racketPosition, col, row) ||
                                        isBallAtPoint(this.state.ballCoordinates, col, row) ||
                                        isScoreAtPoint(this.state.scores, col, row) ||
                                        this.isRowFilled(row, col)
                                    }
                                />
                            ))}
                        </PointRow>
                    ))}
                    <InfoScreen
                        livesCount={this.state.livesCount}
                        level={this.state.level}
                        scored={this.state.scored}
                    />
                    <PauseMenu
                        paused={this.state.paused}
                        onRestart={() => this.restartGame(true)}
                        onResume={this.togglePause}
                    />
                </div>
                <Touchpad />
            </div>
        );
    }
}

export default App;
