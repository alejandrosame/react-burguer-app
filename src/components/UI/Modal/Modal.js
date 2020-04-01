import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';

import classes from './Modal.module.css';

class Modal extends React.Component{

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentDidUpdate() {
    console.log('[Modal] did update');
  }

  render(){
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
          >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
