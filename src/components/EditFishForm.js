import React , { Component } from 'react'

class EditFish extends Component{

	handleChange = e => {
		// update that fish
		// 1. Take a copy of the current fish
		const upDatedFish = {
			...this.props.fish,
			[e.currentTarget.name]: e.currentTarget.value
		}
		this.props.updateFish(this.props.index , upDatedFish)
	}

	render = () => (
		<React.Fragment>
			<div className="fish-edit">
		      <input 
		      	name="name"
		      	placeholder="Name" 
		        onChange={ this.handleChange }
		        value={this.props.fish.name} />
		      <input
		        name="price"
		        type="text"
		        placeholder="Price"
		        onChange={ this.handleChange }
		        value={this.props.fish.price}
		      />
		      <select 
		      	name="status"
		        onChange={ this.handleChange }
		        value={this.props.fish.status}>
		        <option value="available">Fresh!</option>
		        <option value="unavailable">Sold Out!</option>
		      </select>

		      <textarea 
		      	name="desc"
		      	placeholder="Desc" 
		        onChange={ this.handleChange }
		        value={this.props.fish.desc}/>
		      <input
		        name="image"
		        type="text"
		        placeholder="Image"
		        onChange={ this.handleChange }
		        value={this.props.fish.image}
		      />
		      <button type="submit" onClick={ () => this.props.deleteFish(this.props.index) }>- Remove Fish</button>
		    </div>
		</React.Fragment>
	)
}
export default EditFish