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
                        Welcome to my app!!
                    </h2>
                    <p>
                        soon betterReads
                    </p>
                </Jumbotron>
                <Link to="About">
                    <Button >About </Button>
                </Link>
            </Container>
        )
    }

}
