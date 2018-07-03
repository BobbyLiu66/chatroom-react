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
            <div className='flex-container padding' key={chatMessage.messageTime}>
                <div className='cols-12'>
                    {displayTime && <p className='text-center padding'>{displayTime}</p>}
                </div>
                <div className='cols-2 avatar'>
                    {chatMessage.speaker !== window.sessionStorage.getItem('username') && chatMessage.speaker !== null &&
                    <img src={props.imgUrl.avatarFriend} alt={chatMessage.speaker}
                         className='image-size'/>
                    }
                </div>
                <div className='cols-6 border-display'>
                    {chatMessage.speaker === window.sessionStorage.getItem('username') ?
                        <p className='text-justify float-right padding-message'>{chatMessage.messageContent}</p> :
                        <p className='text-justify padding-message'>{chatMessage.messageContent}</p>}
                </div>
                <div className='cols-2 avatar'>
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