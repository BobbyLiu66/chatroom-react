import React, {Component} from 'react'

class Facebook extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        // window.FB.getLoginStatus(function (response) {
        //     if (response.authResponse) {
        //         window.FB.api('/me', function(response) {
        //             console.log(response);
        //             window.sessionStorage.username = response.name;
        //             this.props.inputState()
        //         });
        //     }
        // });
    }

    render() {
        return (<div className="fb-login-button" data-width="220px" data-max-rows="1" data-size="large"
                     data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false"
                     data-use-continue-as="false"></div>)
    }
}

export default Facebook;