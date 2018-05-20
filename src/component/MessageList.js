import React from 'react';
import getUserColor from '../tools/getUserColor'

const MessageList = ({data}) => {
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
            background: getUserColor(window.sessionStorage.username),
        };

        const friendColor = {
            background: chatMessage.speaker ? getUserColor(chatMessage.speaker) : "fff",
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
};


export default MessageList;