import React from 'react';

import classes from './Order.css';

const order = (props) => {
    // In the burger component here, the transformed ingredients, this actually is the logic we can use to turn our ingredients into an array of ingredients. I want to show you an alternative though.
    const ingredients = [];

    // This is what I can do because in a for/in loop, the variable element is going to be the property name and since my properties are simply just ingredients representations, ingredient name makes sense to me as a name.
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName, 
                amount: props.ingredients[ingredientName]
            }
        );
    }
    // So this is the object I'm now pushing onto this ingredients array, very simple transformation, certainly a bit shorter than the other one so that's why I also wanted to show this alternative.

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name} {ig.amount}</span>
    });
    // Now regarding the key, I actually can use the ingredient name as the key as it is unique here

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;