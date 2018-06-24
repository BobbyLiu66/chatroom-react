import React from 'react';

const MessageList = (props) => {
    let flagMinutes, flag = true;
    return props.data.map((chatMessage) => {
        let displayTime;
        let messageTime = new Date(chatMessage.messageTime);
        if (flag || (messageTime.getMinutes() - 5) >= flagMinutes) {
            flagMinutes = messageTime.getMinutes();
            displayTime = messageTime.getMinutes() < 10 ? `${messageTime.getHours()}:0${messageTime.getMinutes()}` : `${messageTime.getHours()}:${messageTime.getMinutes()}`;
        }
        flag = false;
        return (
            <div className='row message-block' key={chatMessage.messageTime}>
                <div className='col-sm-12'>
                    {displayTime && <p className='text-center time'>{displayTime}</p>}
                </div>
                <div className='col-sm-2 avatar'>
                    {chatMessage.speaker !== window.sessionStorage.getItem('username') && chatMessage.speaker !== null &&
                    <img src={props.imgUrl.avatarFriend} alt={chatMessage.speaker}
                         className='image-size'/>
                    }
                </div>
                <div className='col-sm-8 border-display'>
                    {chatMessage.speaker === window.sessionStorage.getItem('username') ?
                        <p className='text-justify float-right'>{chatMessage.messageContent}</p> :
                        <p className='text-justify'>{chatMessage.messageContent}</p>}
                </div>
                <div className='col-sm-2 avatar'>
                    {chatMessage.speaker === window.sessionStorage.getItem('username') &&
                    <img src={props.imgUrl.avatarUser} alt={chatMessage.speaker}
                         className='image-size'/>
                    }
                </div>
            </div>
        )
    });
};


export default MessageList;