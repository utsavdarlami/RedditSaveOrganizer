import React ,{Component} from 'react'
import './App.css'
import Navbar from './Components/Layout/Navbar';

import Saves from './Components/Saves/Saves';

import axios from 'axios';

// const api = "http://app:5000"
// const api = "http://localhost:5000"
// const api = "app"
const api = "app:5000"

class App extends Component {
  
  state={
    saves:{},
    loading:false
  }

  async componentDidMount(){
    this.setState({loading:true})
    const res = await axios.get(`${api}/allsaves`);
    // console.log(res.data)
    this.setState({loading:false,saves:res.data})

  };

  searchSaves  = async sub => {
    this.setState({loading:true})
    const res = await axios.get(`${api}/search/${sub}`);
    // console.log(res.data)
    this.setState({loading:false,saves:res.data})
    //this.setState({saves:res.data})
  };

  render(){
    return (
    <div className="App"> 
        <Navbar searchSaves={this.searchSaves}/>
   
        <div className='jumbotron' style={{background: 'rgb(45,186,219)',
                                         // eslint-disable-next-line no-dupe-keys
                                         background: 'linear-gradient(90deg, rgba(45,186,219,1) 7%, rgba(58,132,191,1) 97%)'}}>
          
          <Saves allSaves = {this.state.saves} loading={this.state.loading}/> {/*  passed the object of saves as Props*/}
        </div>
      
    </div>
    );
  }
}

export default App;
