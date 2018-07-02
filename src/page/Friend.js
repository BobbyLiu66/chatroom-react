import React, {Component} from 'react';
import socket from '../tools/getSocket';
import {addFriend} from '../actions';
import {connect} from 'react-redux'
import {avatarUrl} from '../tools/constant';

const mapDispatchToProps = dispatch => {
    return {addFriend: (input) => dispatch(addFriend(input))}
};

class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addFriendList: [],
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        if (event.target.value === 'ADD') {
            this.props.addFriend(true)
        }
        else {
            socket.emit('ADD_FRIEND_SUCCESS', {
                nickname: event.target.value,
                inviteName: window.sessionStorage.getItem('username')
            });
            socket.emit('NEW_FRIEND_LIST', {
                nickname: window.sessionStorage.getItem('username')
            });
        }
    }

    componentDidMount() {
        socket.emit('NEW_FRIEND_LIST', {
            nickname: window.sessionStorage.getItem('username')
        });

        socket.on('LOAD_FRIEND_LIST', (data) => {
            const friendList = data.newFriendList;
            friendList.map((friend) => {
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
                        addFriendList: friendList
                    });
                })
            });
            this.setState({
                addFriendList: friendList
            })
        })
    }

    componentWillUnmount() {
        socket.off('LOAD_FRIEND_LIST');
    }

    displayFriend(data) {
        return data.map((result) => {
            return (
                <div className='row display-area text-center' key={result.messageTime}>
                    <div className='col-2'>
                        <img src={result.imgUrl} alt={result.nickname}
                             className='image-size'/>
                    </div>
                    <div className='col-9 offset-1'>
                        <p className='text-truncate '>{`${result.nickname} want to be friend with you`}
                        </p>
                        <button type='button' className='btn btn-outline-success btn-sm' value={result.nickname}
                                disabled={result.state === 'PASS'}
                                onClick={this.handleClick}>{result.state === 'PASS' ? 'ADDED' : 'AGREE'}
                        </button>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className='col-11'>
                <div className='row input-area'>
                    <div className='col-3 left-area'>
                        <div className='col-12'>
                            <div className='input-group mb-3 padding text-center'>
                                <button className='btn btn-outline-secondary add-friend' value='ADD' type='button'
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