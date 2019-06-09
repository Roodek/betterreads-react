import React from "react"
import Image from 'react-image-resizer'
import {Card, Button, Container, Col, Carousel, Row, Spinner} from "react-bootstrap";
import StarRatings from 'react-star-ratings'
import './BookRecord.css'




class BookRecord extends React.Component{

    constructor(props){
        super(props)

        this.state ={
            viewed: false,
            bookState: this.props.item.status,
            rating: this.props.item.rating,
            recommendedBooks: [],
            loading:false
        }
    }

    handleOnClick = () =>{
        this.setState({viewed:!this.state.viewed})
        if(this.props.myList){
            this.getRecommededBooks(1)
        }
    };

    addBook =(status=this.state.bookState, rating=Math.floor(this.state.rating)) =>{

        fetch('http://34.90.125.25:9000/api/users/library', {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.item.id,
                rating: rating,
                status: status
            })
        }).then(response =>{
            if(response.ok){
                return
            }

            throw new Error('something went wrong')
        }).catch(error => {
            console.log(error)
        })

        this.setState({
            bookState: status,
            rating: rating
        })


    }

    changeRating =(newRating)=>{
        this.addBook(this.state.bookState,newRating)
    }

    getRecommededBooks =async(currentPage) =>{
        this.setState({loading: true})
        try {

            const api_call = await fetch("http://34.90.125.25:9000/api/books/page=" + currentPage);
            const data = await api_call.json();
            this.setState({recommendedBooks: data})
            this.setState({loading: false})
        }catch (e) {

        }
    }

    isLoading = (loading) =>{
        if(loading) {
            return (
                <div className="spinner">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )
        }
    }

    showViewedBook =(viewed) =>{

        let recommendedBooks = this.state.recommendedBooks.map(item => {
            return(
                <Carousel.Item key={item.id}>
                    <img
                        className="d-block w-100"
                        src={item.image_url}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>{item.title}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            );
        })


        if(viewed){

            if(!this.props.myList) {
                return (
                    <Card style={{width: '18rem'}}>
                        <div className="book-card">
                            <Image src={this.props.item.image_url} height={240} width={240}/>
                            <Card.Body>
                                <Card.Title>{this.props.item.authors}</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                {localStorage.getItem('authenticated') && !this.props.myList &&
                                <Button variant="info" onClick={() => this.addBook()}>Add to my List</Button>}

                                <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor='blue'
                                    starDimension='20px'
                                />
                            </Card.Body>
                        </div>
                    </Card>
                );
            }else {
                return (
                    <Card style={{width: '50%'}}>
                        <div className="book-card">
                            <Container>
                                <Row>
                                    <Col>
                            <Image src={this.props.item.image_url} height={240} width={240}/>

                            <Card.Body>

                                <Card.Title>{this.props.item.authors}</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>

                                <Button variant="info" disabled={this.state.bookState === 'To read'}
                                        onClick={() => this.addBook('To read')}>To read</Button>
                                <Button variant="info" disabled={this.state.bookState === 'Currently reading'}
                                        onClick={() => this.addBook('Currently reading')}>Currently reading</Button>
                                <Button variant="info" disabled={this.state.bookState === 'I already read that'}
                                        onClick={() => this.addBook('I already read that')}>I already read that</Button>

                                <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor='blue'
                                    changeRating={this.changeRating}
                                    starDimension='20px'
                                />


                            </Card.Body>
                                    </Col>
                                <Col>
                                    <h3>Recommended for you !!!</h3>
                                    {this.isLoading(this.state.loading)}
                                    <Carousel interval={3000}>
                                        {recommendedBooks}
                                    </Carousel>

                                </Col>
                            </Row>
                            </Container>
                        </div>
                    </Card>
                )
            }
        }
    };

    renderImage =(viewed) =>{
        if(!viewed){
            return <Image src={this.props.item.image_url} height={240} width={240}/>
        }
    };

    moreLess =(viewed) =>{
        if(viewed){
            return "Less"
        }else{
            return "More"
        }
    }
    render() {
        return (
            <div className="todo-item">

                <div className="book-title">{this.props.item.title} {this.showViewedBook(this.state.viewed)}</div>
                {this.renderImage(this.state.viewed)}
                <Button variant="danger" onClick={this.handleOnClick}>{this.moreLess(this.state.viewed)}</Button>
            </div>
        )
    }
}


export default BookRecord;