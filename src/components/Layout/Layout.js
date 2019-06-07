import React from 'react';

import Aux from '../../hoc/Aux';
/*
using Aux to wrap the output into a JSON object
created the hoc folder for this
*/
import classes from './Layout.css';
//classes can be any word, just used to assign obj params

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;