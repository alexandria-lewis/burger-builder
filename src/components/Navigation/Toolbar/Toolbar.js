import React from 'react';

import classes from './Toolbar.css';
// keep in mind, this import in the end simply imports a couple of strings, the dynamically created css class names which we simply adjusted to be scoped to this component and then, we're assigning the class name which was generated here.
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;