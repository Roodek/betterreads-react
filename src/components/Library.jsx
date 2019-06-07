import React, {Component} from 'react';
import BookRecord from "./BookRecord";
import {Spinner,Button} from "react-bootstrap";
import './Library.css';
import SearchBar from "./SearchBar";



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
        //this.getData()
        this.getSlicedData(1)
    }

    getData = async () => {
        this.setState({loading: true})
        const api_call = await fetch("http://34.90.125.25:9000/api/books/");
        const data =  await api_call.json();
        this.setState({books: data})
        this.setState({loading: false})


    }
    getSlicedData = async (currentPage) => {
        this.setState({loading: true})
        try {


            const api_call = await fetch("http://34.90.125.25:9000/api/books/page=" + currentPage);
            const data = await api_call.json();
            this.setState({books: data})
            this.setState({loading: false})
        }catch (e) {

        }
    }

    handleClick = (event) =>{
        this.getSlicedData(event.target.id)
        this.setState({currentPage: Number(event.target.id)})

    }

    handleSearch =async(searchPhrase) =>{
        this.setState({loading: true})
        try {


            const api_call = await fetch("http://34.90.125.25:9000/api/books/search?query=" + searchPhrase);
            const data = await api_call.json();
            this.setState({books: data})
            this.setState({loading: false})
        }catch (e) {

        }
    }

    render() {

        const {loading, books, currentPage, booksPerPage} = this.state
        //const Books = this.state.books.map(item => <BookRecord key={item.id} item={item}/>);

        const indexOfLastBook = currentPage * booksPerPage;
        const indexOfFirstBook = indexOfLastBook - booksPerPage;
        //const currentBooks = books.slice(indexOfFirstBook,indexOfLastBook);
        const currentBooks = books

        const renderBooks = currentBooks.map(item => <BookRecord key={item.id} item={item}/>);

        const indexOfFirstPage=currentPage-3;
        const indexOfLastPage=currentPage+3;

        const pageNumbers =[];
        /*for(let i =Math.max(1,indexOfFirstPage);i <= Math.min(indexOfLastPage,Math.ceil(books.length/booksPerPage)); i++){
            pageNumbers.push(i);
        }*/

        for(let i =Math.max(1,indexOfFirstPage);i <= Math.min(indexOfLastPage,400); i++){
            pageNumbers.push(i);
        }

        const renderPageNumbers =pageNumbers.map(number =>{
            return(
                <Button
                    variant="dark"
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                    disabled={currentPage===number}
                >
                    {number}
                </Button>
            );
        });

        const isLoading =(loading) =>{
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



        return (

            <div className="library">
                <div className="search-bar">
                     <SearchBar search={'author or title'} handleSearch={this.handleSearch}/>

                </div>


                <div className="pages" >
                    <ul  id="page-numbers">
                        <Button id={1} onClick={this.handleClick} variant="dark"> {"<<"} </Button>
                        {renderPageNumbers}
                        <Button id={400} onClick={this.handleClick} variant="dark">{">>"}</Button>
                    </ul>
                </div>
                <ul id="book-records">
                    {isLoading(loading)}
                    {renderBooks}
                </ul>
                <div className="pages">
                    <ul  id="page-numbers">
                        <Button id={1} onClick={this.handleClick} variant="dark"> {"<<"} </Button>
                        {renderPageNumbers}
                        <Button id={400} onClick={this.handleClick} variant="dark">{">>"}</Button>
                    </ul>
                </div>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}
//in case of all books returned from api instead of 400 books.lenght/booksPerPage
export default Library

