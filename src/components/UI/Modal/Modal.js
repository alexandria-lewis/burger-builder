import React from 'react';

import classes from './Modal.css';

const modal = (props) => (
    <div 
        className={classes.Modal}
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            // I'll use ternary expression here, if it is true then, the then condition comes after the question mark, I'll set transform to translateY(0) which is the position I defined in css, so the position it should really have. If show is not true though, I'll set translateY to minus 100vh, vh is a special unit which refers to the viewport height, so it will simply slide it outside of the screen.
            opacity: props.show ? '1' : '0'
        }}>
        {props.children}
    </div>
);

export default modal;