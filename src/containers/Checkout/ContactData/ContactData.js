import React, { Component } from 'react';

import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // well unfortunately this just reloaded the page because we're inside a form, that is something which is the default behavior actually but here, I should handle the event object in orderHandler and add event.PreventDefault to prevent the default which is to send a request which I don't want. I don't want to send a request because while this reloads my form

        // console.log(this.props.ingredients);

        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Alex L',
                address: {
                    street: 'test road',
                    zipCode: '12345',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render () {
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='your name' />
                <input className={classes.Input} type='email' name='email' placeholder='your email' />
                <input className={classes.Input} type='text' name='street' placeholder='street address' />
                <input className={classes.Input} type='text' name='postal' placeholder='street postal code' />
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
                {/* And then here on this button as in all buttons using our own button component, we can use our clicked property and pass the method which should get executed on a click as a reference. */}
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;