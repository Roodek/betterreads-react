import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Library from './components/Library';
import Navbar from './components/CustomNavbar';
import MyList from "./components/MyList";



class App extends Component {


    constructor(){
        super();

        this.state ={
            isAuthenticated: false
        }
    }


    handleLoginForm = () =>{
        this.setState({
            isAuthenticated: !this.state.isAuthenticated
        });
        console.log(this.state.isAuthenticated)

    };


    render() {

    return (
        <Router>
          <div>
              <Navbar handleLoginForm = {this.handleLoginForm} isAuthenticated={this.state.isAuthenticated}/>
              <Route exact path="/" component={Home}/>
              <Route  path="/about" component={About}/>
              <Route  path="/library" component={Library}/>
              <Route  path="/mylist" component={MyList}/>
          </div>
        </Router>
    );
    }
}

export default App;
