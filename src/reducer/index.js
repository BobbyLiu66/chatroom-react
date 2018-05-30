import {INPUTSTATE, ADDFRIEND, SETPICTURE} from "../constants/auction_type";


const initialState = {
    inputPage: true,
    currentStatus: 'LOGIN',
    picture: ''
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case INPUTSTATE:
            return Object.assign({
                inputPage: !state.inputPage
            });
        case ADDFRIEND:
            return Object.assign({
                inputPage: !state.inputPage,
                currentStatus: 'FRIEND'
            });
        case SETPICTURE:
            return Object.assign({
                picture: action.payload
            });
        default:
            return state
    }
};

export default rootReducer