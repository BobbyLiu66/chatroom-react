//TODO change nick name. avatar.
import React, {Component} from 'react';

class Setting extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageUrl:''
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        // const file = event.target.files;
        const reader = new FileReader();

        reader.onload = function (e) {
            this.setState({imageUrl:e.target.result})
        }.bind(this);
        reader.readAsDataURL(event.target.files[0]);
    }

    render(){
        return (
            <div className="col-centered">
                <div className="input-group">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="picture" onChange={this.handleChange}/>
                            <label className="custom-file-label" htmlFor="inputGroupFile02">Set Your Avatar</label>
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