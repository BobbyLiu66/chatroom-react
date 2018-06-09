import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './Chat.css'
import socket from '../tools/getSocket';
import FriendList from '../component/FriendList'
import MessageList from '../component/MessageList'

const LOAD_FRIEND_LIST_ERROR = 'load friend list wrong, please try again later';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputMessage: '',
            chatMessage: [],
            friendList: [],
            roomName: '',
            inputArea: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        socket.emit('FRIEND_LIST', {nickname: window.sessionStorage.getItem('username')})
    }

    handleClick(roomName) {
        socket.emit('LOAD_HISTORY', {roomName: roomName, nickname: window.sessionStorage.getItem('username')});
        this.setState({roomName: roomName, inputArea: true})
    }

    handleChange(event) {
        this.setState({inputMessage: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let message = {
            speaker: window.sessionStorage.getItem('username'),
            messageTime: new Date(),
            messageContent: this.state.inputMessage,
            roomName: this.state.roomName,
        };
        socket.emit('NEW_MESSAGE', message);
        this.setState({
            chatMessage: [...this.state.chatMessage, {
                speaker: window.sessionStorage.getItem('username'),
                messageTime: new Date(),
                messageContent: this.state.inputMessage
            }],
            inputMessage: ''
        });
        let newFriendList = this.state.friendList;
        newFriendList.map((friend) => {
            if (friend.roomName === this.state.roomName) {
                friend.message = message
            }
            return friend
        });
        this.setState({
            friendList: newFriendList
        });
    }

    scrollToBottom() {
        const {messageList} = this.refs;
        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentDidMount() {
        socket.on('LOAD_HISTORY', (data, prevData) => {
            this.setState((prevState) => {
                let newFriendList = prevState.friendList;
                newFriendList.map((friend) => {
                    if (friend.roomName === prevData.roomName) {
                        friend.message.status = true
                    }
                    return friend
                });
                return ({
                    chatMessage: data.message,
                    friendList: newFriendList
                })
            });

        });

        socket.on('FRIEND_LIST', (data) => {
            data.err ? alert(LOAD_FRIEND_LIST_ERROR) : this.setState({friendList: data.message});
        });

        socket.on('ADD_FRIEND_SUCCESS', (data, friendName) => {
            data.message.map((message) => {
                message.friend = friendName;
                return message
            });
            this.setState({friendList: [...this.state.friendList, ...data.message]});
        });

        socket.on('NEW_MESSAGE', (data) => {
            let newFriendList = this.state.friendList;
            newFriendList.map((friend) => {
                if (friend.roomName === data.roomName) {
                    friend.message = data;
                    friend.roomName !== this.state.roomName ? friend.message.status = false : friend.message.status = true
                }
                return friend
            });
            this.setState({
                friendList: newFriendList
            });
            this.state.roomName === data.roomName && this.setState({chatMessage: [...this.state.chatMessage, data]})
        });

        socket.on('reconnect', () => {
            socket.emit('RECONNECT', {nickname: window.sessionStorage.getItem('username')})
        });

    }

    componentWillUnmount(){
        socket.off("LOAD_HISTORY");
        socket.off("FRIEND_LIST");
        socket.off("ADD_FRIEND_SUCCESS");
        socket.off("NEW_MESSAGE");
        socket.off("reconnect");
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return (
            <div className="col-md-11">
                <div className="row input-area">
                    <div className="col-md-3 left-area">
                        <FriendList data={this.state.friendList} handleClick={this.handleClick}/>
                    </div>
                    <div className="col-md-7 offset-1">
                        <div className="message-area" ref="messageList">
                            <MessageList data={this.state.chatMessage}/>
                        </div>
                    </div>
                </div>
                {this.state.inputArea && <div className="row input-bar">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Input here ..."
                               value={this.state.inputMessage} onChange={this.handleChange}
                               aria-label="Input here ..."/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button"
                                    onClick={this.handleSubmit}>Send
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

export default Chat;
