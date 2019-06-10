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

        // REMOVED JSON ext from ingredients firebase path in BurgerBuilder for error testing!!!

        // Now the cool thing is we're showing the spinner but if we now are removing the JSON end here of our URL where we're getting the ingredients, just as an example, if we're removing that and we go back, we don't get the error mode.

        // We're setting up our interceptors in the componentDidMount hook and it worked great for the post request but think about that lifecycle diagram, there you see componentDidMount is actually called after all child components have been rendered, which means after componentDidMount was completed in the child components. 
        
        // Now think about our withErrorHandler, here we're wrapping this wrapped component which is our burger builder container for example because there we are using withErrorHandler on the export, so we're essentially wrapping the burger builder and that of course has one implication, componentDidMount in the withErrorHandler will only be called once componentDidMount was called here and since we reach out to the web in componentDidMount of the wrapped component, we never set up our interceptors.

        // I'll use componentWillMount. However in the future, this React lifecycle hook or lifecycle method will not be supported anymore and therefore you can also just use the constructor because the general idea here is that we execute this code when this component here gets created and with that, I mean that component object and of course the constructor also runs when this gets created, so therefore using the constructor instead of componentWillMount will work in exactly the same way.

        // componentDidMount() {
        componentWillMount() {
            // This will be called before the child components are rendered and we're not causing side effects here, we're just registering the interceptors and we want to do that before the child components are rendered.

            // Now to be able to remove an interceptor here, we need to store a reference to the interceptors we create in properties of this class.
            // So for that, I will simply create a new property on the fly by using this, the this keyword to refer to the class and then any name of your choice,
            // So now I have two new properties in my class and I can now use these properties in will unmount to remove the interceptors.
            this.reqInterceptor = axios.interceptors.request.use(req => {
                // I'll call use and I'm not really interested in the request but there's one thing I want to do in there, I want to call this set state and clear any errors, so that whenever I send a request, I don't have my error set up anymore, so that I definitely clear it here.
                this.setState({error: null});

                // we of course have to return something, when sending the request, we have to return the request config so that the request can continue
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                // for the response, I also want to implement a response handler here where I simply return the response, this is the shortest possible syntax for doing that.
                // So this function here will get the response and then do something with it. The second argument is the one I'm interested in, that's the error case where I get an error.
                // I will then set or call this set state and set error to the error I'm getting here back from Firebase and this happens to be an object which also contains an error message, on the message property you can simply console log that error to see how this object looks like.
                this.setState({error: error});
            });
        }

        // Now as the name suggests, this is a lifecycle method which is executed at the point of time a component isn't required anymore.
        // Alternatively if you're using a functional component here and you're not returning this class-based component, so if you're effectively using the useEffect hook thus far, then you would write this code in the return function of useEffect since this function runs whenever the cleanup is done for this component.
        componentWillUnmount () {
            // console.log('[withErrorHandler] Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
            // And now with that, we got this set up in componentWillUnmount and we should remove our interceptors with that preventing memory leaks.
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

// ------------------------------------
// The problem we have is if we add this higher order component, withErrorHandler to other components, we'll call componentWillMount again and again of course because the class component we return it is higher order component is created every time this is wrapped around an existing component, so every time we call withErrorHandler on the element we're exporting as we do in the burger builder.

// So we're actually attaching multiple interceptors in our application and we're attaching them to the same axios instance.

// The problem of course is and we don't have that right now and we will face later in the course, the mentioned routing will lead to the problem, once we have more pages where we might use withErrorHandler, we of course create this instance here multiple times, this component here and therefore all the old interceptors, so all the interceptors we set up when we wrapped this around another component which might not be needed anymore still exist.

// So we have a lot of that interceptor sitting in memory which actually are not that but which still react to our requests and in the worst case, they lead to errors or do somehow change the state of our application but even in the best case, they leak memory because that's code that still runs that is not required anymore.

// So we should actually remove the interceptors when this component gets unmounted, so when this specific instance of our withErrorHandler wrapper is not needed anymore and there actually is a lifecycle hook for this too, it's componentWillUnmount.
// ------------------------------------