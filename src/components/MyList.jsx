import React, {Component} from 'react';
import BookRecord from "./BookRecord";
import {Redirect} from 'react-router-dom'
import {Spinner, Jumbotron} from "react-bootstrap";
import './MyList.css'


class MyList extends Component {



    constructor(){
        super();
        this.state ={
            books: [],
            loading: false
        }
    }

    getData = async () => {
        
        this.setState({loading: true})
        // try {
        //     const api_call = await fetch("http://34.90.125.25:9000/api/users/library",{
        //         method:'get',
        //         headers:{

        //             'Authorization': localStorage.getItem('token')
        //         }

        //     });
        //     const data = await api_call.json();
        let jsonString = localStorage.getItem(localStorage.getItem("userID"))
        let booksArr = jsonString.split('||').map(str => JSON.parse(str))
        this.setState({books: booksArr})
        this.setState({loading: false})
        // }catch (e) {
            
        // }

    }

    componentDidMount() {
        this.getData()
    }

    render() {


        if(!Boolean(localStorage.getItem('authenticated'))){
            return <Redirect to ="/"/>
        }

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

        const toShowIitems = this.state.books.map(item => <BookRecord key={item.id} item={item} myList/>);
        return (
            <div className="mylist">
                {toShowIitems.length===0 && <Jumbotron>
                    <h1>your library is empty</h1>
                </Jumbotron>}

                {toShowIitems}


            </div>
        );
    }
}

export default MyList;