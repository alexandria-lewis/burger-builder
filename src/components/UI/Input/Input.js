import React from 'react';

import classes from './Input.css';
import { join } from 'path';

const input = (props) => {
    // we should actually turn this function here which just returns jsx into a function which has a real function body where we also return jsx of course, but where we also have some check before we do so, where we check what our input really is.

    // So this is a more generic approach we can set up and you can reach any amount of complexity here because now of course, you also have different attributes per element you might have so if you also have the case text area, a text area doesn't take the same inputs or the same attributes as a normal input element does.
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    // also needs to receive the invalid property if the input is invalid and I'll do this with a if check, that check is independent of the type of the input so I only need to do it once at the beginning. I'll check if props.invalid is set to true, if it is then I'll push a new class to my inputClasses, the invalid.css class and of course not like that, classes.Invalid, I need to define that class.
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    // Now to see that effect, I have to go back to the contact data and there, I now need to pass that invalid property to the input I render

    switch (props.elementType) {
        case('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />;
                // and of course I don't want to handle the change in this component, I expect to get a method reference from outside which then takes care about this.
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed} >
                        {/* And by the way, having that value on the select is important to make two way binding work correctly and so on. */}
                        {/* to dynamically create options mapping this into an array of jsx elements */}
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                            {/* We can't change the value for now because we don't have the onChange handler and the key is missing, so that's something we have to add to the option element because we're creating it with the map method. */}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />;
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