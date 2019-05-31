import React, {Component} from 'react';
import booksToDisplay from "./books";
import BookRecord from "./BookRecord";


class MyList extends Component {


    constructor(){
        super();
        this.state ={
            books: booksToDisplay
        }
    }

    render() {

        const toShowIitems = this.state.books.map(item => <BookRecord key={item.id} item={item}/>);
        return (
            <div>
                rendering books
                {toShowIitems}
            </div>
        );
    }
}

export default MyList;