import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

// turn modal into a class so that we can implement shouldComponentUpdate.

// Alternatively of course, you could keep this as a functional component and wrap the exported component, so the modal constant you're exporting with React.memo. This would be an alternative to using shouldComponentUpdate, both works and both will effectively have the same impact and effect here.

class Modal extends Component {
    // So now the modal is working again and let's now see if we can control the updating of order summary which is wrapped by the modal by changing the way the modal itself updates.

    shouldComponentUpdate(nextProps, nextState) {
        // so now I want to check or now I might want to make sure that this only updates if show changes because that's the only thing which matters for me here.
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
        // Consider our modal code we use shouldComponentUpdate here and we basically only update the component if the show state changed. Here however, the children of the component simply change to props. children.changed, we're passing a new child, we're passing the spinner instead of the order summary, that doesn't trigger an update here. So we simply have to finetune our shouldComponentUpdate method in the modal component and we have to check if nextProps.children is actually different to thisProps.children so that it does update if it gets new children.
    }

    componentWillUpdate() {
        console.log('[Modal] WillUpdate');
    }

    // So here, we definitely improved our application because we make sure that we don't unnecessarily update order summary, that we don't unnecessarily re-render that and you also see that the wrapping element controls the updating of the wrapped element. So order summary theoretically, the component, is included in the burger builder but it is not updated because the wrapping element modal has a shouldComponentUpdate method where we control this.

    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />    
                {/* So what we now need to do is we have to add this modal closed property to modal because we just added it in there as a reference of the method we want to execute once the backdrop fires clicked, just to reassure that it is clear when this happens, which happens when onClick is fired on the div which makes up the backdrop. */}
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        // I'll use ternary expression here, if it is true then, the then condition comes after the question mark, I'll set transform to translateY(0) which is the position I defined in css, so the position it should really have. If show is not true though, I'll set translateY to minus 100vh, vh is a special unit which refers to the viewport height, so it will simply slide it outside of the screen.
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
};

export default Modal;