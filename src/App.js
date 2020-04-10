import React from 'react';
import { InfoScreen } from './components/InfoPanel';
import { directions, gameInitialState, levelsCount, levels } from './consts';
import { getBallMovementResult, doesBallTouchGround, resetBallPosition } from './utils/ball';
import { moveRacket } from './utils/racket';
import { isLevelCompleted, checkAndSetHiScore } from './utils/score';
import controls from './utils/controls';
import "./App.css";
import { GameScreen } from './components/GameScreen';
import { Ball } from './components/Ball';

class App extends React.Component {
    state = {
        ...gameInitialState,
        scored: 0
    };

    ballMovingInterval = null;

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
        controls.init();
        const { gameEvents } = controls;

        window.addEventListener(gameEvents.MOVE_RACKET_LEFT, () => {
            if (this.state.paused) return;
            this.setState(state => moveRacket(directions.LEFT, state.racketPosition, state.ballCoordinates));
            // setTimeout(() => console.log(this.state.ballCoordinates));
        });

        window.addEventListener(gameEvents.MOVE_RACKET_RIGHT, () => {
            if (this.state.paused) return;
            this.setState(state => moveRacket(directions.RIGHT, state.racketPosition, state.ballCoordinates));
        });

        window.addEventListener(gameEvents.TOGGLE_PAUSE, () => {
            if (this.state.paused) {
                this.ballMovingInterval = setInterval(this.handleBallMove, this.state.ballMovingInterval);
            } else {
                clearInterval(this.ballMovingInterval);
            }
            this.setState({ paused: !this.state.paused });
        });

        window.addEventListener(gameEvents.RESTART_GAME, () => {
            this.restartGame(true);
        });
    }

    render () {
        const [, currentBallCoordinates] = this.state.ballCoordinates;
        return (
            <div className="App">
                <div className="game-screen" id="gamescreen">
                    <GameScreen scores={this.state.scores} />
                    <Ball {...currentBallCoordinates} />
                </div>
                <InfoScreen
                    livesCount={this.state.livesCount}
                    level={this.state.level}
                    scored={this.state.scored}
                />
                <div id="touchbar" style={{height: '50px', width: '100%', background: "red"}}/>
            </div>
        );
    }
}

export default App;
