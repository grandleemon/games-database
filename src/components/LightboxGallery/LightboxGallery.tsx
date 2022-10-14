import React, {Dispatch, FC, SetStateAction} from 'react';
import Lightbox from "react-image-lightbox";

interface IProps {
    screenshots: {image: string}[]
    currentIndex: number
    setCurrentIndex: Dispatch<SetStateAction<number>>
    closeLightbox: Dispatch<SetStateAction<boolean>>
}

const LightboxGallery: FC<IProps> = ({screenshots, currentIndex, setCurrentIndex, closeLightbox}: IProps) => {

    const moveToNextSlide = () => {
        if(currentIndex + 1 === screenshots.length ){
            setCurrentIndex(0)
        } else {
            setCurrentIndex(prev => prev + 1)
        }
    }

    const moveToPrevSlide = () => {
        if(currentIndex === 0){
            setCurrentIndex(screenshots.length - 1)
        } else {
            setCurrentIndex(prev => prev - 1)
        }
    }

    return (
            <Lightbox
                mainSrc={screenshots[currentIndex]?.image}
                onCloseRequest={() => closeLightbox(false)}
                nextSrc={screenshots[(currentIndex + 1) % screenshots.length].image}
                prevSrc={screenshots[(currentIndex + screenshots.length - 1) % screenshots.length].image}
                onMoveNextRequest={moveToNextSlide}
                onMovePrevRequest={moveToPrevSlide}
                imagePadding={50}
            />
    );
};

export default LightboxGallery;