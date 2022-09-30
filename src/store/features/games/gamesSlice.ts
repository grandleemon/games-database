import { createSlice } from "@reduxjs/toolkit";

interface IState {
    gamesCounter: number | null,
}

const initialState: IState = {
    gamesCounter: null,
}

export const gamesSlice = createSlice({
    name: 'gamesReducer',
    initialState,
    reducers: {
        setCount: (state, action) => {
            state.gamesCounter = action.payload
        }
    }
})

export const {setCount} = gamesSlice.actions

export default gamesSlice;