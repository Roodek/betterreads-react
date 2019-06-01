import React from "react"
import Image from 'react-image-resizer'

class BookRecord extends React.Component{


    handleOnClick = () =>{
        console.log("book "+this.props.item.title+" added");
    };
    render() {
        return (
            <div className="todo-item">
                <button onClick={this.handleOnClick}> Add book</button>
                <p>{this.props.item.title}</p>
                <Image src={this.props.item.image_url} height={240} width={240}/>
            </div>
        )
    }
}



export default BookRecord;