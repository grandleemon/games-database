import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { gameApi } from './../../../api'
import { IGame, IScreenshot } from '../../../models/api/game'
import { IGameCard } from '../../../models/gamecard'

interface IState {
	games: IGameCard[]
	initialLoading: boolean
	loadingMore: boolean
	page: number
	currentGame: {
		details: IGame | null
		screenshots: IScreenshot[]
		loading: boolean
	}
}

const initialState: IState = {
	games: [],
	initialLoading: false,
	loadingMore: false,
	page: 2,
	currentGame: {
		details: null,
		screenshots: [],
		loading: false
	}
}

export const gamesSlice = createSlice({
	name: 'gamesReducer',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getGamesThunk.fulfilled, (state, action) => {
			if (action.payload) {
				state.games = action?.payload
				state.initialLoading = false
			}
		})
		builder.addCase(getGamesThunk.pending, (state, action) => {
			state.initialLoading = true
		})
		builder.addCase(fetchMoreGamesThunk.fulfilled, (state, action) => {
			if (action.payload) {
				state.page += 1
				state.games = [...state.games, ...action.payload]
				state.loadingMore = false
			}
		})
		builder.addCase(fetchMoreGamesThunk.pending, (state, action) => {
			state.loadingMore = true
		})
		builder.addCase(getGameDetailsThunk.fulfilled, (state, action) => {
			const { game, screenshots } = action.payload
			if (game) state.currentGame.details = { ...game }
			if (screenshots) state.currentGame.screenshots = [...screenshots]
			state.currentGame.loading = false
		})
		builder.addCase(getGameDetailsThunk.pending, (state, action) => {
			state.currentGame.loading = true
		})
	}
})

export const getGamesThunk = createAsyncThunk('games', async () => {
	const response = await gameApi.getGames()
	return response.data?.results
})

export const fetchMoreGamesThunk = createAsyncThunk(
	'fetch more games',
	async (page: number) => {
		const response = await gameApi.getGames(40, page)
		return response.data?.results
	}
)

export const getGameDetailsThunk = createAsyncThunk(
	'game details',
	async (id: string) => {
		const response = await gameApi.getGameDetails(id)
		const screenshots = await gameApi.getGameScreenshots(id)
		return {
			game: response.data,
			screenshots: screenshots.data?.results
		}
	}
)

export const {} = gamesSlice.actions

export default gamesSlice
