import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />    
        {/* So what we now need to do is we have to add this modal closed property to modal because we just added it in there as a reference of the method we want to execute once the backdrop fires clicked, just to reassure that it is clear when this happens, which happens when onClick is fired on the div which makes up the backdrop. */}
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                // I'll use ternary expression here, if it is true then, the then condition comes after the question mark, I'll set transform to translateY(0) which is the position I defined in css, so the position it should really have. If show is not true though, I'll set translateY to minus 100vh, vh is a special unit which refers to the viewport height, so it will simply slide it outside of the screen.
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Aux>
);

export default modal;