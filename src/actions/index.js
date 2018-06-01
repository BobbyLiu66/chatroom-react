import {INPUTSTATE,SETPICTURE,SLIDEBAR,ADDFRIEND,LOADING} from '../constants/auction_type'

export const inputState = input => ({type: INPUTSTATE, payload: input});
export const setPicture = url => ({type: SETPICTURE, payload: url});
export const setMainArea = context => ({type: SLIDEBAR, payload: context});
export const addFriend = input => ({type: ADDFRIEND, payload: input});
export const setLoading = input => ({type: LOADING, payload: input});