import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {/* we don't have to set active equal to true [ active={true} ], though we could do that but for boolean props, we can just pass it like this. */}
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;