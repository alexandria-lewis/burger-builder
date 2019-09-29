import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders()
    }

    render () {
        let orders = <Spinner />;
        if(!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ) )
        }
        /* if this is not true, so if we are not loading, I'll render this instead, this map. So then orders should be this jsx code here and since it's not wrapped in any html element, we can just write it like this. */
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));

// I of course also want to handle any potential errors so I'll import my own higher order component, withErrorHandler from and now we have to move up to that HOC folder, withErrorHandler/withErrorHandler and wrap our orders component with it, withErrorHandler just like that, wrapped like this. Of course, let's also pass axios here, otherwise this won't work and now let's try it out by removing this json ending here, let's go back and we get the network error here. So we got this error so this works, the error handler. Of course you can fine tune it in the local catch method here to show an error message on the screen or whatever you want.