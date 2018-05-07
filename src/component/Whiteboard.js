import React, {Component} from 'react';

class Whiteboard extends Component {

    render() {
        return (
            <div className="container-fluid" style={{"height":"100%"}}>
                <div className="row justify-content-md-center" style={{"height":"100%"}}>
                    <div className="col-md-10" style={{"background-color":"#e7e7e7"}}>
                        <canvas/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Whiteboard;
