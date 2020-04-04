import axios from '../../axios-orders';
import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Burguer from '../../components/Burguer/Burguer'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7
}

class BurguerBuilder extends React.Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
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

    this.setState({ purchasable: sum > 0 })
  }

  addIngredientHandler = ( type ) => {
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = this.state.ingredients[type] + 1;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
    });

    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = ( type ) => {
    if (this.state.ingredients[type] <= 0){
      return;
    }

    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = this.state.ingredients[type] - 1;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]
    });

    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true});

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Max Schwarzmüller',
        address: {
          address: 'Teststreet 1',
          zipcode: '23423',
          country: 'Germany'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => this.setState({loading: false, purchasing: false}))
      .catch(error => this.setState({loading: false, purchasing: false}));
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burguer = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (this.state.ingredients){
      burguer = (
        <Aux>
          <Burguer ingredients={this.state.ingredients}/>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </Aux>
      );

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
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

export default withErrorHandler(BurguerBuilder, axios);
