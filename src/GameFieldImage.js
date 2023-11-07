import React from "react";
import targetImage from './media/soldier.png'
import referenceImage from './media/bmp.png'

function randomNumberInRange (min, max) {
    return Math.floor(Math.random()
        * (max - min + 1)) + min;
}

export function getRandomXYPositions(xMin, xMax, yMin, yMax) {
    return {
        posX: randomNumberInRange(xMin, xMax),
        posY: randomNumberInRange(yMin, yMax)
    };
}

export default function GameFieldImage({positionProps, info, explosion = false}) {
    const position = positionProps.pos;

    function handleClick () {
        console.log('clicked!');
        if (info.isClickable) {
            const newPos = getRandomXYPositions(5, 95, 0, 60);
            positionProps.setPos(newPos);
        }
    }

    return (
        <img
            src={info.imageSrc}
            className={"game-field-image " + info.className + info.additionalClasses}
            style={{left: position.posX + '%', top: position.posY + '%'}}
            onClick={() => handleClick()}
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