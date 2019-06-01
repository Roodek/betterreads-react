import React, {Component} from 'react';
import BookRecord from "./BookRecord";
import axios from 'axios'


class Library extends Component {
    constructor(){
        super();
        this.state = {
            loading: false,
            books: []
        }
    };

    componentDidMount(){
        this.getData()
    }

    getData = async() => {
        const api_call = await fetch("http://34.90.125.25:9000/api/books/page=1");
        const data = await api_call.json();
        this.setState({books: data})
    }

    render() {
        const Books = this.state.books.map(item => <BookRecord key={item.id} item={item}/>);
        return (
            <div>
                Library:
                <br/>
                <br/>
                <br/>
                {Books}
            </div>
        );
    }
}

export default Library

