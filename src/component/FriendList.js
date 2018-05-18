import React from 'react';

// class FriendList extends Comment{
//     constructor(){
//         super();
//     }
//
//     render(){
//
//     }
// }

const FriendList = () => {
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
};