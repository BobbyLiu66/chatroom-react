import React, {Component} from 'react';
import BoardController from './BoardController'
import ChatController from './ChatController'
import './Navbar.css'

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-primary sticky-top flex-md-nowrap">
                {/*<button className="navbar-toggler collapsed" type="button" onClick={this.props.handleClick} value="switch">*/}
                    {/*switch*/}
                {/*</button>*/}
                {this.props.display.displayBoard && <BoardController/>}
                {this.props.display.displayChat &&
                <ChatController className="justify-content-end" handleClick={this.props.handleClick}/>}
            </nav>
        );
    }
}

export default Navbar;
