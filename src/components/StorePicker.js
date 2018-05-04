import React , { Component } from 'react';
import { getFunName } from '../helpers'
class StorePicker extends Component{
    myInput = React.createRef()
    goToStore = e => {
        // 1. Stop the page form from submitting
        e.preventDefault();
        // 2. Get the store name from input
        const storeName = this.myInput.current.value;
        // 3. go to another component
        this.props.history.push(`/store/${storeName}`)
    }
    render() {
        return(
            <React.Fragment>
                <form className="store-selector" onSubmit={this.goToStore}>
                    <h2>Please Enter A Store</h2>
                    <input 
                        type="text" 
                        required 
                        placeholder="Store Name" 
                        ref={this.myInput}
                        defaultValue={getFunName()}/>
                    <button type="submit">Visit Store ►</button>
                </form>
            </React.Fragment>
        )
    }
}
export default StorePicker;