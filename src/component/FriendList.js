import React from 'react';

const FriendList = (props) => {
    return props.data.map((result) => {
        let messageTime = new Date(result.message.messageTime);
        let displayTime = messageTime.getMinutes() < 10 ? `${messageTime.getHours()}:0${messageTime.getMinutes()}` : `${messageTime.getHours()}:${messageTime.getMinutes()}`;
        return (
            <div className='flex-container display-area' onClick={() => props.handleClick(result)} key={result.roomName}>
                <div className='cols-3 padding'>
                    <img src={result.imgUrl} alt=''
                         className='image-size'/>
                    {!result.message.status && result.message.speaker !== window.sessionStorage.getItem('username') &&
                    <div className='circle'/>}
                </div>
                <div className='cols-9'>
                    <div className='flex-container'>
                        <div className='cols-12'><p className='text-center padding'>{displayTime}</p></div>
                        <div className='cols-12'><p
                            className='text-truncate'>{result.message.messageContent}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
};

export default FriendList;