import React from 'react';

import classes from './Input.css';

const input = (props) => {
    // we should actually turn this function here which just returns jsx into a function which has a real function body where we also return jsx of course, but where we also have some check before we do so, where we check what our input really is.

    // So this is a more generic approach we can set up and you can reach any amount of complexity here because now of course, you also have different attributes per element you might have so if you also have the case text area, a text area doesn't take the same inputs or the same attributes as a normal input element does.
    let inputElement = null;
    switch (props.elementType) {
        case('input'):
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value} />;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value} />;
            break;
        default:
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value} />;
    }
    // So this is some complexity we'll have to handle either by creating multiple custom components for the different input types you might have so that we basically have a wrapper component for normal inputs, for text areas, whatever or by simply adding such a switch statement here.

    // And now to handle the case that we also have different attributes, I expect to get the attributes you want to set on input as props for our input wrapper. This then allows me to simply distribute them on the input element, so any default html attributes you want to set on your input, you only need to set the inputType prop and then you pass the normal attributes you would pass to that type,

    // I don't have to worry about which exact type we have. I rely on you using the wrapper correctly and passing the correct normal html attributes, this is a way of reducing the complexity here so that I only have to set the right element and then you take care about the props.

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;