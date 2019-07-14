import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render () {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={classes.Input} type='text' name='name' placeholder='your name' />
                    <input className={classes.Input} type='email' name='email' placeholer='your email' />
                    <input className={classes.Input} type='text' name='street' placeholer='street address' />
                    <input className={classes.Input} type='text' name='postal' placeholer='street postal code' />
                    <Button btnType='Success'>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;