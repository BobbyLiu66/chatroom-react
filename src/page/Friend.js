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
            search: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    handleClick(event) {
        if (event.target.value === "ADD") {
            this.props.addFriend(true)
        }
        else {
            socket.emit('ADD_FRIEND_SUCCESS', {
                nickname: event.target.value,
                inviteName: window.sessionStorage.getItem('username')
            });
            socket.emit("NEW_FRIEND_LIST", {
                nickname: window.sessionStorage.getItem('username')
            });
        }
    }

    componentDidMount() {
        socket.emit("NEW_FRIEND_LIST", {
            nickname: window.sessionStorage.getItem('username')
        });
        socket.on('LOAD_FRIEND_LIST', (data) => {
            this.setState({
                addFriendList: data.newFriendList
            })
        })
    }

    displayFriend(data) {
        return data.map((result) => {
            return (
                <div className="row display-area text-center" key={result.messageTime}>
                    <div className="col-md-2">
                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png" alt=""
                             className="image-size"/>
                    </div>
                    <div className="col-md-9 offset-1">
                        <p className="text-truncate ">{`${result.nickname} want to be friend with you`}
                        </p>
                        <button type="button" className="btn btn-outline-success btn-sm" value={result.nickname}
                                disabled={result.state === "PASS"}
                                onClick={this.handleClick}>{result.state === "PASS" ? "ADDED" : "AGREE"}
                        </button>
                    </div>
                </div>
            )
        })
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({search: event.target.value});
    }

    render() {
        return (
            <div className="col-md-11">
                <div className="row input-area">
                    <div className="col-md-3 left-area">
                        <div className="col-md-12">
                            <div className="input-group mb-3 image text-center">
                                <button className="btn btn-outline-secondary add-friend" value="ADD" type="button"
                                        onClick={this.handleClick}>Add New Friend
                                </button>
                            </div>
                        </div>
                        {this.displayFriend(this.state.addFriendList)}
                    </div>
                </div>
            </div>
        );
    }
}

const Friend = connect(null, mapDispatchToProps)(FriendList);

export default Friend