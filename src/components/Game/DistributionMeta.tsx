import React, {Dispatch, FC, SetStateAction} from 'react';
import styles from "./Game.module.scss";

export interface IRatingItem {
    id: number
    title: string
    count: number
}

interface IDistributionProps {
    ratings: IRatingItem[]
    hoveredMeta: string
    setHoveredMeta: Dispatch<SetStateAction<string>>
}

const DistributionMeta: FC<IDistributionProps> = ({ratings, hoveredMeta, setHoveredMeta}) => {
    return (
        <>
            {ratings.map((item) => (
                <div key={item.id}
                     className={`${styles.distributionMetaItem} ${hoveredMeta === item.title ? styles.distributionItemHovered : ""}`}
                     onMouseEnter={() => setHoveredMeta(item.title)}
                     onMouseLeave={() => setHoveredMeta("")}>
                    <div className={`distribution__meta-icon ${item.title}-icon`}></div>
                    <div className={styles.distributionMetaTitle}>{item.title}</div>
                    <div className={styles.distributionMetaCount}>{item.count}</div>
                </div>
            ))}
        </>
    );
};

export default DistributionMeta;