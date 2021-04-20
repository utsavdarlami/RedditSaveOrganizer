import React ,{Component} from 'react';

class Fetch extends Component {

    clicked = () =>{
        //this.props.searchSaves(this.state.searchText)
        this.props.fetchSaves()
    }

    render(){
        return (
			<button onClick = {this.clicked} className="btn btn-info">Fetch</button>
        );
    }
}
export default Fetch;
