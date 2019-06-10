import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import { throwStatement } from '@babel/types';

// I am using this syntax withErrorHandler because I want to use this second way of creating a higher order component which will be used here on the export and not used as JSX code.

// Now obviously we only want to show this if we got an error, so we need to set show to something else and that something else needs to come from the wrapped component, we need that information if it did fail. To get that information, we should add a second argument to our higher order function here, the axios instance which was used so that we can set up an error handler, a global error handler on it.

const withErrorHandler = (WrappedComponent, axios) => {
    // Now to use that instance here, I will change this functional component into a class-based one because I want to add the componentDidMount lifecycle hook to set up the axios interceptors. Now theoretically of course, you could keep this as a functional component and use the useEffect hook here to do the same, that would be OK as well
    // As you can see it's an anonymous class, I don't set up a name here because I never use that class, I return it here, it's a class factory essentially, withErrorHandler creates these classes.
    return class extends Component {
        state = {
            error: null
        }

        // and now with this, we can add componentDidMount here and in componentDidMount, we can now set up our axios listener,
        componentDidMount() {
            axios.interceptors.request.use(req => {
                // I'll call use and I'm not really interested in the request but there's one thing I want to do in there, I want to call this set state and clear any errors, so that whenever I send a request, I don't have my error set up anymore, so that I definitely clear it here.
                this.setState({error: null});

                // we of course have to return something, when sending the request, we have to return the request config so that the request can continue
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                // for the response, I also want to implement a response handler here where I simply return the response, this is the shortest possible syntax for doing that.
                // So this function here will get the response and then do something with it. The second argument is the one I'm interested in, that's the error case where I get an error.
                // I will then set or call this set state and set error to the error I'm getting here back from Firebase and this happens to be an object which also contains an error message, on the message property you can simply console log that error to see how this object looks like.
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                        {/* this state error message which I'm outputting here will throw an error initially because the modal component is always present even if we don't show it there. */}
                        {/* So what I'll do is I'll simply add a ternary expression where I'll say this state error? Only if this is null, then I'll output that otherwise I'll output null, so output nothing. */}
                    </Modal>
                    {/* return the wrapped component and distribute any props this component might receive on it because I don't know these props but I definitely don't want to lose them */}
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;

// now let's mess something up and let's see if it also works. In the burger builder container where we sent the request, if we now change that URL and maybe remove the .json which I said is a valid or an important part of the API endpoint for the Firebase database we're sending the request to here. So if we remove that, it should fail, so now if we try to store a burger, we indeed get a network error message here.