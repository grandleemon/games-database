import {axiosClassic} from "../interceptors";

export const getGames = (pageSize: number = 40, page: number = 1) => {
    return axiosClassic.get<any>(`games?key=${import.meta.env.VITE_API_KEY}&page=${page}&page_size=${pageSize}`)
        .then(({ data }) => ({data}))
        .catch(console.error)
}

export const getGameDetails = (id: string | undefined) => {
    return axiosClassic.get<any>(`games/${id}?key=${import.meta.env.VITE_API_KEY}`)
        .then(({ data }) => ({data}))
        .catch(console.error)
}

export const getGameScreenshots = (id: string | undefined) => {
    return axiosClassic.get<any>(`games/${id}/screenshots?key=${import.meta.env.VITE_API_KEY}`)
        .then(({ data }) => ({data}))
        .catch(console.error)
}

export const getGameMovies = (id: string | undefined) => {
    return axiosClassic.get<any>(`games/${id}/movies?key=${import.meta.env.VITE_API_KEY}`)
        .then((data) => ({data}))
        .catch(console.error)
}