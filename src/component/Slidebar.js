import React, {Component} from 'react';
import Chat from '../page/Chat'
import './Slidebar.css'
import {
    Switch,
    Route,
    Link
} from 'react-router-dom'

class Slidebar extends Component {
    render() {
        return (
            <div className="container-fluid fill">
                <div className="row fill">
                    <nav className="col-md-1 d-none d-md-block bg-dark sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item text-center image">
                                    <img alt="chat"
                                         src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQzNy4yMTIgNDM3LjIxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDM3LjIxMiA0MzcuMjEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPGc+CgkJCTxwYXRoIGQ9Ik00MDQuODEyLDQxLjIwNmgtMzAwYy0xOCwwLTMyLjQsMTQuOC0zMi40LDMyLjR2MTg2LjRjMCwxOCwxNC44LDMyLjQsMzIuNCwzMi40aDIwNi44bDQ2LjgsNDcuMmMyLDIsNC40LDMuMiw3LjIsMy4yICAgICBjNS42LDAsMTAuNC00LjQsMTAuNC0xMC40di00MGgyOC44YzE4LDAsMzIuNC0xNC44LDMyLjQtMzIuNHYtMTg2LjRDNDM3LjIxMiw1NS42MDYsNDIyLjQxMiw0MS4yMDYsNDA0LjgxMiw0MS4yMDZ6ICAgICAgTTE1MC44MTIsMjAxLjYwNmMtMTYuNCwwLTMwLTEzLjYtMzAtMzBjMC0xNi40LDEzLjYtMzAsMzAtMzBjMTYuNCwwLDMwLDEzLjYsMzAsMzAgICAgIEMxODAuODEyLDE4OC4wMDYsMTY3LjYxMiwyMDEuNjA2LDE1MC44MTIsMjAxLjYwNnogTTI1Ni4wMTIsMjAxLjYwNmMtMTYuNCwwLTMwLTEzLjYtMzAtMzBjMC0xNi40LDEzLjYtMzAsMzAtMzAgICAgIGMxNi40LDAsMzAsMTMuNiwzMCwzMEMyODYuMDEyLDE4OC4wMDYsMjcyLjQxMiwyMDEuNjA2LDI1Ni4wMTIsMjAxLjYwNnogTTM2MC44MTIsMjAxLjYwNmMtMTYuNCwwLTMwLTEzLjYtMzAtMzAgICAgIGMwLTE2LjQsMTMuNi0zMCwzMC0zMGMxNi40LDAsMzAsMTMuNiwzMCwzMEMzOTAuODEyLDE4OC4wMDYsMzc3LjIxMiwyMDEuNjA2LDM2MC44MTIsMjAxLjYwNnoiIGZpbGw9IiNGRkZGRkYiLz4KCQkJPHBhdGggZD0iTTU0LjAxMiwyNjAuODA2di02My42aC0zMi44Yy0xMS42LDAtMjEuMiw5LjYtMjEuMiwyMS4ydjEyMi40Yy0wLjQsMTIuNCw5LjIsMjIsMjEuMiwyMmgxOC44djI2LjQgICAgIGMwLDMuNiwzLjIsNi44LDYuOCw2LjhjMiwwLDMuNi0wLjgsNC44LTJsMzAuOC0zMC44aDEzNmMxMS42LDAsMjEuMi05LjYsMjEuMi0yMS4ydi0zMC40aC0xMzQuOCAgICAgQzc2LjgxMiwzMTEuNjA2LDU0LjAxMiwyODguODA2LDU0LjAxMiwyNjAuODA2eiIgZmlsbD0iI0ZGRkZGRiIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"/>
                                </li>
                                <li className="nav-item text-center image">
                                    <img alt="friend"
                                         src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI1Ljk2IDI1Ljk2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNS45NiAyNS45NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTExLjg5NiwxNy4xNWMtMC4xMzEtMC4wNDMtMC45NTMtMC44ODctMC40MzktMi40NzRIMTEuNDVjMS4zNC0xLjQwMSwyLjQ4Ny0zLjY1NSwyLjQ4Ny01Ljg3NiAgICBjMC0zLjQxMi0yLjM1OS01LjIwMS00Ljk1Ny01LjIwMWMtMi42LDAtNC44NTUsMS43ODktNC44NTUsNS4yMDFjMCwyLjIyOSwxLjA1MSw0LjQ5MiwyLjM5OCw1Ljg5MiAgICBjMC41MjUsMS4zOTgtMC40MTQsMi4zODQtMC42MTEsMi40NThDMy4xOTIsMTguMTQ4LDAsMTkuOTcsMCwyMS43NjdjMCwwLjQ4NSwwLDAuMTkxLDAsMC42NzRjMCwyLjQ0OSw0LjY3NywzLjAwNiw5LjAwNiwzLjAwNiAgICBjNC4zMzQsMCw4Ljk1My0wLjU1Nyw4Ljk1My0zLjAwNmMwLTAuNDgyLDAtMC4xODgsMC0wLjY3NEMxNy45NTksMTkuOTE1LDE0Ljc1MSwxOC4xMDksMTEuODk2LDE3LjE1eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgoJPGc+CgkJPHBhdGggZD0iTTIwLjI1OSwxMi42NTFjLTAuMTIyLTAuMDQxLTAuODk2LTAuMjMtMC40MTMtMS43MjNIMTkuODRjMS4yNi0xLjMxNiwyLjEyOS0zLjQzOCwyLjEyOS01LjUyMyAgICBjMC0zLjIwOS0yLjAxLTQuODkxLTQuNDUyLTQuODkxYy0xLjc5OCwwLTMuMzQ3LDAuOTE4LTQuMDQyLDIuNjc4YzEuNDU5LDEuMjA1LDIuNDYzLDMuMDgxLDIuNDYzLDUuNjA3ICAgIGMwLDIuNjk3LTEuMjY0LDUuMTU4LTIuNTg2LDYuNzQ2YzIuMTA2LDAuNzk3LDUuMzk3LDIuNCw2LjMzOSw0Ljg1YzMuMzE4LTAuMTg0LDYuMjY5LTAuODczLDYuMjY5LTIuNzcxYzAtMC40NTMsMC0wLjE3NywwLTAuNjMzICAgIEMyNS45NTksMTUuMjUxLDIyLjk0MywxMy41NTIsMjAuMjU5LDEyLjY1MXoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"/>
                                </li>
                                <li className="nav-item text-center image">
                                    <img alt="setting"
                                         src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3OC43MDMgNDc4LjcwMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc4LjcwMyA0NzguNzAzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ1NC4yLDE4OS4xMDFsLTMzLjYtNS43Yy0zLjUtMTEuMy04LTIyLjItMTMuNS0zMi42bDE5LjgtMjcuN2M4LjQtMTEuOCw3LjEtMjcuOS0zLjItMzguMWwtMjkuOC0yOS44ICAgIGMtNS42LTUuNi0xMy04LjctMjAuOS04LjdjLTYuMiwwLTEyLjEsMS45LTE3LjEsNS41bC0yNy44LDE5LjhjLTEwLjgtNS43LTIyLjEtMTAuNC0zMy44LTEzLjlsLTUuNi0zMy4yICAgIGMtMi40LTE0LjMtMTQuNy0yNC43LTI5LjItMjQuN2gtNDIuMWMtMTQuNSwwLTI2LjgsMTAuNC0yOS4yLDI0LjdsLTUuOCwzNGMtMTEuMiwzLjUtMjIuMSw4LjEtMzIuNSwxMy43bC0yNy41LTE5LjggICAgYy01LTMuNi0xMS01LjUtMTcuMi01LjVjLTcuOSwwLTE1LjQsMy4xLTIwLjksOC43bC0yOS45LDI5LjhjLTEwLjIsMTAuMi0xMS42LDI2LjMtMy4yLDM4LjFsMjAsMjguMSAgICBjLTUuNSwxMC41LTkuOSwyMS40LTEzLjMsMzIuN2wtMzMuMiw1LjZjLTE0LjMsMi40LTI0LjcsMTQuNy0yNC43LDI5LjJ2NDIuMWMwLDE0LjUsMTAuNCwyNi44LDI0LjcsMjkuMmwzNCw1LjggICAgYzMuNSwxMS4yLDguMSwyMi4xLDEzLjcsMzIuNWwtMTkuNywyNy40Yy04LjQsMTEuOC03LjEsMjcuOSwzLjIsMzguMWwyOS44LDI5LjhjNS42LDUuNiwxMyw4LjcsMjAuOSw4LjdjNi4yLDAsMTIuMS0xLjksMTcuMS01LjUgICAgbDI4LjEtMjBjMTAuMSw1LjMsMjAuNyw5LjYsMzEuNiwxM2w1LjYsMzMuNmMyLjQsMTQuMywxNC43LDI0LjcsMjkuMiwyNC43aDQyLjJjMTQuNSwwLDI2LjgtMTAuNCwyOS4yLTI0LjdsNS43LTMzLjYgICAgYzExLjMtMy41LDIyLjItOCwzMi42LTEzLjVsMjcuNywxOS44YzUsMy42LDExLDUuNSwxNy4yLDUuNWwwLDBjNy45LDAsMTUuMy0zLjEsMjAuOS04LjdsMjkuOC0yOS44YzEwLjItMTAuMiwxMS42LTI2LjMsMy4yLTM4LjEgICAgbC0xOS44LTI3LjhjNS41LTEwLjUsMTAuMS0yMS40LDEzLjUtMzIuNmwzMy42LTUuNmMxNC4zLTIuNCwyNC43LTE0LjcsMjQuNy0yOS4ydi00Mi4xICAgIEM0NzguOSwyMDMuODAxLDQ2OC41LDE5MS41MDEsNDU0LjIsMTg5LjEwMXogTTQ1MS45LDI2MC40MDFjMCwxLjMtMC45LDIuNC0yLjIsMi42bC00Miw3Yy01LjMsMC45LTkuNSw0LjgtMTAuOCw5LjkgICAgYy0zLjgsMTQuNy05LjYsMjguOC0xNy40LDQxLjljLTIuNyw0LjYtMi41LDEwLjMsMC42LDE0LjdsMjQuNywzNC44YzAuNywxLDAuNiwyLjUtMC4zLDMuNGwtMjkuOCwyOS44Yy0wLjcsMC43LTEuNCwwLjgtMS45LDAuOCAgICBjLTAuNiwwLTEuMS0wLjItMS41LTAuNWwtMzQuNy0yNC43Yy00LjMtMy4xLTEwLjEtMy4zLTE0LjctMC42Yy0xMy4xLDcuOC0yNy4yLDEzLjYtNDEuOSwxNy40Yy01LjIsMS4zLTkuMSw1LjYtOS45LDEwLjhsLTcuMSw0MiAgICBjLTAuMiwxLjMtMS4zLDIuMi0yLjYsMi4yaC00Mi4xYy0xLjMsMC0yLjQtMC45LTIuNi0yLjJsLTctNDJjLTAuOS01LjMtNC44LTkuNS05LjktMTAuOGMtMTQuMy0zLjctMjguMS05LjQtNDEtMTYuOCAgICBjLTIuMS0xLjItNC41LTEuOC02LjgtMS44Yy0yLjcsMC01LjUsMC44LTcuOCwyLjVsLTM1LDI0LjljLTAuNSwwLjMtMSwwLjUtMS41LDAuNWMtMC40LDAtMS4yLTAuMS0xLjktMC44bC0yOS44LTI5LjggICAgYy0wLjktMC45LTEtMi4zLTAuMy0zLjRsMjQuNi0zNC41YzMuMS00LjQsMy4zLTEwLjIsMC42LTE0LjhjLTcuOC0xMy0xMy44LTI3LjEtMTcuNi00MS44Yy0xLjQtNS4xLTUuNi05LTEwLjgtOS45bC00Mi4zLTcuMiAgICBjLTEuMy0wLjItMi4yLTEuMy0yLjItMi42di00Mi4xYzAtMS4zLDAuOS0yLjQsMi4yLTIuNmw0MS43LTdjNS4zLTAuOSw5LjYtNC44LDEwLjktMTBjMy43LTE0LjcsOS40LTI4LjksMTcuMS00MiAgICBjMi43LTQuNiwyLjQtMTAuMy0wLjctMTQuNmwtMjQuOS0zNWMtMC43LTEtMC42LTIuNSwwLjMtMy40bDI5LjgtMjkuOGMwLjctMC43LDEuNC0wLjgsMS45LTAuOGMwLjYsMCwxLjEsMC4yLDEuNSwwLjVsMzQuNSwyNC42ICAgIGM0LjQsMy4xLDEwLjIsMy4zLDE0LjgsMC42YzEzLTcuOCwyNy4xLTEzLjgsNDEuOC0xNy42YzUuMS0xLjQsOS01LjYsOS45LTEwLjhsNy4yLTQyLjNjMC4yLTEuMywxLjMtMi4yLDIuNi0yLjJoNDIuMSAgICBjMS4zLDAsMi40LDAuOSwyLjYsMi4ybDcsNDEuN2MwLjksNS4zLDQuOCw5LjYsMTAsMTAuOWMxNS4xLDMuOCwyOS41LDkuNyw0Mi45LDE3LjZjNC42LDIuNywxMC4zLDIuNSwxNC43LTAuNmwzNC41LTI0LjggICAgYzAuNS0wLjMsMS0wLjUsMS41LTAuNWMwLjQsMCwxLjIsMC4xLDEuOSwwLjhsMjkuOCwyOS44YzAuOSwwLjksMSwyLjMsMC4zLDMuNGwtMjQuNywzNC43Yy0zLjEsNC4zLTMuMywxMC4xLTAuNiwxNC43ICAgIGM3LjgsMTMuMSwxMy42LDI3LjIsMTcuNCw0MS45YzEuMyw1LjIsNS42LDkuMSwxMC44LDkuOWw0Miw3LjFjMS4zLDAuMiwyLjIsMS4zLDIuMiwyLjZ2NDIuMUg0NTEuOXoiIGZpbGw9IiNGRkZGRkYiLz4KCQk8cGF0aCBkPSJNMjM5LjQsMTM2LjAwMWMtNTcsMC0xMDMuMyw0Ni4zLTEwMy4zLDEwMy4zczQ2LjMsMTAzLjMsMTAzLjMsMTAzLjNzMTAzLjMtNDYuMywxMDMuMy0xMDMuM1MyOTYuNCwxMzYuMDAxLDIzOS40LDEzNi4wMDEgICAgeiBNMjM5LjQsMzE1LjYwMWMtNDIuMSwwLTc2LjMtMzQuMi03Ni4zLTc2LjNzMzQuMi03Ni4zLDc2LjMtNzYuM3M3Ni4zLDM0LjIsNzYuMyw3Ni4zUzI4MS41LDMxNS42MDEsMjM5LjQsMzE1LjYwMXoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"/>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Switch>
                        <Route path='/' component={Chat}/>
                        <Route path='/friend' component={Chat}/>
                        <Route path='/setting' component={Chat}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

//TODO

export default Slidebar;
