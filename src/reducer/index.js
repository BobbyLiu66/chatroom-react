import {INPUTSTATE, ADDFRIEND,GETUSERCOLOR} from "../constants/auction_type";

const COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
];

const initialState = {
    inputPage: true,
    currentStatus: 'LOGIN',
    getUserColor: (username) => {
        let hash = 7;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        let index = Math.abs(hash % COLORS.length);
        return COLORS[index];
    }
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