import React, {Component} from 'react';
import BookRecord from "./BookRecord";


import axios from 'axios'

class Library extends Component {
    constructor(){
        super();
        this.state = {
            loading: false,
            books: [],
            currentPage: 1,
            booksPerPage: 25
        }
    };

    componentDidMount(){
        this.getData()
    }

    getData = async () => {
        this.setState({loading: true})
        const api_call = await fetch("http://34.90.125.25:9000/api/books/");
        const data =  await api_call.json();
        this.setState({books: data})
        this.setState({loading: false})

        /*axios.get("http://34.90.125.25:9000/api/books/page="+this.state.page)
            .then((response) => {
                this.setState({books: response.json()})

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })*/

    }

    handleClick = (event) =>{
        this.setState({currentPage: Number(event.target.id)})
    }

    render() {

        const {lodaing, books, currentPage, booksPerPage} = this.state
        //const Books = this.state.books.map(item => <BookRecord key={item.id} item={item}/>);

        const indexOfLastBook = currentPage * booksPerPage;
        const indexOfFirstBook = indexOfLastBook - booksPerPage;
        const currentBooks = books.slice(indexOfFirstBook,indexOfLastBook);

        const renderBooks = currentBooks.map(item => <BookRecord key={item.id} item={item}/>);

        const indexOfFirstPage=currentPage-3;
        const indexOfLastPage=currentPage+3;

        const pageNumbers =[];
        for(let i =Math.max(1,indexOfFirstPage);i <= Math.min(indexOfLastPage,Math.ceil(books.length/booksPerPage)); i++){
            pageNumbers.push(i);
        }
        const renderPageNumbers =pageNumbers.map(number =>{
            return(
                <button
                key={number}
                id={number}
                onClick={this.handleClick}
                disabled={currentPage===number}>
                    {number}
                </button>
            );
        });

        return (

            <div>
                Library:
                <ul id="page-numbers">
                    <button id={1} onClick={this.handleClick}> {"<<"} </button>
                    {renderPageNumbers}
                    <button id={Math.ceil(books.length/booksPerPage)} onClick={this.handleClick}>{">>"}</button>
                </ul>
                <ul id="book-records">
                    {renderBooks}
                </ul>
                <ul id="page-numbers">
                    <button id={1} onClick={this.handleClick}> {"<<"} </button>
                    {renderPageNumbers}
                    <button id={Math.ceil(books.length/booksPerPage)} onClick={this.handleClick}>{">>"}</button>
                </ul>
                <br/>
                <br/>
                <br/>



            </div>
        );
    }
}

export default Library

