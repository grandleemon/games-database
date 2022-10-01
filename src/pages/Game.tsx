import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {gameApi} from './../api/index'

const Game = () => {
    const { id } = useParams()

    useEffect(() => {
        id && gameApi.getGameDetails(id)
    }, [])

    return (
        <>
            {id}
        </>
    );
};

export default Game;