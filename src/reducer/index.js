import {INPUTSTATE, ADDFRIEND, SETPICTURE, SLIDEBAR, LOADING} from "../constants/auction_type";

const initialState = {
    inputPage: true,
    currentStatus: 'LOGIN',
    picture: '',
    mainAreaDisplayed: '',
    loading: true
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case INPUTSTATE:
            return Object.assign({
                inputPage: action.payload,
                currentStatus: 'LOGIN'
            });
        case ADDFRIEND:
            return Object.assign({
                inputPage: action.payload,
                currentStatus: 'FRIEND'
            });
        case SETPICTURE:
            return Object.assign({
                picture: action.payload
            });
        case SLIDEBAR:
            return Object.assign({
                mainAreaDisplayed: action.payload
            });
        case LOADING:
            return Object.assign({
                loading: action.payload
            });
        default:
            return state
    }
};

export default rootReducer