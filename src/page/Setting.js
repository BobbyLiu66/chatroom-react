import React, {Component} from 'react';
import socket from "../tools/getSocket";
import ReactAvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'

class Setting extends Component {
    state = {
        imageUrl: '',
        alertMessageStatus: false,
        alertMessage: '',
        image: '',
        fileType: '',
        allowZoomOut: false,
        borderRadius: 200,
        scale: 1,
        preview: null,
        width: 200,
        height: 200,
        url: ''
    };
    savedImg = React.createRef();

    handleSave = (e) => {
        console.log(e);
        fetch(this.editor.getImage().toDataURL())
            .then(res => res.blob())
            .then(blob => (this.setState({url: window.URL.createObjectURL(blob)})));

        if (this.state.image) {
            socket.emit('AVATAR', {
                nickname: window.sessionStorage.getItem('username'),
                photo: this.editor.getImage().toDataURL("image/png"),
                fileType: this.state.fileType
            });
        }
        else {
            this.setState({alertMessageStatus: true, alertMessage: 'Choose your avatar'});
        }
        setTimeout(() => {
            this.setState({alertMessageStatus: false, alertMessage: ''});
        }, 5000)
    };

    setEditorRef = editor => {
        if (editor) this.editor = editor
    };

    handleDrop = acceptedFiles => {
        this.setState({image: acceptedFiles[0]})
    };

    handleScale = e => {
        const scale = parseFloat(e.target.value);
        this.setState({scale})
    };

    handleChange = (event) => {
        this.setState({url: event.target.files[0]})
    };

    componentDidMount() {
        socket.on("AVATAR", (data) => {
            if (data.err) {
                this.setState({alertMessageStatus: true, alertMessage: data.err});
            }
            else {
                this.setState({alertMessageStatus: true, alertMessage: 'Set Avatar Success'});
                setTimeout(() => {
                    window.location.reload()
                }, 5000)
            }
        })
    }

    // handleClick() {
    //     if (this.state.photo) {
    //         socket.emit('AVATAR', {
    //             nickname: window.sessionStorage.getItem('username'),
    //             photo: this.state.photo,
    //             fileType: this.state.fileType
    //         });
    //     }
    //     else {
    //         this.setState({alertMessageStatus: true, alertMessage: 'Choose your avatar'});
    //     }
    //     setTimeout(() => {
    //         this.setState({alertMessageStatus: false, alertMessage: ''});
    //     }, 5000)
    // }


    render() {
        return (
            <div className="col-centered">
                {this.state.alertMessageStatus &&
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {this.state.alertMessage}
                </div>}
                <h5>Drop your avatar file here</h5>
                <div className="form-group">
                    <Dropzone
                        onDrop={this.handleDrop}
                        disableClick
                        multiple={false}
                        style={{width: this.state.width, height: this.state.height, marginBottom: '35px'}}>
                        <div>
                            <ReactAvatarEditor
                                ref={this.setEditorRef}
                                width={this.state.width}
                                scale={this.state.scale}
                                borderRadius={this.state.borderRadius}
                                height={this.state.height}
                                image={this.state.image}
                                className="editor-canvas"
                            />
                        </div>
                    </Dropzone>
                </div>
                <div className="form-group avatar-list text-center">
                    <span className='text-center'>Zoom</span>
                    <input
                        id="scale"
                        type="range"
                        className='custom-range'
                        onChange={this.handleScale}
                        min={this.state.allowZoomOut ? '0.1' : '1'}
                        max="2"
                        step="0.01"
                        defaultValue="1"
                    />
                </div>

                <div className="form-group avatar-list text-center">
                    <input type="button" className='btn btn-outline-secondary' onClick={this.handleSave} value="Save"/>
                </div>
                <img src={this.state.url} alt="" ref={this.savedImg} style={{display: "none"}}/>
            </div>
        )
    }
}

export default Setting