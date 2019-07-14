import React, { Component } from 'react';

import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    // these are the default html attribute names and that is of course important that you use them inside elementConfig, the default names.
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: ''
            }
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
            price: this.props.price
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

        // I now need to first of all turn my order form object here into some kind of array I can loop through, an array where we basically have javascript objects where this key is just one property an identifier property and then we also still have the other properties.

        const formElementsArray = [];

        // the key therefore are of course the property names of that object. So the keys are going to be name, street, zipcode and so on
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                {/* dummy data */}
                {/* <Input elementType="..." elementConfig="..." value="..." /> */}

                {/* I can work with it by now creating my form here while looping through all these elements. So I will add curly braces here in the form and now I want to loop through my form elements array with the map method of course to generate a new array basically, here this will get the individual form element and it just returns some jsx here, the jsx it returns of course, it should be my custom input component. */}

                {/* So in the end what I pass on here is form element, config and then there as I just said, the element type. So just the name we have here, element type, we pass element config and value in the same way, so here we passed the element type, now the element config is passed as I just said in the same way with form element config, element config and the value also is passed like this element, excuse me, form element, form element config element config. */}
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} />
                ))}
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