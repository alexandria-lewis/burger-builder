import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
/*
using Aux to wrap the output into a JSON object
created the hoc folder for this
*/
import classes from './Layout.css';
//classes can be any word, just used to assign obj params
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

// So in my opinion, it makes more sense to turn the layout component into a class component where we can implement the method so that we can listen to both the sideDrawer closing itself by clicking on the backdrop as well as toolbar opening the sideDrawer by clicking on that toggle button.

// class based components use capitols
class Layout extends Component{
    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    render () {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    // we need to pass the open property to the sideDrawer to now and that should be this.state.showSideDrawer because this will hold the information whether the sideDrawer should be opened or not.
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                    {/* props can now be accessed with this.props as you learned, that's the case for all class based components. */}
                </main>
            </Aux>
        )
    }
}

export default Layout;