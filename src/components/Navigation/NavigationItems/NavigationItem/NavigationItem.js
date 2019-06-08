import React from 'react';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        {/* So we can simply use the caption with props.children so that we actually wrap the text we want to display with our own component and we can then set the link here ref dynamically by pulling that from let's say props.link, something like that. */}
        <a href={props.link} 
            className={props.active ? classes.active : null}>
            {props.children}
        </a>
    </li>
);

export default navigationItem;