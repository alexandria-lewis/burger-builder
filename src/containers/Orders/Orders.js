import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    // I obviously want to fetch all my orders. Now to do that I will implement componentDidMount. I can use componentDidMount here because I only want to fetch orders when this is loaded, there is no way we will go there with out remounting it So componentDidUpdate is not what I'm looking for, so componentDidMount is what I need.
    componentDidMount() {
        // here and then here I want to reach out to axios.get, get orders.json referring to that orders node on my backend and we set this as the baseURL on our own axios instance so I don't have to add this.

        // I'll not push this object, I'll instead push a new object onto this fetchedOrders array where I will distribute the properties off the Order object I've fetched from firebase with the spread operator and add one new property ID which is the key because remember the key is in this object we've fetched from firebase where the ID's created by firebase.

        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetchedOrders});
        })
        .catch(err => {
            this.setState({loading: false});
        });
    }
    render () {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);

// I of course also want to handle any potential errors so I'll import my own higher order component, withErrorHandler from and now we have to move up to that HOC folder, withErrorHandler/withErrorHandler and wrap our orders component with it, withErrorHandler just like that, wrapped like this. Of course, let's also pass axios here, otherwise this won't work and now let's try it out by removing this json ending here, let's go back and we get the network error here. So we got this error so this works, the error handler. Of course you can fine tune it in the local catch method here to show an error message on the screen or whatever you want.