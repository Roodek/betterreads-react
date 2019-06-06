import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {Jumbotron, Container, Row, Col, Image, Button} from "react-bootstrap";
import './Home.css';


export default class Home extends Component{
    render() {
        return(
            <Container>
                <Jumbotron>
                    <h2>
                        Welcome to betterReads!!
                    </h2>
                    <p>
                        your place to view and manage your book records
                    </p>
                </Jumbotron>
                <Link to="About">
                    <Button >About </Button>
                </Link>
            </Container>
        )
    }

}
