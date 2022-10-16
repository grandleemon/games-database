import React, {FC} from 'react';
import {ImWindows8} from "react-icons/im";
import {IoLogoPlaystation} from "react-icons/io";
import {FaXbox} from "react-icons/fa";

type IPlatformItem = {
    platform: {
        slug: string
    }
}

type IProps = {
    platforms: IPlatformItem[]

}

const GamePlatforms: FC<IProps> = ({platforms}) => (
        <>
            {platforms?.map((item, idx) => (
                <span key={idx}>
                    {item.platform.slug.includes("pc") && <ImWindows8 />}
                    {item.platform.slug.includes('playstation')
                        && <IoLogoPlaystation />}
                    {item.platform.slug.includes("xbox") && <FaXbox />}
                </span>
            ))}
        </>
    );

export default GamePlatforms;