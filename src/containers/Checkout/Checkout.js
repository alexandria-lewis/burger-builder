import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
// import { throwStatement } from '@babel/types';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    // I won't use componentDidUpdate or anything like that because whenever I load this component, it will mount itself, there is no way I can route to it without it being mounted again because it's not nested in some other page or anything like that.
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        // I used the URLSearchParams constructor, pass this.props.location.search which includes the ? and so on but with URL search purpose, I can basically extract that.
        const ingredients = {};// an object to set to state.ingredients
        for (let param of query.entries()){
            // ['salad', '1'] format
            ingredients[param[0]] = +param[1]; // converting to a number with +
        }
        this.setState({ingredients: ingredients});
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
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
                    {/* use route here below my checkOutSummary to load something for a path which should now depend on the path we're currently on +/ContactData. So I'll use this props and then we can use match url (this.props.match.url) or also for building paths and routes you might use path +/ contact data and this should also be part of the dynamic path here, the string. */}
            </div>
        );
    }
}

export default Checkout;