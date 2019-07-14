import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        {/* So we can simply use the caption with props.children so that we actually wrap the text we want to display with our own component and we can then set the link here ref dynamically by pulling that from let's say props.link, something like that. */}
        <NavLink 
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}> {props.children}</NavLink>
            {/* We can easily fix that (the default active class is not the same as mine when CSS modules adds a hash to my active class) though, that nav link element has one extra property we can set up, we can set our own active class name as you learned. You can add active class name here, and here I then want to use classes, active again referring to my classes object which comes from my css file, this will now be the active class name as our css modules transformation spits it out. */}

            {/* This of course is also active (on orders both active because of '/' at start of '/orders') due to the way this nav link interprets the active route. Keep in mind that the to path here is what determines whether this is the active route or not and it's treated as a prefix as learned. So as long as our current paths starts with this path here, this link is treated to be active. And for just slash every route starts with that. So we can simply fix this by adding the exact route here and with that we make sure that this only gets used if it is exact.
        
            Now of course will attach exact to all nav links, If you only knew that somewhere this should happen, you could simply pass the exact property, a new property i just defined to navigation item and in navigation item, you can now bind the exact prop of nav link to props exact, so to the one you're passing in from outside. Now this will actually only be used on the first link with just slash and not on the second with orders.*/}
    </li>
);

export default navigationItem;