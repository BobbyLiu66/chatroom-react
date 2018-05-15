//TODO display add friend list and optional display friend list like weixin
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './Chat.css'
import socket from '../tools/getSocket';

class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addFriend: [],
            buttonStatus: ''
        };
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(data) {
        socket.emit('ADD_FRIEND_SUCCESS', data);
        this.setState({
            buttonStatus:true
        })
    }

    displayFriend(data) {
        return data.map((result) => {
            let messageTime = new Date(result.messageTime);
            let displayTime = messageTime.getMinutes() < 10 ? `${messageTime.getHours()}:0${messageTime.getMinutes()}` : `${messageTime.getHours()}:${messageTime.getMinutes()}`;
            return (
                <div className="row display-area">
                    <div className="col-md-3 time">
                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png" alt=""
                             className="image-size"/>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-12"><p className="text-center time">{displayTime}</p></div>
                            <div className="col-md-12"><p
                                className="text-truncate">{`${result.nickname} want to be friend with you`}</p>
                                <button type="button" className="btn btn-primary" onClick={this.handleClick} disabled={this.state.buttonStatus}>Agree
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="col-md-11">
                <div className="row input-area">
                    <div className="col-md-3 left-area">
                        {this.displayFriend(this.state.friendList)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Friend