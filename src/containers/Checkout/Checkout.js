import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
// import { throwStatement } from '@babel/types';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    // Now to fix this (ingredients error cannot initialize null in DidMount), what we can do is we can simply change componentDidMount to WillMount before we render the child component, we already have access to the props there so we can already get the queryParams there. and we do this at the point of time where we don't render children so we can set up the state prior to render children.
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        // I used the URLSearchParams constructor, pass this.props.location.search which includes the ? and so on but with URL search purpose, I can basically extract that.
        const ingredients = {};// an object to set to state.ingredients
        let price = 0;
        for (let param of query.entries()){
            // ['salad', '1'] format

            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1]; // converting to a number with +
            }
            // Now here I'm looping for all the ingredients and then I'm pushing down onto my ingredients array, the total prize of course is no ingredient so I shouldn't push it onto this array. So instead I'll have to check if param[0] is equal to price and this of course is only kind of a work around we'll find a better way of handling this state and passing it to this other container later in this course, no worries.
        }
        this.setState({ingredients: ingredients, totalPrice: price});
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
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
                {/* To pass props using RENDER property which takes a method as you learned where you then output some jsx on the right side of the arrow and there I actually want to render the contactData element */}

                {/* Now I will use the props I get in this render method and I will simply distribute them here after passing my own props with curly braces props. Whatever I get in the props here will be passed on to a contact data and therefore since this will include the history object, this push method here should work. */}

                {/* use route here below my checkOutSummary to load something for a path which should now depend on the path we're currently on +/ContactData. So I'll use this props and then we can use match url (this.props.match.url) or also for building paths and routes you might use path +/ contact data and this should also be part of the dynamic path here, the string. */}
            </div>
        );
    }
}

export default Checkout;