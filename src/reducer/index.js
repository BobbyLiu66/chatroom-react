import {INPUTSTATE, ADDFRIEND} from "../constants/auction_type";


const initialState = {
    inputPage: true,
    currentStatus: 'LOGIN'
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
        default:
            return state
    }
};

export default rootReducer