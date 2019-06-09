import React from 'react';

import classes from './Spinner.css';

const spinner = () => (
    // https://projects.lukehaas.me/css-loaders/
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;