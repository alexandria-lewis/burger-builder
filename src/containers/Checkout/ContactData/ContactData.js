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
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
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
        const formData = {};
        // I just want to get the name and then the value directly mapped to each other.
        for (let formElementIdentifier in this.state.orderForm) {
            // so this very long form element identifier is simply email, country and so on.
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            // So I simply create key value pairs where I have, where I add a new property to form data, a property like country, like email and so on and I set the value of that property not equal to an object but simply to the value the user entered.
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            order: formData
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

    checkValidity(value, rules) {
        let isValid = false;
        
        // so if that is true-ish then I want to adjust some isValid variable which initially is false as a default maybe, I want to set isValid equal to the value comparison, so isValid should be equal if it's not equal to an empty string, however I want to use value trim here to remove any whitespaces at the beginning or end.
        if (rules.required) {
            isValid = value.trim() !== '';
        }

        // We could add another check here where we say if rules.minLength, if we have something like this, then we can set isValid equal to value.length greater equal rules.minLength. So now minLength of course would be expected to be like a value like one or two or three which also will resolve to true so which will activate this rule.
        if (rules.minLength) {
            isValid = value.length >= rules.minLength;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength;
        }

        return isValid;
    }

    // there I expect to get an event object as it will automatically be passed to me by react if this method is attached to an event listener which it of course is.
    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value); // to see what we're entering, but input doesn't take?
        // But of course, we can see the values in our inputs because what's missing is the other part of two way binding. We're not using this data here when the input changes to update the value of our elements and of course, we have that value key for each input element which we bind to it, so this is currently the key which determines the value which is shown on the screen.

        // So we need to update the value for a given input upon user changes, for that of course we need more information than just the event which gives us access to the event target value, we also receive or need a second argument which is the input identifier so that we can reach out to our state, get the right element here, the right object and adjust its value.

        // So to do that, I'll go to my contact data component and the method I passed to changed, the reference here should be a referenced to an anonymous function so that I can now pass arguments to the inputChangedHandler method call.

        // the problem just is I of course can't access this.state.orderForm identifier and update the value, this is not how we mutate the state. Instead we have to mutate it, well immutably and we do this with set state and for that, what I'll do is I'll first of all create my copy my form data

        const updatedOrderForm = {
            ...this.state.orderForm
        }

        // However this does not create a deep clone, so I copy that object and I distribute all the properties, I get a new object but since these objects, I have more nested objects, these would not be cloned deeply but there, I will again just copy the pointer to them and hence if I change something there, I will still mutate the original state unfortunately because the object in my copied object and the object in the state would still be equal.

        // NEED TO DEEP CLONE for value

        // I'll take the updatedOrderForm which is a clone of the original one and not referring to the original one anymore and there I'll now access my input identifier so this is a value like email, like delivery method. Now I get access to this object which we haven't cloned already so now I need to clone that object and I'll store the new constant updatedFormElement, maybe.
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        // Now I can safely change the value of the updatedFormElement because it is again a clone.

        updatedFormElement.value = event.target.value;
        // In the inputChangedHandler, I can then of course also update my valid value of the updatedFormElement, here I want to set updatedFormElement.valid equal to this.checkValidity and pass the updatedFormElement value which we already adjusted to the value passed by the event, and of course I want to pass my updatedFormElement validation object which is just my rules.
        // So validation here has for example a required property and that is what I check for in checkValidity, I see if my rules object has a required property and if the value of that property is true-ish or is treated as true.

        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        console.log(updatedFormElement); // on keypress validity is checked!!

        // So I will reach out to updatedFormElement value and set this equal to event target value and now, I can take my updatedOrderForm, so this which is my clone original form and there, I can now again access the input identifier and set it equal to the updatedFormElement. Now with this, I can call this.setState and set order form to updated order form.
        this.setState({orderForm: updatedOrderForm});
        // Now we successfully set this up in a very generic way which is great.
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
            <form onSubmit={this.orderHandler}>
                {/* dummy data */}
                {/* <Input elementType="..." elementConfig="..." value="..." /> */}

                {/* I can work with it by now creating my form here while looping through all these elements. So I will add curly braces here in the form and now I want to loop through my form elements array with the map method of course to generate a new array basically, here this will get the individual form element and it just returns some jsx here, the jsx it returns of course, it should be my custom input component. */}

                {/* So in the end what I pass on here is form element, config and then there as I just said, the element type. So just the name we have here, element type, we pass element config and value in the same way, so here we passed the element type, now the element config is passed as I just said in the same way with form element config, element config and the value also is passed like this element, excuse me, form element, form element config element config. */}
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType='Success'>ORDER</Button>
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