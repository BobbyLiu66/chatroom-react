import {INPUTSTATE, ADDFRIEND, SETPICTURE,SLIDEBAR} from "../constants/auction_type";


const initialState = {
    inputPage: true,
    currentStatus: 'LOGIN',
    picture: '',
    mainAreaDisplayed:''
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case INPUTSTATE:
            return Object.assign({
                inputPage: action.payload,
                currentStatus:'LOGIN'
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
        default:
            return state
    }
};

export default rootReducer