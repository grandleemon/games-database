import React, {FC, useState} from 'react';
import parse from "html-react-parser";

interface IProps {
    game: undefined | {
        description: string
        description_raw: string
    }
}

const GameAbout: FC<IProps> = ({game}) => {
    const [showAbout, setShowAbout] = useState<boolean>(false)

    return (
        <>
            {(game?.description && game?.description?.length >= 612 && !showAbout)
                ? <>
                    {game?.description_raw?.substring(0, 612) + "..." + " "}
                    <span onClick={() => setShowAbout(true)}>Read more</span>
                </>
                : game?.description && <>
                {parse(game?.description)}
                <span onClick={() => setShowAbout(false)}>Show less</span>
            </>}
        </>
    );
};

export default GameAbout;