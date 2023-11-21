import React from "react";
import targetImage from './media/soldier.png'
import referenceImage from './media/bmp.png'

function randomNumberInRange (min, max) {
    return Math.floor(Math.random()
        * (max - min + 1)) + min;
}

export function getRandomXYPositions(windowSize) {
    const width = windowSize.width;
    const height = windowSize.height;

    const xStart = 0;
    const yStart = 0;
    const xEnd = width * .7;
    const yEnd = height * .175;

    return {
        posX: randomNumberInRange(xStart, xEnd - 60),
        posY: randomNumberInRange(yStart, yEnd - 90)
    };
}

export default function GameFieldImage({positionProps, info}) {
    const position = positionProps.pos;

    // function handleClick () {
    //     return;
    //     console.log('clicked!');
    //     if (info.isClickable) {
    //         const newPos = GetRandomXYPositions();
    //         positionProps.setPos(newPos);
    //     }
    // }

    return (
        <img
            src={info.imageSrc}
            className={"game-field-image " + info.className + info.additionalClasses}
            style={{left: position.posX + 'px', top: position.posY + 'px'}}
            // onClick={() => handleClick()}
            alt="target"/>
    );
};

export function Target({ positionProps }) {
    const info = {
        imageSrc: targetImage,
        className: "target",
        isClickable: true,
        additionalClasses: ''
    };

    return (
        <GameFieldImage
            positionProps={positionProps}
            info={info}
        />
    );
}

export function ReferencePoint({ positionProps }) {
    const info = {
        imageSrc: referenceImage,
        className: "reference-point",
        isClickable: true,
        additionalClasses: ''
    };

    return (
        <GameFieldImage
            positionProps={positionProps}
            info={info}
        />
    );
}