type Genre = {
    id: number
    name: string
}

export type IGameCard = {
    id?: number
    name: string
    background_image: string
    metacritic: number
    added: number
    platforms: []
    released: string
    genres: Genre[]
}