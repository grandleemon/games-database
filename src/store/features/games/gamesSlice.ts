import { createSlice } from "@reduxjs/toolkit";

interface IState {
    games: number | null
}

const initialState: IState = {
    games: null
}

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setCount: (state, action) => {
            state.games = action.payload
        }
    }
})

export const {setCount} = gamesSlice.actions

export default gamesSlice;