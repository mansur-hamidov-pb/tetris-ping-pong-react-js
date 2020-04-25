import React from 'react';

import { Loading } from '../../components/Loading';
import { asyncDataStatus } from '../../consts';
import { useHiScore } from '../../context/hiscore/hooks';
import { Layout } from '../Layout';

import "./styles.scss";
import { Button } from '../../components/Button';

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
                        rating.data && rating.data.length ? (
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
                        ) : 'Empty table'
                    )}
                </div>
                <Button secondary onClick={onGoBack} label="GO BACK" />
            </div>
        </Layout>
    );
};
