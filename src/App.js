import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  // let's go back to app.js and to make sure that burger builder disappears after a while, I'll temporarily add a state to my app component, it is a class-based component so I can of course do this and I will simply add a show property which is true initially and I will then use it here with this state show to show the burger builder or show null which essentially removes the burger builder of course because it's only added to the DOM if show is true.
  // state = {
  //   show: true
  // };

  // So now I just need a way to unset show after a while and for that and again this is all just for testing, I'll add componentDidMount here and there I will simply use the normal set timeout method provided by Javascript and after 5 seconds, I want to execute this function here and in that function, I'll call set state and set show to false and again I will remove this code in a second, it's only there to test if this works, if it does call will unmount.
  // componentDidMount(){
  //   setTimeout(() => {
  //     this.setState({show: false});
  //   }, 5000);
  // }

  // wait five seconds and we should then see will unmount and we see zero zero and that's actually correct because these are simply the IDs. There are IDs being kept the memory by axios for both the request and response interceptors, so two different lists of interceptors and they start with index zero. We added one to each list, one request and one response interceptor, so that is why we see two zeros here.

  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
          {/* {this.state.show ? <BurgerBuilder /> : null} */}
        </Layout>
      </div>
    );
  }
}

export default App;
