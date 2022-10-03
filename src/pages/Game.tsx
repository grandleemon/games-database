import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {gameApi} from './../api/index'
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";

const Game = () => {
    const { id } = useParams()
    const [currentGame, setCurrentGame] = useState()

    useEffect(() => {
        id && gameApi.getGameDetails(id)
    }, [])

    return (
        <>
            <Breadcrumbs currentPage={'test'}></Breadcrumbs>
            {id}
        </>
    );
};

export default Game;