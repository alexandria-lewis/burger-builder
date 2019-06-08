import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    // again use object keys to transform this into an array of the keys of salad and so on.
    const ingredientSummary = Object.keys(props.ingredients)
        // We want to map this into an array of jsx elements at the end.
        .map(igKey => {
            return (
                <li key={igKey}>
                    {/* Warning: Each child in a list should have a unique "key" prop.
                
                    here on the list item we have to add a key and that key should be a unique key as you know, now let's simply use the igKey, so salad and so on as a key here and with that, the warning should be gone. */}
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li> );
            // Inline stylings here and simply set this to a javascript object, that is why I have double curly braces, the outer pair is for marking a dynamic entry and the inner curly braces are the javascript object, and there I will set the text-transform css property to capitalize, so simply using some inline styles here.
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
            {/* the component is set up to wrap {props.children} so we can put text in
        
            clicked will be triggered when the button is clicked and of course here we want to execute some method which since we're in the order summary component, we also have to receive here dynamically.
            
            Now the order summary component gets used in the burger builder component or container, so therefore we should pass a property to order summary or two properties actually, one which will pass a reference in the case that we want to continue with the purchase, a reference to a method which then handles this case and a reference to a method which handles the case that we don't want to continue. */}
        </Aux>
    )
};

export default orderSummary;