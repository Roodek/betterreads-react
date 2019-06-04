import React from "react"
import Image from 'react-image-resizer'
import {Card, Button} from "react-bootstrap";
import './BookRecord.css'




class BookRecord extends React.Component{

    constructor(props){
        super(props)

        this.state ={
            viewed: false
        }
    }

    handleOnClick = () =>{
        this.setState({viewed:!this.state.viewed})
    };

    addBook =(option) =>{
        console.log("book \""+this.props.item.title+"\" added with option: "+option);
    }

    showViewedBook =(viewed) =>{
        if(viewed){
            return(

                <Card  style={{ width: '18rem' }}>
                    <div className="book-card">
                    <Image src={this.props.item.image_url} height={240} width={240}/>
                    <Card.Body >
                        <Card.Title>{this.props.item.title}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button variant="info" onClick={() => this.addBook(1)}>To read</Button>
                        <Button variant="info" onClick={() =>this.addBook(2)}>Reading</Button>
                        <Button variant="info" onClick={() =>this.addBook(3)}>I already read that</Button>
                    </Card.Body>
                    </div>
                </Card>


            );
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