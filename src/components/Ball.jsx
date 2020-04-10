import React from 'react';
import { Point } from './Point';

export class Ball extends React.Component {
    shouldComponentUpdate (nextProps) {
        return this.props.x !== nextProps.x && this.props.y !== nextProps.y;
    }

    render () {
        return (
            <Point filled positioned {...this.props} />
        );
    }
}