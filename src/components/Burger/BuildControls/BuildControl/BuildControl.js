import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            className={classes.Less} 
            onClick={props.removed} 
            disabled={props.disabled} // disabled is a default property we can set on a html button element and of course I want to set it equal to props.disabled
            >Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
    </div>
);

export default buildControl;