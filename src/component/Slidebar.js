import React, {Component} from 'react';
import ChatRoom from './ChatRoom'
import ChatController from './ChatController'
import './Slidebar.css'

class Slidebar extends Component {


    render() {
        return (
            <div className="container-fluid fill">
                <div className="row fill">
                    <nav className="col-md-1 d-none d-md-block bg-dark sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">

                                <li className="nav-item text-center image">
                                    <img
                                        src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQzNy4yMTIgNDM3LjIxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDM3LjIxMiA0MzcuMjEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGQ9Ik00MDQuODEyLDQxLjIwNmgtMzAwYy0xOCwwLTMyLjQsMTQuOC0zMi40LDMyLjR2MTg2LjRjMCwxOCwxNC44LDMyLjQsMzIuNCwzMi40aDIwNi44bDQ2LjgsNDcuMmMyLDIsNC40LDMuMiw3LjIsMy4yICAgICBjNS42LDAsMTAuNC00LjQsMTAuNC0xMC40di00MGgyOC44YzE4LDAsMzIuNC0xNC44LDMyLjQtMzIuNHYtMTg2LjRDNDM3LjIxMiw1NS42MDYsNDIyLjQxMiw0MS4yMDYsNDA0LjgxMiw0MS4yMDZ6ICAgICAgTTE1MC44MTIsMjAxLjYwNmMtMTYuNCwwLTMwLTEzLjYtMzAtMzBjMC0xNi40LDEzLjYtMzAsMzAtMzBjMTYuNCwwLDMwLDEzLjYsMzAsMzAgICAgIEMxODAuODEyLDE4OC4wMDYsMTY3LjYxMiwyMDEuNjA2LDE1MC44MTIsMjAxLjYwNnogTTI1Ni4wMTIsMjAxLjYwNmMtMTYuNCwwLTMwLTEzLjYtMzAtMzBjMC0xNi40LDEzLjYtMzAsMzAtMzAgICAgIGMxNi40LDAsMzAsMTMuNiwzMCwzMEMyODYuMDEyLDE4OC4wMDYsMjcyLjQxMiwyMDEuNjA2LDI1Ni4wMTIsMjAxLjYwNnogTTM2MC44MTIsMjAxLjYwNmMtMTYuNCwwLTMwLTEzLjYtMzAtMzAgICAgIGMwLTE2LjQsMTMuNi0zMCwzMC0zMGMxNi40LDAsMzAsMTMuNiwzMCwzMEMzOTAuODEyLDE4OC4wMDYsMzc3LjIxMiwyMDEuNjA2LDM2MC44MTIsMjAxLjYwNnoiIGZpbGw9IiNGRkZGRkYiLz4KCQkJPHBhdGggZD0iTTU0LjAxMiwyNjAuODA2di02My42aC0zMi44Yy0xMS42LDAtMjEuMiw5LjYtMjEuMiwyMS4ydjEyMi40Yy0wLjQsMTIuNCw5LjIsMjIsMjEuMiwyMmgxOC44djI2LjQgICAgIGMwLDMuNiwzLjIsNi44LDYuOCw2LjhjMiwwLDMuNi0wLjgsNC44LTJsMzAuOC0zMC44aDEzNmMxMS42LDAsMjEuMi05LjYsMjEuMi0yMS4ydi0zMC40aC0xMzQuOCAgICAgQzc2LjgxMiwzMTEuNjA2LDU0LjAxMiwyODguODA2LDU0LjAxMiwyNjAuODA2eiIgZmlsbD0iI0ZGRkZGRiIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"/>
                                </li>
                                <li className="nav-item text-center image">
                                    <img
                                        src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI1Ljk2IDI1Ljk2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNS45NiAyNS45NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTExLjg5NiwxNy4xNWMtMC4xMzEtMC4wNDMtMC45NTMtMC44ODctMC40MzktMi40NzRIMTEuNDVjMS4zNC0xLjQwMSwyLjQ4Ny0zLjY1NSwyLjQ4Ny01Ljg3NiAgICBjMC0zLjQxMi0yLjM1OS01LjIwMS00Ljk1Ny01LjIwMWMtMi42LDAtNC44NTUsMS43ODktNC44NTUsNS4yMDFjMCwyLjIyOSwxLjA1MSw0LjQ5MiwyLjM5OCw1Ljg5MiAgICBjMC41MjUsMS4zOTgtMC40MTQsMi4zODQtMC42MTEsMi40NThDMy4xOTIsMTguMTQ4LDAsMTkuOTcsMCwyMS43NjdjMCwwLjQ4NSwwLDAuMTkxLDAsMC42NzRjMCwyLjQ0OSw0LjY3NywzLjAwNiw5LjAwNiwzLjAwNiAgICBjNC4zMzQsMCw4Ljk1My0wLjU1Nyw4Ljk1My0zLjAwNmMwLTAuNDgyLDAtMC4xODgsMC0wLjY3NEMxNy45NTksMTkuOTE1LDE0Ljc1MSwxOC4xMDksMTEuODk2LDE3LjE1eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgoJPGc+CgkJPHBhdGggZD0iTTIwLjI1OSwxMi42NTFjLTAuMTIyLTAuMDQxLTAuODk2LTAuMjMtMC40MTMtMS43MjNIMTkuODRjMS4yNi0xLjMxNiwyLjEyOS0zLjQzOCwyLjEyOS01LjUyMyAgICBjMC0zLjIwOS0yLjAxLTQuODkxLTQuNDUyLTQuODkxYy0xLjc5OCwwLTMuMzQ3LDAuOTE4LTQuMDQyLDIuNjc4YzEuNDU5LDEuMjA1LDIuNDYzLDMuMDgxLDIuNDYzLDUuNjA3ICAgIGMwLDIuNjk3LTEuMjY0LDUuMTU4LTIuNTg2LDYuNzQ2YzIuMTA2LDAuNzk3LDUuMzk3LDIuNCw2LjMzOSw0Ljg1YzMuMzE4LTAuMTg0LDYuMjY5LTAuODczLDYuMjY5LTIuNzcxYzAtMC40NTMsMC0wLjE3NywwLTAuNjMzICAgIEMyNS45NTksMTUuMjUxLDIyLjk0MywxMy41NTIsMjAuMjU5LDEyLjY1MXoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"/>
                                </li>

                            </ul>
                        </div>
                    </nav>
                    <ChatRoom/>
                </div>
            </div>
        );
    }
}

export default Slidebar;
