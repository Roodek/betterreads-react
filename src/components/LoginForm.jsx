import {Button, Form} from "react-bootstrap";
import React from "react";


class LoginForm extends React.Component{

    constructor(){
        super();
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

    handleSubmit = (event) =>{
        event.preventDefault()

        /*if (!this.state.username || !this.state.password) {
             return this.setState({ errors:{ user:'Username is required',
                                            pass: 'Password is required'}});
        }*/

        this.props.loginFunc()


        return this.setState({ errors: '' });
    };

    handleUserChange =(event) => {
        this.setState({
            username: event.target.value,
        });
    };

    handlePassChange =(event) => {
        this.setState({
            password: event.target.value,
        });
    };

    render() {
        return(
            <div className="LoginForm">
            <Form inline onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label/>
                    <Form.Control size="sm" type="text" placeholder={this.state.errors.user}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label/>
                    <Form.Control size="sm" type="password" placeholder={this.state.errors.pass}/>
                </Form.Group>

                <Button size="sm" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        )
    }
}

export default LoginForm;