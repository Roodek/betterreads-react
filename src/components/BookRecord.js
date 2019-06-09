import React from "react"
import Image from 'react-image-resizer'
import {Card, Button} from "react-bootstrap";
import StarRatings from 'react-star-ratings'
import './BookRecord.css'




class BookRecord extends React.Component{

    constructor(props){
        super(props)

        this.state ={
            viewed: false,
            bookState: this.props.item.status,
            rating: this.props.item.rating
        }
    }

    handleOnClick = () =>{
        this.setState({viewed:!this.state.viewed})
    };

    addBook =(status=this.state.bookState, rating=this.state.rating) =>{

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
            console.log(response)
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


    showViewedBook =(viewed) =>{
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
                    <Card style={{width: '18rem'}}>
                        <div className="book-card">
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