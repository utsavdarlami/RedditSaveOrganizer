import React ,{Component} from 'react';
//import axios from 'axios';


class Search extends Component {
    state = {
        searchText :""
    }
    // newSaves=()=>{
        
    // }
    onChange=(e)=>{
        this.setState({searchText:e.target.value})
        //console.log(this.state.searchText)
        // this.setState({[e.target.name]:e.target.value})
        // Pass to Up Props
        this.props.searchSaves(this.state.searchText)
    }
    //  onClick={this.props.newSaves}
    render(){
        return (
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" name="text" placeholder="Search" value={this.state.searchText} onChange ={this.onChange} aria-label="Search"/>
            </form>
        );
    }
}
export default Search;
