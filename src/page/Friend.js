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
        if (event.target.value === "AGREE") {
            socket.emit('ADD_FRIEND_SUCCESS', event);
        }

        else if (event.target.value === "ADD") {
            this.props.addFriend(true)
        }
    }

    componentDidMount() {
        socket.emit("NEW_FRIEND_LIST", {
            nickname: window.sessionStorage.username
        });
        socket.on('LOAD_FRIEND_LIST', (data) => {
            console.log("LOAD");
            console.log(data);
            this.setState({
                addFriendList: data.newFriendList
            })
        })
    }

    displayFriend(data) {
        return data.map((result) => {
            return (
                <div className="row display-area text-center">
                    <div className="col-md-2">
                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png" alt=""
                             className="image-size"/>
                    </div>
                    <div className="col-md-10">
                            <p className="text-truncate ">{`${result.nickname} want to be friend with you`}
                            </p>
                        <button type="button" className="btn btn-outline-success btn-sm" value="AGREE"
                                onClick={this.handleClick}>AGREE
                        </button>
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
                                    <button className="btn btn-outline-secondary" value="ADD" type="button"
                                            onClick={this.handleClick}>Add
                                    </button>
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

const Friend = connect(null, mapDispatchToProps)(FriendList);

export default Friend