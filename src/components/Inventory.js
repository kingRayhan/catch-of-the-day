import React , { Component } from 'react'
import AddFishForm from './addFishForm'
class Inventory extends Component{

	render = () => (
		<div className="inventory">
			<h2>Inventory</h2>
			<AddFishForm addFish={this.props.addFish} />
			<button onClick={ () => this.props.loadSampleFishes() }>Load Sample Fishes</button>
		</div>
	)
}
export default Inventory