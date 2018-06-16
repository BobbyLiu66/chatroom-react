import React, {Component} from 'react';
import socket from "../tools/getSocket";

class Setting extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageUrl:'',
            alertMessageStatus:false,
            alertMessage:'',
            photo:'',
            fileType:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(event){
        const reader = new FileReader();
        reader.onload = function (e) {
            this.setState({imageUrl:e.target.result})
            }.bind(this);
        reader.readAsDataURL(event.target.files[0]);
        this.setState({photo:event.target.files[0],fileType:/[^.]+$/.exec(event.target.files[0].name)[0]})

    }

    handleClick(){
        if(this.state.photo){
            socket.emit('AVATAR',{nickname:window.sessionStorage.getItem('username'),photo:this.state.photo,fileType:this.state.fileType});
            //TODO
            this.setState({alertMessageStatus:true,alertMessage:'Set Avatar Success'});
        }
        else{
            this.setState({alertMessageStatus:true,alertMessage:'Choose your avatar'});
        }
        setTimeout(()=>{
            this.setState({alertMessageStatus:false,alertMessage:''});
        },5000)
    }

    render(){
        return (
            <div className="col-centered">
                {this.state.alertMessageStatus &&
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {this.state.alertMessage}
                </div>}
                <div className="input-group">
                    <div className="custom-file">
                        <input type="file" accept="image/png,image/jpeg" className="custom-file-input" id="picture" onChange={this.handleChange}/>
                            <label className="custom-file-label" htmlFor="inputGroupFile02">Set Your Avatar</label>
                    </div>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.handleClick}>Upload</button>
                    </div>
                </div>
                <div className="input-group">
                    {this.state.imageUrl && <img src={this.state.imageUrl} alt="" className="preview-image-size mx-auto d-block"/>}
                </div>
            </div>
        )
    }
}

export default Setting