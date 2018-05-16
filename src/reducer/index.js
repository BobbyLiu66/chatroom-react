import {INPUTSTATE} from "../constants/login_type";

const initialState = {
    inputPage: true,
    currentStatus:'LOGIN'
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case INPUTSTATE:
            return Object.assign({
                inputPage: !state.inputPage
            });
        default:
            return state
    }
};

export default rootReducer