import React , { Component } from 'react'
import AddFishForm from './addFishForm'
import EditFishForm from './EditFishForm'
class Inventory extends Component{

	render = () => (
		<div className="inventory">
			<h2>Inventory</h2>
			{ Object.keys(this.props.fishes).map( key => 
				<EditFishForm 
					key={key}
					index={key}
					deleteFish={this.props.deleteFish}
					updateFish={this.props.updateFish}
					fish={this.props.fishes[key]}/> 
			) }
			<AddFishForm addFish={this.props.addFish} />
			<button onClick={ () => this.props.loadSampleFishes() }>Load Sample Fishes</button>
		</div>
	)
}
export default Inventory