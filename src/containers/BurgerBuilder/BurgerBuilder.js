import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

// you typically name constants you want to use as global constants in all capital characters.
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    // So still in the burger builder component, I want to set up the state dynamically and you learned that a good place for fetching data is componentDidMount

    componentDidMount () {
        console.log(this.props);
        axios.get('https://react-my-burger-2153f.firebaseio.com/ingredients.json')
        // DONT forget .json for firebase
        .then(response => {
            // So now the goal is to set our state, here ingredients to that object,
            this.setState({ingredients: response.data})
        })
        // Now with that if we save this and we reload the application, we get that error modal but then we get another error that we fail to set our state. The reason for this is that the then block gets executed in our burger builder even though we have an error. Now the reason for that simply is that we're not having a catch method here in componentDidMount of the burger builder.
        .catch(error => {
            // we probably would want to handle that specific error case here for this specific page by for example also setting the UI here. So there, we could also set some error state, so now in the burger builder which is null initially or false maybe and then inside here if we get an error, if we catch this, then we call set state and set error to true.
            this.setState({error: true});
            // Now with that we can go down to the render method and we want to output an error message for this case where our application becomes unusable.
        });
    }

    // you see we get an error because now when we try to loop through our ingredients at the start of the app, that of course fails because initially ingredients is now null, we're only fetching it at the start and that's a typical use case in applications, you fetch data when it loads, so parts of the UI which depend on the data will therefore fail.

    // Now this of course can easily be prevented by checking if we have ingredients before rendering anything which depends on ingredients, like the burger here.

    updatePurchaseState (ingredients) {
        // We should call it after running addIngredientHandler or removeIngredientHandler, so there I'll then also execute this update purchase state, the same on the end of the removeIngredientHandler.

        // USING INGREDIENTS passed in instead of a copy from the state to make sure we have the most current data
        // const ingredients = {
        //     ...this.state.ingredients
        // };


        //create some constant where I take my javascript object object and there I use keys again and pass my ingredients to it and this will again create an array of string entries, salad, bacon, cheese and so on.
        const sum = Object.keys(ingredients)
        // Now I said that I need these values here though so the amounts of the ingredients, not the names.

        // Well we can simply map this array into the array we need. The map method of course still receives the key and then this is used in or the function we passed to the map method receives the key here should say and then we can use this to return new value and replace the old value which was the property name, salad and so on with that new value.
            .map(igKey => {
                // And here I simply wanted to return ingredients and there the value for a given key and this will be the amount because with ingredients and this notation, I'm accessing a certain property in the ingredients object, igKey is salad, bacon and so on so I'm basically getting these values, the numbers and that is what I return for each key.
                return ingredients[igKey]
            })
            // So now I have an array of values, now all I need to do is call reduce to again reduce this array but this time not to flatten the array but to turn it into a single number, the sum of all ingredients.
            .reduce((sum, el) => {
                // For that, we'll have a starting number of 0 [, 0)] and then we have a function which is executed on each element in this mapped array.

                // In this function, I get new sum and the individual element and keep in mind, sum simply is the constantly updated current sum up until the current iteration where this function is executed and once this function was executed on all array elements, sum is the final result.
                return sum + el;
            }, 0);
            // With that, I get a sum constant which is zero if we have no ingredients added or any other number representing the total amount of ingredients, and with that I can simply call set state and set purchasable too and now it depends on whoever has sum is greater than zero or not, so we'll set it to sum greater 0.
            this.setState({purchasable: sum > 0});
            // This is either true or false and it is true if we have at least one ingredient, then purchasable is true and that is exactly the behavior I want.
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        // I will create a new constant, updatedIngredients because as you learned, state should be updated in an immutable way. So i will create a new javascript object and use that ES6 spread operator, these three dots to distribute the properties of the old ingredients state into the new object I'm creating here.
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        // Now I want to update the total price with the price for the type we added.
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        // Now due to the way set state works, when we execute update purchase state, we might not get the updated ingredients and therefore, once we copy the ingredients and analyze them, we might simply get an outdated version.
        // Now we can of course simply fix this by passing the updated ingredients we have in add and remove ingredient handler anyways to the update purchase state method and expect to get ingredients there (i.e. put into the function's parenthesis), so ingredients.
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return; // nothing will happen if we try to reduce an ingredient we don't have
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    // purchaseHandler () {
    //     this.setState({purchasing: true});
    // }
    // TypeError: Cannot read property 'setState' of undefined

    // I'm executing this set state here, exactly the same I use in other methods too, why could this fail? It fails because of the way I'm creating this method, I use the same method syntax as I use for render but you maybe remember that earlier in the course, I mentioned that this syntax will not work correctly, at least if we try to use the this keyword in there if the method is triggered through an event due to the way the this keyword works in Javascript, it will then not refer to the class. This is not the case for remove and addIngredientHandler because I use a slightly different syntax there, I set up these methods as properties where I assigned arrow functions. In the end these are still methods but internally, they take advantage of arrow functions which basically contain the state or the context of this. So we can easily fix this by setting purchaseHandler equal to an arrow function too and use that syntax for creating the method.

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Alex L',
        //         address: {
        //             street: 'test road',
        //             zipCode: '12345',
        //             country: 'USA'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //     });

        // I will comment all this code out because I no longer want to store it on firebase immediately here I went to go to the checkout component instead.
    }

    render () {
        // immutable copy of state.ingredients object
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
            // this is an ES6 if statement expression
            // object format: {salad: t/f, meat: t/f, cheese: t/f, bacon: t/f}
        }

        let orderSummary = null;
        // the order summary will also use the ingredients and therefore fail. So here, we should simply also add something and set order summary to null by default and then add the same check or actually we already have that check of course, where we overwrite that order summary variable with the order summary if ingredients are set, so let's add this after this burger code here maybe.

        // Here we set burger to spinner, now we actually don't want to show the spinner but our the application is not usable at all error message if we have the error equal to true.
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        // So here we could check if this state error, if that is true, then we actually want to show a paragraph where we say ingredients can't be loaded, this is our worst case scenario otherwise we're showing the spinner or we're overwriting it with the ingredients if we got them.

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        disabled={disabledInfo}
                        // take advantage of this disabled property in this build controls component and there we should pass this information to the individual build control, to let it know if it should disable that button or not.
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}// this method gets executed when we click the order now button
                         />
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }

        // I also want to make sure that we overwrite this again if loading was set, so after this if statement where we check for ingredients, I'll add this old if statement where we check for the loading state to overwrite order summary when needed.
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                        {/* I can identify one element here though where we might be able to save some performance by not re-rendering it unnecessarily and that is the modal component. It wraps the order summary and that of course means that whenever ingredients or the price changes, since these are props of order summary, order summary will be re-rendered. However if the modal is not visible, we don't need to do that. So actually only if the modal is shown, re-rendering of that wrapped element here makes sense. */}
                </Modal>
                {/* If we just add or remove the modal from or to the dom, we won't see an animation though, we need to switch some css property to show or hide it, to be able to animate that. 
                - Only if purchasing is true the modal should be visible.
                - In Modal.js change the modal depending on the show property */}

                {/* The goal was to show the order summary and this burger builder file is already getting quite crowded so I don't want to add the logic to transform this array into a nicely structured summary into this file, I will outsource it into its own component as this is generally a good practice in react, have granular focused components. */}

                {/* moved ingredient dependent components (Burger and BuildControls) into variable for content checking */}
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
// So here I simply have to pass axios which we are importing here and which is our axios instance.