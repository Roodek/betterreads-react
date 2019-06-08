import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap';
import {Redirect} from 'react-router-dom'

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
            },
            created: false
        }
    }

    handleSubmit = () =>{
        let passwordHash = require('password-hash')

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
                    conpass: 'Password not matched'}});

            }

        //todo send data to API
        let hash = this.state.password //todo improve to actual hash in the future

        fetch('http://34.90.125.25:9000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: this.state.username,
                password: hash,
            })
        }).then(response =>{
            if(response.ok){
                this.setState({created:true})
                console.log("logs: "+ this.state.username+ "pass: "+ hash)
                return
            }
            throw new Error('login already taken')
        }).catch(error => {return this.setState({
            username:'',
            password:'',
            confirmPass: '',
            errors:{
                user:'login already taken',
                pass: '',
                conpass: ''}
        })})


        return this.setState({ errors: '' });
    };


    handleChange =(event) =>{
        this.setState({
            [event.target.id]: event.target.value
        });

    }

    render() {
        return(
            <div>
                {this.state.created && <Redirect to="/"/>}
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
            </div>
        )
    }
}

export default SignUp;