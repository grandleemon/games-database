type GameRating = {
    percent: number
    title: string
    id: number
    count: number
}

export type IGame = {
    background_image: string
    name: string
    platforms: {platform:{name: string, id: number}}[]
    parent_platforms: {platform:{slug: string}}[]
    playtime: number
    description: string
    description_raw: string
    metacritic: number
    genres: {id: number, name: string}[]
    released: string
    developers: {id: number, name: string}[]
    publishers: {id: number, name: string}[]
    esrb_rating: {name: string}
    tags: {name: string, id: number}[]
    website: string
    ratings: GameRating[]
}

export type IScreenshot = {
    height: number
    id: number
    image: string
    is_deleted: boolean
    width: number
}


export interface IRatingItem {
    id: number
    title: string
    count: number
}