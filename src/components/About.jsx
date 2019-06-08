import React, {Component} from 'react';
import {Button} from 'react-bootstrap'
export default class About extends Component {

    constructor(props){
        super(props)

        this.state ={
            hash: ''
        }
    }

    handleClick =() =>{
        let passwordHash = require('password-hash')
        let hash = passwordHash.generate('haslo')
        this.setState({hash: hash})
        console.log(hash)
    }
    handleClick2 =() =>{
        let passwordHash = require('password-hash')
        console.log("old"+this.state.hash)
        console.log("new"+passwordHash.generate('haslo'))
        console.log(passwordHash.verify('haslo',this.state.hash))
    }
    render() {

        return (
            <div>
                ABOUT PAGE
                <Button onClick={this.handleClick}>hash</Button>
                <Button onClick={this.handleClick2}>check</Button>
            </div>
        );
    }
}

