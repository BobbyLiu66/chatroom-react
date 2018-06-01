//TODO display add friend list and optional display friend list like weixin
import React, {Component} from 'react';
import './Chat.css'
import socket from '../tools/getSocket';
import {addFriend} from "../actions";
import {connect} from 'react-redux'

const mapDispatchToProps = dispatch => {
    return {addFriend: (input) => dispatch(addFriend(input))}
};

class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addFriendList: [],
        };
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        if(event.target.value === "AGREE"){
            socket.emit('ADD_FRIEND_SUCCESS', event);
            this.setState((prevState) => {
                prevState.addFriendList.map((friend) => {
                    //TODO
                    // if (friend.id === data.id) {
                    //     friend.buttonState = false
                    // }
                    return friend
                })
            })
        }

        else if(event.target.value === "ADD"){
            this.props.addFriend(true)
        }
    }

    componentDidMount() {
        socket.on('LOAD_FRIEND_REQUEST', (data) => {
            this.setState({
                addFriendList: data
            })
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
                                <button type="button" className="btn btn-primary" value="AGREE" onClick={this.handleClick}>Agree
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
                        <div className="col-md-12">
                            <div className="input-group mb-3 image">
                                <input type="text" className="form-control"/>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" value="ADD" type="button" onClick={this.handleClick}>Add</button>
                                </div>
                            </div>
                        </div>
                        {this.displayFriend(this.state.addFriendList)}
                    </div>
                </div>
            </div>
        );
    }
}
const Friend = connect(null,mapDispatchToProps)(FriendList);

export default Friend