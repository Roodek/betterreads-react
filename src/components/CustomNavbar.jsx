import React, { Component } from 'react'
import { Navbar, Nav, NavItem, Form, FormControl, Button } from 'react-bootstrap';
import './CustomNavbar.css'

import LoginForm from "./LoginForm";

export default class CustomNavbar extends Component {

    constructor(){
        super();

    }

    render() {
        return (
            <Navbar default collapseOnSelect>

                <Navbar.Brand>
                    <Nav.Link href="/" to="/">betterReads</Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle />

                <Nav fill justify variant="pills" className="justify-content-end" >
                    <Nav.Item>
                        <Nav.Link eventKey={1} href="/">   Home   </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={2} href="/Library">Library</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={3} href="/About">About</Nav.Link>
                    </Nav.Item>
                    {this.props.isAuthenticated &&
                    <Nav.Item>
                        <Nav.Link eventKey={4} href="/MyList">My BookList</Nav.Link>
                    </Nav.Item>

                    }
                    {this.props.isAuthenticated ?
                        <Form inline>
                        <Button size="sm" variant="primary" onClick={ () => this.props.handleLoginForm}>
                            Logout
                        </Button>
                        </Form>
                        :
                        <LoginForm handleLoginForm={this.props.handleLoginForm} />
                    }

                </Nav>
            </Navbar>
        )
    }
}