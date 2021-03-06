import React, {Component} from 'react';
import {connect} from 'react-redux';
import {inputState, setUserAvatar} from '../actions';
import {avatarUrl} from '../tools/constant'
import './component.css'

const mapDispatchToProps = dispatch => {
    return {
        inputState: (state) => dispatch(inputState(state)),
        setUserAvatar: (input) => dispatch(setUserAvatar(input))
    }
};

const mapStateToProps = state => {
    return {avatarUser: state.avatarUser};
};

class Nav extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        window.FB.getLoginStatus((response) => {
            if (response.authResponse) {
                window.FB.logout();
            }
            window.sessionStorage.removeItem('username');
            this.props.inputState(true);
        });
    }

    componentDidMount() {
        const userImg = avatarUrl(window.sessionStorage.getItem('username'));
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve()
            };
            img.onerror = () => {
                reject()
            };
            img.src = userImg
        }).then(() => {
            this.props.setUserAvatar(userImg)
        }, () => {
            this.props.setUserAvatar(avatarUrl('default'))
        })
    }

    render() {
        return (
            <ul className='navbar-custom'>
                <li>
                    <img
                        src={this.props.avatarUser}
                        alt={window.sessionStorage.getItem('username')} className='image-size nav-item'/>
                </li>

                <li>
                    <a href="#" className='navbar-item'>
                        {window.sessionStorage.getItem('username')}
                    </a>
                </li>

                <li className='quit'>
                    <a href='#' className='navbar-item' onClick={this.handleClick}>Quit</a>
                </li>
            </ul>
        );
    }
}


const Navbar = connect(mapStateToProps, mapDispatchToProps)(Nav);

export default Navbar;
