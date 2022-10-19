type ListItem = {
    link: string
    title: string
}

export type IMenu = {
    link?: string
    title: string
    list?: ListItem[]
}