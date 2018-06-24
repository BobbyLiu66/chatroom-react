import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './Chat.css'
import socket from '../tools/getSocket';
import FriendList from '../component/FriendList'
import MessageList from '../component/MessageList'
import {avatarUrl} from '../tools/constant';
import {setFriendAvatar} from '../actions';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {avatarUser: state.avatarUser, avatarFriend: state.avatarFriend};
};

const mapDispatchToProps = dispatch => {
    return {setFriendAvatar: (imgUrl) => dispatch(setFriendAvatar(imgUrl))}
};

class ChatPage extends Component {
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

    handleClick(result) {
        this.props.setFriendAvatar(result.imgUrl);
        socket.emit('LOAD_HISTORY', {roomName: result.roomName, nickname: window.sessionStorage.getItem('username')});
        this.setState({roomName: result.roomName, inputArea: true})
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
        this.setState((prevState) => {
            prevState.map((friend) => {
                if (friend.roomName === this.state.roomName) {
                    friend.message = message
                }
                return friend
            });
            return ({
                friendList: prevState.friendList
            })
        })

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
                prevState.friendList.map((friend) => {
                    if (friend.roomName === prevData.roomName) {
                        friend.message.status = true
                    }
                    return friend
                });
                return ({
                    chatMessage: data.message,
                    friendList: prevState.friendList
                })
            });

        });

        socket.on('FRIEND_LIST', (data) => {
            data.message.map((friend) => {
                friend.imgUrl = avatarUrl(friend.friend);
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        resolve()
                    };
                    img.onerror = () => {
                        reject()
                    };
                    img.src = friend.imgUrl
                }).catch(() => {
                    friend.imgUrl = avatarUrl('default');
                    this.setState({
                        friendList: data.message
                    });
                })
            });
            data.err ? this.setState({error: 'Try again later'}) : this.setState({friendList: data.message});
        });

        socket.on('ADD_FRIEND_SUCCESS', (data, friendName) => {
            data.message.map((message) => {
                message.friend = friendName;
                return message
            });
            this.setState({friendList: [...this.state.friendList, ...data.message]});
        });

        socket.on('NEW_MESSAGE', (data) => {
            const newFriendList = this.state.friendList;
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

        socket.on('RECONNECT', () => {
            socket.emit('RECONNECT', {nickname: window.sessionStorage.getItem('username')})
        });
    }

    componentWillUnmount() {
        socket.off('LOAD_HISTORY');
        socket.off('FRIEND_LIST');
        socket.off('ADD_FRIEND_SUCCESS');
        socket.off('NEW_MESSAGE');
        socket.off('reconnect');
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return (
            <div className='col-md-11'>
                <div className='row input-area'>
                    <div className='col-md-3 left-area'>
                        <FriendList data={this.state.friendList} handleClick={this.handleClick}/>
                    </div>
                    <div className='col-md-7 offset-1'>
                        <div className='message-area' ref='messageList'>
                            <MessageList data={this.state.chatMessage} imgUrl={this.props}/>
                        </div>
                    </div>
                </div>
                {this.state.inputArea && <div className='row input-bar'>
                    <div className='input-group mb-3'>
                        <input type='text' className='form-control' placeholder='Input here ...'
                               value={this.state.inputMessage} onChange={this.handleChange}
                               aria-label='Input here ...'/>
                        <div className='input-group-append'>
                            <button className='btn btn-outline-secondary' type='button'
                                    onClick={this.handleSubmit}>Send
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

const Chat = connect(mapStateToProps, mapDispatchToProps)(ChatPage);

export default Chat;
