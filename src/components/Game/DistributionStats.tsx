import React, {Dispatch, FC, memo, SetStateAction, useEffect, useRef} from 'react';
import styles from "./Game.module.scss";

interface IProps {
    game: undefined | {
        ratings: {id: number, title: string, count: number, percent: number}[]
    }
    hoveredMeta: string
    setHoveredMeta: Dispatch<SetStateAction<string>>
}

const DistributionStats: FC<IProps> = memo(({game, setHoveredMeta, hoveredMeta}) => {
    const statsRef = useRef<HTMLDivElement>(null)

    return (
        <div className={styles.ratingDistributionStats} ref={statsRef}>
            {game?.ratings?.map((item, idx) => (
                <div key={item.id}
                     className={`${item.title} ${hoveredMeta === item.title ? "statsItemHovered" : ""}`}
                     style={{width: item.percent + "%"}}
                     onMouseEnter={() => setHoveredMeta(item.title)}
                     onMouseLeave={() => setHoveredMeta("")}></div>
            ))}
        </div>
    );
});

export default DistributionStats;