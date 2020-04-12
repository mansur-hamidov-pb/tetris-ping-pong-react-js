import React from 'react';
import { range } from 'lodash';
import "./styles.css";
import { getHiScore } from '../../utils/score';

export const InfoScreen = ({
    livesCount,
    scored,
    level,
}) => {
    return (
        <div className="info-screen">
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
                        <img
                            src={require('../../assets/img/heart.png')}
                            alt="heart"
                            style={{
                                opacity: 0.65,
                                width: '14px',
                                height: '18px'
                            }}
                            key={_}
                        />
                    ))}
                </span>
            </div>
        </div>
    )
}