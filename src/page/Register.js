import React, {Component} from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <form action="">
                    <table>
                        <tbody>
                        <tr>
                            <td>Nick Name:</td>
                            <td><input type="text"/></td>
                        </tr>
                        <tr>
                            <td>Email Address:</td>
                            <td><input type="email"/></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input type="password"/></td>
                        </tr>
                        <tr>
                            <td>Avatar:</td>
                            <td><input type="file"/></td>
                        </tr>
                        <tr>
                            <td><button className="btn">Submit</button></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}
