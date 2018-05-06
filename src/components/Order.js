import React , { Component } from 'react';
import { formatPrice } from '../helpers';
class Order extends Component{

	renderOrder = key => {
	    const fish = this.props.fishes[key];
		const count = this.props.orders[key];
		const isAvailable = fish && fish.status === 'available';
        if(!fish) return null;
		if(!isAvailable){
			return <li>Sorry { fish ? fish.name: 'fish' } is no longer available!</li>
		}
		return <li key={key}>
			{ count } lbs { fish.name }
			{ formatPrice(count * fish.price) }
            <button onClick={ () => this.props.decrementOrder(key) }> { '<' } </button>
            <button onClick={ () => this.props.incrementOrder(key) }> { '>' } </button>
            <button onClick={ () => this.props.deleteOrder(key) }>&times;</button>
		</li>;
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
            	<ul className="order">
            		{ orderIds.map(this.renderOrder) }
            	</ul>
            	<div className="total">
            		Total: &nbsp; <strong>{ formatPrice(total) }</strong>
            	</div>
            </div>
        )
    }
}
export default Order;