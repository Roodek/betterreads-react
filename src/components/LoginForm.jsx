import {Button, Form} from "react-bootstrap";
import React from "react";


class LoginForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {
                user: 'Enter Login',
                pass: 'Enter Password'
            }
        }

    }

    dismissError = () => {
        this.setState({errors: {
                user: '',
                pass: ''
            }})
    };

    handleSubmit = () =>{

        if (!this.state.username || !this.state.password) {
             return this.setState({ errors:{ user:'Username is required',
                                            pass: 'Password is required'}});

        }
        this.props.handleLoginForm();
        return this.setState({ errors: '' });
    };


    handleChange =(event) =>{
        this.setState({
            [event.target.id]: event.target.value
        });

    }

    render() {
        return(
            <div className="LoginForm">
            <Form inline >
                <Form.Group controlId="username">
                    <Form.Label/>
                    <Form.Control size="sm" type="text"  placeholder={this.state.errors.user} onChange={this.handleChange}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label/>
                    <Form.Control size="sm" type="password"  placeholder={this.state.errors.pass} onChange={this.handleChange}/>
                </Form.Group>

                <Button size="sm" variant="primary" onClick={() => this.handleSubmit()}>
                    Submit
                </Button>
            </Form>
            </div>
        )
    }
}

export default LoginForm;