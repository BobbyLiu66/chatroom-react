import {INPUTSTATE, ADDFRIEND, SLIDEBAR, LOADING, FRIENDAVATAR, USERAVATAR} from "../constants/auction_type";

const initialState = {
    inputPage: true,
    currentStatus: 'LOGIN',
    picture: '',
    mainAreaDisplayed: '',
    loading: true,
    avatarFriend: '',
    avatarUser: ''
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case INPUTSTATE:
            return {
                ...state,
                inputPage: action.payload,
                currentStatus: 'LOGIN'
            };
        case ADDFRIEND:
            return {
                ...state,
                inputPage: action.payload,
                currentStatus: 'FRIEND'
            };
        case SLIDEBAR:
            return {
                ...state,
                mainAreaDisplayed: action.payload
            };
        case LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case FRIENDAVATAR:
            return {
                ...state,
                avatarFriend: action.payload
            };
        case USERAVATAR:
            return {
                ...state,
                avatarUser: action.payload
            };
        default:
            return state
    }
};

export default rootReducer