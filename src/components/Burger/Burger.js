import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // mod 156
    // keys method which extracts the keys of a given object and turns that into an array, so it gives you an array of the keys.
    // but in the end, it's just a way to transform an object of key value pairs into an array of burger ingredients where the value of that object is important for me to decide how many ingredients I need and the keys important for which type of ingredient I need.
    console.log('props.ingredients: '+props.ingredients);
    console.log('Object.keys: '+Object.keys(props.ingredients) );
    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            console.log('Object.keys().map(igKey): '+igKey);
            // map executes a function on each element in the input array. So I'll give this argument we receive in the function the name igKey for ingredient key because that's just what's part of the array, salad and so on.
            // I want to transform this string value into an array with as many elements as we have ingredients for a given ingredient.
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                // I don't care about the element itself so that is why I will use the underscore as an argument name to indicate that it's a blank but the index of that element is important to me. So now here, inside that map method, I will return my burger ingredient because I need to return an array of jsx in the end where I will set the key.
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        });
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {/* will always have a bread-top and bread-botom, so those can be hard coded :) */}
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;