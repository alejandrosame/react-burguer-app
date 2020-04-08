import React from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Burguer from '../../components/Burguer/Burguer'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurguerBuilder extends React.Component {

  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount(){
    axios.get('ingredients.json')
      .then( response => {
        this.setState({ ingredients: response.data })
      })
      .catch(error => this.setState({error: true}));
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(
      ingredientKey => {
        return ingredients[ingredientKey];
      }
    ).reduce( (sum, el) => {
      return sum + el;
    }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burguer = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (this.props.ingredients){
      burguer = (
        <Aux>
          <Burguer ingredients={this.props.ingredients}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}
            price={this.props.totalPrice}
          />
        </Aux>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.totalPrice}
      />;
    }

    if (this.state.loading){
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burguer}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingredientName
    }),
    onIngredientRemoved: (ingredientName) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingredientName
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurguerBuilder, axios
));
