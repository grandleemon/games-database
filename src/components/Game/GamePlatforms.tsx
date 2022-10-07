import React, {FC} from 'react';
import {ImWindows8} from "react-icons/im";
import {IoLogoPlaystation} from "react-icons/io";
import {FaXbox} from "react-icons/fa";

interface IProps {
    game: undefined | {
        parent_platforms: {platform: {slug: string}}[]
    }
}

const GamePlatforms: FC<IProps> = ({game}) => {
    return (
        <>
            {game?.parent_platforms?.map((item, idx) => (
                <span key={idx}>
                    {item.platform.slug.includes("pc") && <ImWindows8 />}
                    {item.platform.slug.includes('playstation')
                        && <IoLogoPlaystation />}
                    {item.platform.slug.includes("xbox") && <FaXbox />}
                </span>
            ))}
        </>
    );
};

export default GamePlatforms;