import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Button, ButtonToolbar} from "react-bootstrap";
import './SearchBar.css'


class SearchBar extends Component {

    constructor(props){
        super(props)

        this.state ={
            field: ''
        }
    }

    handleClick =() =>{

    }

    handleChange =(event) =>{
        event.preventDefault()
        this.setState({field: event.target.value})
    }
    render() {
        return (
            <div>
                <ButtonToolbar>
                <Form.Control type="text" placeholder={"search by "+this.props.search} onChange={this.handleChange} />
                <Button onClick={this.handleClick}>Search</Button>
                </ButtonToolbar>
            </div>
        );
    }
}

//SearchBar.propTypes = {};

export default SearchBar;