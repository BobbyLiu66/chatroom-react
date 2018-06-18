import React from 'react';

const FriendList = (props) => {
    return props.data.map((result) => {
        let messageTime = new Date(result.message.messageTime);
        let displayTime = messageTime.getMinutes() < 10 ? `${messageTime.getHours()}:0${messageTime.getMinutes()}` : `${messageTime.getHours()}:${messageTime.getMinutes()}`;
        return (
            <div className="row display-area" onClick={() => props.handleClick(result.roomName)} key={result.roomName}>
                <div className="col-md-3 time">
                    <img src={result.imgUrl} alt=""
                         className="image-size"/>
                    {!result.message.status && result.message.speaker !== window.sessionStorage.getItem('username') &&
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

// class FriendList extends Component {
//     constructor() {
//         super();
//         console.log(this.props.data);
//         this.state = {friendList: this.props.data};
//         this.handleError = this.handleError.bind(this)
//     }
//
//     handleError(event) {
//         this.setState((prevState) => {
//             let newList = prevState.data;
//             newList.map((friendList) => {
//                 if (friendList.friend === event.target.id) {
//                     friendList.onError = true;
//                 }
//                 return friendList
//             });
//             return ({
//                 data: newList
//             })
//         })
//     }
//
//     render(){
//         console.log(this.state);
//         return this.state.data.map((result) => {
//             console.log(result);
//             let messageTime = new Date(result.message.messageTime);
//             let displayTime = messageTime.getMinutes() < 10 ? `${messageTime.getHours()}:0${messageTime.getMinutes()}` : `${messageTime.getHours()}:${messageTime.getMinutes()}`;
//
//             return (
//                 <div className="row display-area" onClick={() => this.props.handleClick(result.roomName)} key={result.roomName}>
//                     <div className="col-md-3 time">
//                         {!result.onError ? <img src={"https://s3.amazonaws.com/chat-picture/" + result.friend + ".png"} alt=""
//                              onError={this.handleError} id={result.friend}
//                              className="image-size"/> : <img src={"https://s3.amazonaws.com/chat-picture/default.png"} alt="" className="image-size"/>}
//                         {!result.message.status && result.message.speaker !== window.sessionStorage.getItem('username') &&
//                         <div className="circle"/>}
//                     </div>
//                     <div className="col-md-9">
//                         <div className="row">
//                             <div className="col-md-12"><p className="text-center time">{displayTime}</p></div>
//                             <div className="col-md-12"><p
//                                 className="text-truncate">{result.message.messageContent}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )
//         })
//     }
// }

export default FriendList;