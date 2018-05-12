import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './ChatRoom.css'
import socket from '../tools/getSocket';

const LOAD_FRIEND_LIST_ERROR = 'load friend list wrong, please try again later';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputMessage: '',
            chatMessage: [],
            friendList: [],
            roomName: '',
            inputArea: false,
            COLORS: [
                '#e21400', '#91580f', '#f8a700', '#f78b00',
                '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
                '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
            ]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.displayMessage = this.displayMessage.bind(this);
        this.displayFriend = this.displayFriend.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        socket.emit('FRIEND_LIST', {nickname: window.sessionStorage.username})
    }

    handleClick(roomName) {
        socket.emit('LOAD_HISTORY', {roomName: roomName, nickname: window.sessionStorage.username});
        this.setState({roomName: roomName, inputArea: true})
    }

    handleChange(event) {
        this.setState({inputMessage: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let message = {
            speaker: window.sessionStorage.username,
            messageTime: new Date(),
            messageContent: this.state.inputMessage,
            roomName: this.state.roomName,
        };
        socket.emit('NEW_MESSAGE', message);
        this.setState({
            chatMessage: [...this.state.chatMessage, {
                speaker: window.sessionStorage.username,
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
        });
        this.setState({
            friendList: newFriendList
        });
    }

    displayMessage(data) {
        let flagMinutes, flag = true;
        return data.map((chatMessage) => {
            let displayTime;
            let messageTime = new Date(chatMessage.messageTime);
            if (flag || (messageTime.getMinutes() - 5) >= flagMinutes) {
                flagMinutes = messageTime.getMinutes();
                displayTime = messageTime.getMinutes() < 10 ? `${messageTime.getHours()}:0${messageTime.getMinutes()}` : `${messageTime.getHours()}:${messageTime.getMinutes()}`;
            }
            flag = false;
            const nicknameColor = {
                background: this.getUsernameColor(window.sessionStorage.username),
            };

            const friendColor = {
                background: chatMessage.speaker ? this.getUsernameColor(chatMessage.speaker) : "fff",
            };
            return (
                <div className="row message-block" key={chatMessage.messageTime}>
                    <div className="col-sm-12">
                        {displayTime && <p className="text-center time">{displayTime}</p>}
                    </div>

                    <div className="col-sm-2 avatar">
                        {chatMessage.speaker !== window.sessionStorage.username && chatMessage.speaker !== null &&
                        <div style={friendColor}
                             className="image-size">{chatMessage.speaker && chatMessage.speaker.slice(0, 2).toUpperCase()}</div>
                        }
                    </div>
                    <div className="col-sm-8 border-display">
                        {chatMessage.speaker === window.sessionStorage.username ?
                            <p className="text-justify float-right">{chatMessage.messageContent}</p> :
                            <p className="text-justify">{chatMessage.messageContent}</p>}
                    </div>

                    <div className="col-sm-2 avatar">
                        {chatMessage.speaker === window.sessionStorage.username &&
                        <div style={nicknameColor}
                             className="image-size">{window.sessionStorage.username.slice(0, 2).toUpperCase()}</div>
                        }
                    </div>
                </div>
            )
        });
    }

    displayFriend(data) {
        return data.map((result) => {
            let messageTime = new Date(result.message.messageTime);
            let displayTime = messageTime.getMinutes() < 10 ? `${messageTime.getHours()}:0${messageTime.getMinutes()}` : `${messageTime.getHours()}:${messageTime.getMinutes()}`;
            const friendColor = {
                background: this.getUsernameColor(result.friend),
            };
            return (
                <div className="row display-area" onClick={() => this.handleClick(result.roomName)}>
                    <div className="col-md-3 time">
                        <div style={friendColor}
                             className="image-size">{result.friend.slice(0, 2).toUpperCase()}</div>
                        {!result.message.status && result.message.speaker !== window.sessionStorage.username &&
                        <div className="circle"/>}
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-12"><p className="text-center time">{displayTime}</p></div>
                            <div className="col-md-12"><p
                                className="text-truncate">{result.message.messageContent}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    scrollToBottom() {
        const {messageList} = this.refs;
        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    getUsernameColor(username) {
        // Compute hash code
        let hash = 7;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        let index = Math.abs(hash % this.state.COLORS.length);
        return this.state.COLORS[index];
    }

    componentDidMount() {
        socket.on('ADD_FRIEND_REQUEST', (data) => {
            //TODO
            let result = window.confirm(`${data.nickname} want to be friend with you`);
            result && socket.emit('ADD_FRIEND_SUCCESS', data)
        });

        socket.on('LOAD_HISTORY', (data, prevData) => {
            this.setState((prevState) => {
                let newFriendList = prevState.friendList;
                newFriendList.map((friend) => {
                    if (friend.roomName === prevData.roomName) {
                        friend.message.status = true
                    }
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
                message.friend = friendName
            });
            this.setState({friendList: [...this.state.friendList, ...data.message]});
        });

        socket.on('NEW_MESSAGE', (data) => {
            let newFriendList = this.state.friendList;
            newFriendList.map((friend) => {
                if (friend.roomName === data.roomName) {
                    friend.message = data;
                    friend.roomName !== this.state.roomName ? friend.message.status = false : ''
                }
            });
            this.setState({
                friendList: newFriendList
            });
            this.state.roomName === data.roomName && this.setState({chatMessage: [...this.state.chatMessage, data]})
        });

        socket.on('reconnect', () => {
            socket.emit('RECONNECT', {nickname: window.sessionStorage.username})
        });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return (
            <div className="col-md-11">

                <div className="row input-area">
                    <div className="col-md-3 left-area">
                        {this.displayFriend(this.state.friendList)}
                    </div>
                    <div className="col-md-7 offset-1">
                        <div className="message-area" ref="messageList">
                            {this.displayMessage(this.state.chatMessage)}
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

export default ChatRoom;
