import React from 'react';
import { withRouter } from 'react-router-dom';
// There is a way we could still get the props in the burger component too though and this really is a bit advanced and not something we need here but I want to show it nonetheless.

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log(props);
    // mod 156
    // keys method which extracts the keys of a given object and turns that into an array, so it gives you an array of the keys.
    // but in the end, it's just a way to transform an object of key value pairs into an array of burger ingredients where the value of that object is important for me to decide how many ingredients I need and the keys important for which type of ingredient I need.

    // console.log('Object.keys: '+Object.keys(props.ingredients) );

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            
            // console.log('Object.keys().map(igKey): '+igKey);

            // map executes a function on each element in the input array. So I'll give this argument we receive in the function the name igKey for ingredient key because that's just what's part of the array, salad and so on.

            // I want to transform this string value into an array with as many elements as we have ingredients for a given ingredient.
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                // I don't care about the element itself so that is why I will use the underscore as an argument name to indicate that it's a blank but the index of that element is important to me. So now here, inside that map method, I will return my burger ingredient because I need to return an array of jsx in the end where I will set the key.
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        // flatten this array to make sure we pull out the values of these inner arrays and trade one array only which contains all these values, we can do that by adding reduce to our transformedIngredients logic here, reduce is a built-in array function which allows us to transform an array into something else.

        // It takes a function as an input and this function receives two arguments passed in automatically by javascript, the previous value and the current value.

        // The reduce method does not only accept these callback here which is executed on every element in this array we return here, it also accepts an initial value, let's say an empty array.
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

        // console.log(transformedIngredients);

        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredients!</p>
        }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {/* will always have a bread-top and bread-botom, so those can be hard coded :) */}
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default withRouter(burger);
// The higher order component is named withRouter and if we wrap our export with it, so like this with router burger here, if I now save this now you see that in the router we also have match location and history and match will refer to the nearest match. So to the nearest route which was matched in the past, in this case the route which matched the burger builder.

// If you ever need direct access to match history and location and you don't want to manually pass it on from the top level component, you can use withRouter.