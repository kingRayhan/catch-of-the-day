import React  , { Component } from 'react';
import base from '../base'

import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'

class App extends Component{
    state = {
        fishes: {},
        order: {}
    }
    componentDidMount()
    {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);

        if(localStorageRef)
        {
            this.setState({ order: JSON.parse(localStorageRef) })
        }

        this.ref = base.syncState(`${params.storeId}/fishes` , {
            context: this,
            state: 'fishes'
        });
    }
    componentWillUnmount()
    {
        base.removeBinding(this.ref);
    }
    componentDidUpdate() {
        localStorage.setItem( 
            this.props.match.params.storeId , 
            JSON.stringify(this.state.order)
        )
    }
    addFish = fish => {
        // 1. Take a copy of existing state
        const fishes = {...this.state.fishes};
        // 2. add our new fish to state
        fishes[`fishes${Date.now()}`] = fish;
        // 3. update state
        this.setState({ fishes });        
    }
    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        })
    }

    addToOrder = key => {
        // 1. take a copy of state
        const order = {...this.state.order}
        // 2. Either add to the order or update the number of order
        order[key] = order[key] + 1 || 1;
        // 3. update state
        this.setState({ order }); 
    }
    fishes = () => 
        Object.keys(this.state.fishes)
        .map( key => 
            <Fish 
                 key={key} 
                 details={this.state.fishes[key]}
                 index={key}
                 addToOrder={this.addToOrder}
            /> 
        )
    render(){
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="freash seafood market"/>
                    <ul className="fishes">{ this.fishes() }</ul>
                </div>
                <Order fishes={this.state.fishes} orders={this.state.order} />
                <Inventory 
                    addFish={this.addFish} 
                    loadSampleFishes={this.loadSampleFishes}/>
            </div>
        )
    }
}
export default App;