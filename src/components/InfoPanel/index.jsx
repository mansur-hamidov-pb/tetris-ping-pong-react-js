import React from 'react';
import { range } from 'lodash';
import { gameScreen } from '../../consts';
import { PointRow } from '../PointRow';
import { Point } from '../Point';
import "./styles.css";
import { getHiScore } from '../../utils/score';

export const InfoScreen = ({
    livesCount,
    scored,
    level,
}) => {
    // const fillLivesFromRow = 12;
    // const fillLivesFromCol = 2;
    // const isPointFilled = (x, y, livesCount) => {
    //     const fillRow =
    //         y - fillLivesFromRow >= 0 &&
    //         y - fillLivesFromRow < gameInitialState.livesCount &&
    //         y - fillLivesFromRow >= gameInitialState.livesCount - livesCount;
    //     const fillCol = x === fillLivesFromCol
        
    //     return fillCol && fillRow;
    // }

    return (
        <div className="info-screen">
            {range(gameScreen.height).map((_, y) => (
                <PointRow key={y}>
                    {range(15 - gameScreen.width).map((_, x) => (
                        <Point key={x} />
                    ))}
                </PointRow>
            ))}
            <div className="info-block level">
                LEVEL <br/><span className="value">{level}</span>
            </div>
            <div className="info-block score">
                SCORE <br/><span className="value">{scored}</span>
            </div>
            <div className="info-block hi-score">
                HI-SCORE <br/><span className="value">{getHiScore()}</span>
            </div>
            <div className="info-block lives">
                LIVES <br />
                <span className="value">
                {range(livesCount).map(_ => (
                    <React.Fragment key={_}>&hearts;</React.Fragment>
                ))}
                </span>
            </div>
        </div>
    )
}