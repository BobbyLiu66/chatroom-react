import React, {Component} from 'react';

class BoardController extends Component {
    constructor(){
        super();
        this.state = {
            inputColor:'blue',
            inputWidth:'5'
        }
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleClick(event){
        //TODO clear board
    }

    render() {
        return (
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-outline-light" onClick={this.handleClick}>clear</button>
                <div className="btn-group" role="group">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputColor">Color</label>
                    </div>
                    <select className="custom-select" id="inputColor" value={this.state.inputColor} onChange={this.handleChange}>
                        <option value="black">black</option>
                        <option value="blue">blue</option>
                        <option value="red">red</option>
                        <option value="green">green</option>
                        <option value="yellow">yellow</option>
                        <option value="gray">gray</option>
                    </select>
                </div>

                <div className="btn-group" role="group">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputWidth">LineWidth</label>
                    </div>
                    <select className="custom-select" id="inputWidth" value={this.state.inputWidth} onChange={this.handleChange}>
                        <option value="1">1</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="9">9</option>
                        <option value="11">11</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default BoardController;
