import React, {Component} from 'react';
import booksToDisplay from "./books";
import BookRecord from "./BookRecord";
import {Redirect} from 'react-router-dom'


class MyList extends Component {



    constructor(){
        super();
        this.state ={
            books: booksToDisplay
        }
    }

    render() {
        if(!Boolean(localStorage.getItem('authenticated'))){
            return <Redirect to ="/"/>
        }
        const toShowIitems = this.state.books.map(item => <BookRecord key={item.id} item={item}/>);
        return (
            <div>
                Collection here

            </div>
        );
    }
}

export default MyList;