import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render(){
    let summary = <Redirect to="/" />;

    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </div>
      );
    }
    return (
      <div>
        {summary}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burguerBuilder.ingredients,
    totalPrice: state.burguerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
