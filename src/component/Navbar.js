import React, {Component} from 'react';
import {connect} from 'react-redux';
import {inputState, setUserAvatar} from '../actions';
import {avatarUrl} from '../tools/constant'

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
            img.onload = function(){
                resolve()
            };
            img.onerror = function(){
                reject()
            };
            img.src = userImg
        }).then(()=>{
            this.props.setUserAvatar(userImg)
        },()=>{
            this.props.setUserAvatar(avatarUrl('default'))
        })
    }

    render() {
        return (
            <nav className='navbar navbar-dark sticky-top bg-dark'>
                <a className='navbar-brand col-sm-3 col-md-2 mr-0' href=''>
                    <img
                        src={this.props.avatarUser}
                        alt={window.sessionStorage.getItem('username')} className='image-size'/>
                    {window.sessionStorage.getItem('username')}
                </a>

                <ul className='navbar-nav px-3'>
                    <button type='button' className='btn btn-dark' onClick={this.handleClick}>Log out</button>
                </ul>
            </nav>
        );
    }
}


const Navbar = connect(mapStateToProps, mapDispatchToProps)(Nav);

export default Navbar;
