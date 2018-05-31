import React, {Component} from 'react';
import './Navbar.css'
import {connect} from "react-redux";
import Facebook from "./Facebook";
import {inputState} from "../actions";

const mapDispatchToProps = dispatch => {
    return {
        inputState: (state) => dispatch(inputState(state)),
    }
};

class Nav extends Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        window.sessionStorage.username = undefined;
        this.props.inputState(true);
        //TODO facebook logout
    }
    render() {
        return (
            <nav className="navbar navbar-dark sticky-top bg-dark">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="">{window.sessionStorage.username}</a>
                <ul className="navbar-nav px-3">
                    <button type="button" className="btn btn-dark" onClick={this.handleClick}>Log out</button>
                </ul>
            </nav>
        );
    }
}


const Navbar = connect(null,mapDispatchToProps)(Nav);

export default Navbar;
