import {FC} from 'react';
import SidebarMenuItem from "./SidebarMenuItem";
import styles from "./Sidebar.module.scss"

type ListItem = {
    link: string
    title: string
}

export interface IMenu {
    link?: string
    title: string
    list?: ListItem[]
}

const menu: IMenu[] = [
    {
        link: '/',
        title: "Home"
    },
    {
        link: "/reviews",
        title: "Reviews"
    },
    {
        link: "/profile",
        title: "My Profile",
        list: [
            {
                link: "/wishlist",
                title: "Wishlist"
            },
            {
                link: "my-library",
                title: "My library"
            },
            {
                link: "/friends",
                title: "People you follow"
            }
        ]
    },
    {
        title: "New Releases",
        list: [
            {
                link: "/last-30-days",
                title: "Last 30 days"
            },
            {
                link: "/this-week",
                title: "This week"
            },
            {
                link: "/next-week",
                title: "Next week"
            },
            {
                link: "/video-game-releases",
                title: "Release calendar"
            }
        ]
    },
    {
        title: "Top",
        list: [
            {
                link: "/best-of-year",
                title: "Best of year"
            },
            {
                link: "/popular-in-2021",
                title: "Popular in 2021"
            },
            {
                link: "/all-time-top",
                title: "All time top 250"
            }
        ]
    },
    {
        link: "/games",
        title: "All Games"
    },
    {
        link: "/games/browse",
        title: "Browse",
        list: [
            {
                link: "/games/platforms",
                title: "Platforms"
            },
            {
                link: "/games/stores",
                title: "Stores"
            },
            {
                link: "/games/collections",
                title: "Collections"
            },
            {
                link: "/games/reviews",
                title: "Reviews"
            },
            {
                link: "/games/genres",
                title: "Genres"
            },
            {
                link: "/games/creators",
                title: "Creators"
            },
            {
                link: "/games/tags",
                title: "Tags"
            },
            {
                link: "/games/developers",
                title: "Developers"
            },
            {
                link: "/games/publishers",
                title: "Publishers"
            },
        ]
    },
    {
        link: "/platforms",
        title: "Platforms",
        list: [
            {
                link: "/games/pc",
                title: "PC"
            },
            {
                link: "/games/playstation4",
                title: "PlayStation 4"
            },
            {
                link: "/games/xboxone",
                title: "Xbox One"
            },
            {
                link: "/games/nintendo-switch",
                title: "Nintendo Switch"
            },
            {
                link: "/games/ios",
                title: "iOS"
            },
            {
                link: "/games/android",
                title: "Android"
            },
        ]
    },
    {
        link: "/genres",
        title: "Genres",
        list: [
            {
                link: "/games/action",
                title: "Action"
            },
            {
                link: "/games/strategy",
                title: "Strategy"
            },
            {
                link: "/games/rpg",
                title: "RPG"
            },
            {
                link: "/games/shooter",
                title: "Shooter"
            },
            {
                link: "/games/adventure",
                title: "Adventure"
            },
            {
                link: "/games/puzzle",
                title: "Puzzle"
            },
            {
                link: "/games/racing",
                title: "Racing"
            },
            {
                link: "/games/sports",
                title: "Sports"
            },
        ]
    },
]

const Sidebar: FC = () => {

    return (
        <div className={styles.sidebarWrapper}>
            <aside>
                <nav>
                    {menu.map((item, index) => (
                        <SidebarMenuItem key={index} title={item.title} link={item.link} list={item.list}/>
                    ))}
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;