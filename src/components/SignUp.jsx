import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPass: '',
            errors: {
                user: 'Enter Login',
                pass: 'Enter Password',
                conpass: 'repeat pass',
            }
        }
    }

    handleSubmit = () =>{

        if (!this.state.username || !this.state.password) {
            return  this.setState({
                username:'',
                password:'',
                confirmPass: '',
                errors:{
                    user:'Username is required',
                    pass: 'Password is required',
                    conpass: 'Password is required'}});


        }

        if(this.state.password!==this.state.confirmPass){

            return this.setState({
                //username:'',
                //password:'',
                confirmPass: '',
                errors:{
                    //user:'Username is required',
                    //pass: 'Password is required',
                    conpass: 'Password not matched'}});

            }

        //todo send data to API

        return this.setState({ errors: '' });
    };


    handleChange =(event) =>{
        this.setState({
            [event.target.id]: event.target.value
        });

    }

    render() {
        return(
                <Form >
                    <Form.Group controlId="username">
                        <Form.Label/>
                        <Form.Control size="sm" type="text" value={this.state.username}  placeholder={this.state.errors.user} onChange={this.handleChange}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label/>
                        <Form.Control size="sm" type="password" value={this.state.password} placeholder={this.state.errors.pass} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="confirmPass">
                        <Form.Label/>
                        <Form.Control size="sm" type="password" value={this.state.confirmPass} placeholder={this.state.errors.conpass} onChange={this.handleChange}/>
                    </Form.Group>

                    <Button size="sm" variant="primary" onClick={() => this.handleSubmit()}>
                        Submit
                    </Button>
                </Form>
        )
    }
}

export default SignUp;