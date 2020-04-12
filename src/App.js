import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import Auth from './containers/Auth/Auth';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import Orders from './containers/Orders/Orders'

import * as actions from './store/actions';

import './App.css';


class App extends React.Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurguerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurguerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
