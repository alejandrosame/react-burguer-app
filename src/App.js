import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layout from './hoc/Layout/Layout';
import Orders from './containers/Orders/Orders'

import './App.css';


function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurguerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
