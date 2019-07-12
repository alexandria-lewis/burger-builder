import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { throwStatement } from '@babel/types';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    checkoutCancelledHandler = () => { // using fat arrow to inherit the THIS keyword
        // Now since I'm in the checkout container which was loaded with the route component, we here also have access to this props and there too, the history prop, and the history prop also has a go back method which I want to execute upon cancelling.
        this.props.history.goBack();
    }

    // This simply goes back to the last page, in the other case here where I want to continue, I'll use replace instead to replace the current route with checkout/contactData

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    
    render(){
        return (
            <div>
                {/* Keep in mind, checkout summary expects to get ingredients as a prop, so I should pass ingredients here
                we will have to use routing to really pass ingredients */}
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
            </div>
        );
    }
}

export default Checkout;