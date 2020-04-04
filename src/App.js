import React from 'react';
import { Point } from './components/Point';
import { PointRow } from './components/PointRow';
import { gameScreen, keyCodes, directions, gameInitialState, levelsCount, levels } from './consts';
import { isBallAtPoint, getBallMovementResult, doesBallTouchGround, resetBallPosition } from './utils/ball';
import { isRacketAtPoint, moveRacket } from './utils/racket';
import { isScoreAtPoint, isLevelCompleted, checkAndSetHiScore } from './utils/score';
import "./App.css";
import { InfoScreen } from './components/InfoPanel';

const rows = [];
const cols = [];

for (let i = 0; i < gameScreen.height; i++) {
    rows.push(i);
}

for (let i = 0; i < gameScreen.width; i++) {
    cols.push(i);
}



class App extends React.Component {
    state = {
        ...gameInitialState,
        scored: 0
    };

    ballMovingInterval = null;

    setBallCoordinates (ballCoordinates) {
        this.setState({ballCoordinates});
    }

    goToTheNextLevel = () => {
        clearInterval(this.ballMovingInterval);
        this.ballMovingInterval = null;
        const { level, livesCount } = this.state;
        const nextLevel = level >= levelsCount ? 1 : level + 1;
        this.setState({
            ...gameInitialState,
            ...levels[nextLevel],
            level: nextLevel,
            livesCount: livesCount, 
            paused: true,
        });
    }

    restartGame = (fullRestart) => {
        const { scores, ballCoordinates, racketPosition, livesCount, ballMovingInterval } = gameInitialState;
        if (fullRestart) {
            checkAndSetHiScore(this.state.scored);
        }

        clearInterval(this.ballMovingInterval);
        this.ballMovingInterval = null;
        this.setState(state =>({
            ballMovingInterval: fullRestart ? ballMovingInterval : state.ballMovingInterval,
            level: fullRestart ? 1 : state.level,
            scores: fullRestart ? scores : state.scores,
            ballCoordinates: fullRestart ? ballCoordinates : resetBallPosition(state.racketPosition),
            racketPosition: fullRestart ? racketPosition : state.racketPosition,
            livesCount: fullRestart ? livesCount : state.livesCount - 1,
            scored: fullRestart ? 0 : state.scored,
            paused: true
        }));
        
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
        window.onkeydown = (event) => {
            if (event.keyCode === keyCodes.LEFT) {
                if (this.state.paused) return;
                this.setState(state => ({
                    racketPosition: moveRacket(directions.LEFT, state.racketPosition)
                }))
            } else if (event.keyCode === keyCodes.RIGHT) {
                if (this.state.paused) return;
                this.setState(state => ({
                    racketPosition: moveRacket(directions.RIGHT, state.racketPosition)
                }));
            } else if (event.keyCode === keyCodes.SPACE) {
                if (this.state.paused) {
                    this.ballMovingInterval = setInterval(this.handleBallMove, this.state.ballMovingInterval);
                } else {
                    clearInterval(this.ballMovingInterval);
                }
                this.setState({ paused: !this.state.paused });
            }
            else if (event.keyCode === keyCodes.RESTART) {
                this.restartGame(true);
            }
        }
    }

    render () {
        return (
            <div className="App">
                <div className="game-screen">
                    {rows.map(row => (
                        <PointRow key={row}>
                            {cols.map(col => (
                                <Point
                                    key={col}
                                    filled={
                                        isRacketAtPoint(this.state.racketPosition, col, row) ||
                                        isBallAtPoint(this.state.ballCoordinates, col, row) ||
                                        isScoreAtPoint(this.state.scores, col, row)
                                    }
                                />
                            ))}
                        </PointRow>
                    ))}
                </div>
                <InfoScreen
                    livesCount={this.state.livesCount}
                    level={this.state.level}
                    scored={this.state.scored}
                />
            </div>
        );
    }
}

export default App;
