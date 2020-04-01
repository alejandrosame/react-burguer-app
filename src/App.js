import React from 'react';

import './App.css';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Layout from './hoc/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <BurguerBuilder/>
      </Layout>
    </div>
  );
}

export default App;
