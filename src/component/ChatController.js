import React, {Component} from 'react';

class ChatController extends Component {

    render() {
        return (
            <div className="btn-group my-2" role="group">
                <button type="button" className="btn btn-outline-light" onClick={this.props.handleClick} value="friend">Add Friend</button>
            </div>
        );
    }
}

export default ChatController;
