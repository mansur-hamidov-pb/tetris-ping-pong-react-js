import React from 'react';
import { range } from 'lodash';

import { Point } from '../components/Point';
import { PointRow } from '../components/PointRow';
import { gameScreen } from '../consts';

export const Layout = ({children}) => (
    <div>
        {range(1, gameScreen.height + 1).map((row) => (
            <PointRow key={row}>
                {range(1, gameScreen.width + 6).map((col) => (
                    <Point key={col} />
                ))}
            </PointRow>
        ))}
        {children}
    </div>
)