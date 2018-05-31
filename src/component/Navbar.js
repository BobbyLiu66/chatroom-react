import React, {Component} from 'react';
// import BoardController from './BoardController'
// import ChatController from './ChatController'
import './Navbar.css'
import {connect} from "react-redux";
import Facebook from "./Facebook";

const mapStateToProps = state => {
    return { picture: state.picture };
};

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark sticky-top bg-dark">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="">{window.sessionStorage.username}</a>
                <ul className="navbar-nav px-3">
                    <Facebook/>
                </ul>
            </nav>
        );
    }
}


const Navbar = connect(mapStateToProps)(Nav);

export default Navbar;
