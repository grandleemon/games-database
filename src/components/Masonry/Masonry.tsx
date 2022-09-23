import { memo, useMemo } from "react"
import {IGame} from "../GameCard/GameCard";

const divideArray = (array: [], length: number) => {
    const newArray = [...array]
    const divideRes = Math.floor(newArray.length/length)
    let results = []

    for (let i = 0; i < length; i++) {
        results.push(newArray.splice(0, divideRes))
    }

    for (let i = 0; i < newArray.length; i++) {
        results[i].push(newArray[i])
    }

    console.log(results)

    results = results.filter(itm => itm.length)

    return results
}

const masonryContainerStyle = {
    display: 'flex',
    justifyContent: 'center'
}

const masonryColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
}

export const Masonry = ({ dataArray, columnCount, ChildsElement }) => {
    return useMemo(() => {
        const arr = divideArray(dataArray, columnCount)

        return (
            <div style={masonryContainerStyle}>
                {
                    arr?.map((itm, i) => (
                        <div key={i} style={masonryColumnStyle}>
                            {
                                itm?.map((elm: IGame, i) => <ChildsElement key={elm.id}
                                                                    added={elm.added}
                                                                    name={elm.name}
                                                                    background_image={elm.background_image}
                                                                    metacritic={elm.metacritic}
                                                                    platforms={elm.platforms} />)
                            }
                        </div>
                    ))
                }
            </div>
        )
    }, [dataArray, columnCount])
}

export default memo(Masonry)