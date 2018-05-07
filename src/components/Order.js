import React , { Component } from 'react';
import { formatPrice } from '../helpers';
import { TransitionGroup , CSSTransition } from 'react-transition-group'
class Order extends Component{

	renderOrder = key => {
	    const fish = this.props.fishes[key];
		const count = this.props.orders[key];
		const isAvailable = fish && fish.status === 'available';
        const transitionOptions = {
          classNames: "order",
          key,
          timeout: { enter: 500, exit: 500 }
        };
        if(!fish) return null;
		if(!isAvailable){
			return <li>Sorry { fish ? fish.name: 'fish' } is no longer available!</li>
		}
		return (<CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={ () => this.props.decrementOrder(key) }> { `<` } </button>
            <button onClick={ () => this.props.incrementOrder(key) }> { `>` } </button>
            <button onClick={() => this.props.deleteOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>);
	}


    render() {
    	const orderIds = Object.keys(this.props.orders)
    	const total = orderIds.reduce( (prevTotal , key) => {
    		const fish = this.props.fishes[key];
    		const count = this.props.orders[key];
    		const isAvailable = fish && fish.status === 'available';
    		if(!fish) return null;
            if(isAvailable){
    			return prevTotal + (count * fish.price)
    		}
    		return prevTotal;
    	} , 0 )
        return(
            <div className="order-wrap">
            	<h2>Order</h2>
            	<TransitionGroup component="ul" className="order">
            		{ orderIds.map(this.renderOrder) }
            	</TransitionGroup>
            	<div className="total">
            		Total: &nbsp; <strong>{ formatPrice(total) }</strong>
            	</div>
            </div>
        )
    }
}
export default Order;