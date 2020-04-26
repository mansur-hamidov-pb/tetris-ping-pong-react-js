import React from 'react';

import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading';
import { asyncDataStatus } from '../../consts';
import { useHiScore } from '../../context/hiscore/hooks';
import { Layout } from '../Layout';

import "./styles.scss";

export const Rating = ({
    onGoBack
}) => {
    const {
        rating,
        getRating
    } = useHiScore();

    React.useEffect(getRating, []);
    return (
        <Layout>
            <div className="rating">
                <div className="rating__content">
                    {rating.status === asyncDataStatus.LOADING && (
                        <Loading />
                    )}
                    {rating.status === asyncDataStatus.SUCCESS && (
                        rating.data && rating.data.map ? (
                            rating.data.map((record, index) => (
                                <div className="rating__content__item">
                                    <div className="rating__content__item__user">
                                        {index + 1}. {record.fullname}
                                    </div>
                                    <div className="rating__content__item__score">
                                        {record.score}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="rating__content__item" style={{ justifyContent: 'center' }}>
                                EMPTY TABLE   
                            </div>
                        )
                    )}
                </div>
                <Button secondary onClick={onGoBack} label="GO BACK" />
            </div>
        </Layout>
    );
};
