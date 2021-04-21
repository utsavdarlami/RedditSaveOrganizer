import React ,{Component} from 'react'
import './App.css'

import Navbar from './Components/Layout/Navbar';
import Saves from './Components/Saves/Saves';

import axios from 'axios';

// Alert 
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { withAlert } from 'react-alert'

//ALERT OPTIONS
const alertOptions = {
    timeout : 3000,
    position : 'top center'
}

// const api = "http://app:5000"
//const api = "http://localhost/app"
const api = "/app"
//const api = ""

class App extends Component {

  //constructor(props) {
    //super(props);
  //} 
  
  state={
    saves:{},
    loading:false
  }

  //const alert = useAlert()

  async componentDidMount(){
    this.setState({loading:true})
    const res = await axios.get(`${api}/allsaves`);
    //console.log(res)
    this.setState({loading:false,saves:res.data})

  };

  searchSaves  = async sub => {
    this.setState({loading:true})
    const res = await axios.get(`${api}/search/${sub}`);
    // console.log(res.data)
    this.setState({loading:false,saves:res.data})
    //this.setState({saves:res.data})
  };

  fetchSaves = async () => {
    this.setState({loading:true})
    const res = await axios.get(`${api}/fetch`);
    //console.log(res.data)
    this.setState({loading:false})
    //this.props.alert.show('Oh look, an alert!')
    //this.setState({saves:res.data})
  };

        //<AlertProvider template={AlertTemplate} {...alertOptions}>
  render(){
    return (
            <div className="App"> 
                <Navbar searchSaves={this.searchSaves} fetchSaves={this.fetchSaves}/>

                <div className='jumbotron' style={{background: 'rgb(45,186,219)',
                    // eslint-disable-next-line no-dupe-keys
                    background: 'linear-gradient(90deg, rgba(45,186,219,1) 7%, rgba(58,132,191,1) 97%)'}}>

                    <Saves allSaves = {this.state.saves} loading={this.state.loading}/> {/*  passed the object of saves as Props*/}
                </div>

            </div>
    );
  }
        //</AlertProvider>
}

//export default withAlert()(App);
export default App;
