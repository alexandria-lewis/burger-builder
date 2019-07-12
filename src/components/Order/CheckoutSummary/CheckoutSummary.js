import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';
// Now with that, I have to import these CSS code or the classes object to be precise from CheckoutSummary.css and then assign it here, so here I'll add classes checkout summary, taking advantage of CSS modules here.

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes great!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                {/* This div is required to set the boundaries of the burger component and of course I'm going to reuse my burger component which I already have */}
                <Burger ingredients={props.ingredients} />
                {/* - I assume that for now I can simply just set the ingredients property of my burger component which it does expect, if we have a look at the burger component, we have 
                { props.ingredients } in there which we use, so I should also pass this to this component
                - So we expect ingredients in the burger, so we should pass it and for now I'll just expect that in the checkout summary component I'll also get an ingredients property which I then just pass on */}
            </div>
            {/* these buttons as you probably know support two different styles, we have the success and the danger class here which we can pass and we do pass it with the button type property. (in button.js classes[props.btnType] ) */}
            <Button 
                btnType="Danger"
                // clicked={}
                >CANCEL</Button>
            <Button 
                btnType="Success"
                // clicked={}
                >CONTINUE</Button>
            {/* So these are the two buttons, you also know that the buttons expose the click property which simply indicates that we clicked on the button. So that is something I'll also need to do */}
        </div>
    )
}

export default checkoutSummary;