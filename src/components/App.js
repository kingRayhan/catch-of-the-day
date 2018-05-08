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

    updateFish = (key , UpdatedFish) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = UpdatedFish;
        this.setState({ fishes });
    }

    deleteFish = key => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes });
    }

    deleteOrder = key => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
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
    incrementOrder = key => {
        const order = this.state.order;
        order[key]++;
        this.setState({ order }); 
    }
    decrementOrder = key => {
        const order = this.state.order;
        if(order[key] === 0) return;
        order[key]--;
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
                <Order 
                    fishes={this.state.fishes} 
                    orders={this.state.order} 
                    incrementOrder={this.incrementOrder}
                    decrementOrder={this.decrementOrder}
                    deleteOrder={this.deleteOrder}/>
                <Inventory 
                    addFish={this.addFish} 
                    updateFish={this.updateFish} 
                    fishes={this.state.fishes}
                    deleteFish={this.deleteFish}
                    storeId={this.props.match.params.storeId}
                    loadSampleFishes={this.loadSampleFishes}/>
            </div>
        )
    }
}
export default App;