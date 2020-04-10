import React from 'react';
import { range } from 'lodash';
import { gameScreen } from '../../consts';
import { Point } from '../Point';
import { PointRow } from '../PointRow';
import { isScoreAtPoint } from '../../utils/score';

export class GameScreen extends React.Component {
    shouldComponentUpdate (nextProps) {
        return nextProps.scores !== this.props.scores;
    }

    render () {
        return range(1, gameScreen.height + 1).map((row) => (
            <PointRow key={row}>
                {range(1, gameScreen.width + 6).map((col) => (
                    <Point key={col} filled={isScoreAtPoint(this.props.scores, col, row)}/>
                ))}
            </PointRow>
        ))
    }
}