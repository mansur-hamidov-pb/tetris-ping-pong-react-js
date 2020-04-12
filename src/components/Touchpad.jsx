import React from 'react';

const stylesTouchpad = {
    height: '50px',
    borderRadius: '25px',
    backgroundColor: '#D5C842',
    width: '60%',
    margin: '200px auto',
    border: '6px outset #D5C842',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 7px',
    paddingBottom: '5px'
}

const stylesControl = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '35px'
}

const stylesStartPause = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px'
}

export const Touchpad = () => {
    return (
        <div id="touchbar" style={stylesTouchpad}>
            <div style={stylesControl}>&lt;</div>
            <div style={stylesStartPause}>START / PAUSE</div>
            <div style={stylesControl}>&gt;</div>
        </div>
    )
}