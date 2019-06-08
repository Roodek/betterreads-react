import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Library from './components/Library';
import Navbar from './components/CustomNavbar';
import MyList from "./components/MyList";
import SignUp from "./components/SignUp";




class App extends Component {


    constructor(){
        super();
        this.state ={
            isAuthenticated: false
        }
    }


    handleLoginForm = () =>{
        if(!this.state.isAuthenticated) {
            return this.setState({
                isAuthenticated: true
            });
        }else {
            localStorage.clear()
            this.setState({isAuthenticated: false})
        }

    };

    render() {

    return (
        <Router>
          <div>
              <Navbar handleLoginForm = {this.handleLoginForm} isAuthenticated={localStorage.getItem('authenticated')}/>
              <Route exact path="/" component={Home}/>
              <Route  path="/about" component={About}/>
              <Route  path="/library" component={Library}/>
              <Route  path="/mylist" component={MyList}/>
              <Route  path="/signup" component={SignUp}/>
          </div>
        </Router>
    );
    }
}

export default App;
