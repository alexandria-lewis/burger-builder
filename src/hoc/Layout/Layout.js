import React, { Component } from 'react';

import Aux from '../Aux/Aux';
/*
using Aux to wrap the output into a JSON object
created the hoc folder for this
*/
import classes from './Layout.css';
//classes can be any word, just used to assign obj params
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// So in my opinion, it makes more sense to turn the layout component into a class component where we can implement the method so that we can listen to both the sideDrawer closing itself by clicking on the backdrop as well as toolbar opening the sideDrawer by clicking on that toggle button.

// class based components use capitols
class Layout extends Component{
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggle = () => {
        // Now it actually will work as a toggle so from open to close and the other way around but in our app, we will never be able to see that close functionality because the sideDrawer will overlap it I'm still going to create it in this way because if we ever were to add this toggle in some other place in the app, it would really work as a toggle.

        // this.setState({showSideDrawer: !this.state.showSideDrawer});
        // I mentioned earlier that if you plan on using the state, insert state, you shouldn't do it like this because due to the asynchronous nature of set state, this may lead to unexpected outcomes. So instead use the function form, expect the previous state as input and in there, simply return the object you want to set as a new state or you want to merge into the state I should say.

        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
        // This is the clean way of setting the state when it depends on the old state.
    }

    render () {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggle} />
                {/* and as always, never execute this method [ this.sideDrawerToggle() ] just pass a reference. */}
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