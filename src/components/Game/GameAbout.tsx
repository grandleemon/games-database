import React, {FC, useState} from 'react';
import parse from "html-react-parser";

interface IProps {
    description: string
    description_raw: string
}

const GameAbout: FC<IProps> = ({description, description_raw}) => {
    const [showAbout, setShowAbout] = useState<boolean>(false)

    const condition = description && description?.length >= 612 && !showAbout

    return (
        <>
            {condition
                ? <>
                    {description_raw.substring(0, 612) + "..." + " "}
                    <span onClick={() => setShowAbout(true)}>Read more</span>
                </>
                : <>
                {parse(description)}
                <span onClick={() => setShowAbout(false)}>Show less</span>
            </>}
        </>
    );
};

export default GameAbout;