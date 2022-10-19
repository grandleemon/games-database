import api from "../interceptor";
import {ApiResponse} from "../../models/api";
import {IGame, IScreenshot} from "../../models/api/game";
import {IGameCard} from "../../models/gamecard";

const API_KEY = import.meta.env.VITE_API_KEY

export const getGames = (pageSize: number = 40, page: number = 1): ApiResponse<{count: number, results: IGameCard[]}> => {
    return api.get<{count: number, results: IGameCard[]}>(`games?key=${API_KEY}&page=${page}&page_size=${pageSize}`)
        .then(({ data }) => ({data}))
        .catch(error => ({error}))
}

export const getGameDetails = (id: string): ApiResponse<IGame> => {
    return api.get<IGame>(`games/${id}?key=${API_KEY}`)
        .then(({ data }) => ({data}))
        .catch(error => ({error}))
}

export const getGameScreenshots = (id: string): ApiResponse<{results: IScreenshot[]}> => {
    return api.get<{ results: IScreenshot[] }>(`games/${id}/screenshots?key=${API_KEY}`)
        .then(({ data }) => ({data}))
        .catch(error => ({error}))
}