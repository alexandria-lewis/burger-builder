import React from 'react';

import classes from './Button.css';

const button = (props) => (
    <button
        disabled={props.disabled}
        // we need to expect a disabled prop and pass it on to the native button disabled attribute.

        // Now in the class name here, we have to pass the string in the end, keep that in mind. So I'll add an array because I always want to assign the button class but then conditionally, I'll add the success or danger class,

        // right now it's an array of strings though. So let's change this by joining this with a whitespace to have a list of classes which is a string in the end.
        className={[classes.Button, classes[props.btnType]].join(' ')}
        // I will dynamically pull out a certain type with props button type for example, button type is a prop I have to set through outside and button type will have to be either Danger with a capital D or a Success with a capital S.
        onClick={props.clicked}>{props.children}</button>
);

export default button;