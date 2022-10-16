import React, {Dispatch, FC, memo, SetStateAction, useEffect, useRef} from 'react';
import styles from "./Game.module.scss";
import {IRatingItem} from "../../models/api/game";

interface IStatsItem extends IRatingItem {
    percent: number
}

interface IProps {
    ratings: IStatsItem[]
    hoveredMeta: string
    setHoveredMeta: Dispatch<SetStateAction<string>>
}

const DistributionStats: FC<IProps> = ({ratings, setHoveredMeta, hoveredMeta}) => {
    const statsRef = useRef<HTMLDivElement>(null)

    return (
        <div className={styles.ratingDistributionStats} ref={statsRef}>
            {ratings?.map((item) => (
                <div key={item.id}
                     className={`${item.title} ${hoveredMeta === item.title ? "statsItemHovered" : ""}`}
                     style={{width: item.percent + "%"}}
                     onMouseEnter={() => setHoveredMeta(item.title)}
                     onMouseLeave={() => setHoveredMeta("")}></div>
            ))}
        </div>
    );
};

export default DistributionStats;