import {INPUTSTATE} from '../constants/auction_type'
import {SETPICTURE} from '../constants/auction_type'

export const inputState = input => ({type: INPUTSTATE, payload: input});
export const setPicture = url => ({type: SETPICTURE, payload: url});