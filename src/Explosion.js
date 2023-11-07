import React, {useState} from "react";
import explosionImage from './media/explosion_80.png';
import GameFieldImage, { getRandomXYPositions } from './GameFieldImage';

function isHit(targetPos, explosionPos, hitDistance = 10) {
    function calcDistance(targetPos, explosionPos) {
        const x1 = targetPos.posX;
        const x2 = explosionPos.posX;
        const y1 = targetPos.posY;
        const y2 = explosionPos.posY;
        console.log("targetPos");
        console.log(targetPos);
        console.log("explosionPos");
        console.log(explosionPos);
        console.log(x2 - x1);
        console.log(y2 - y1);
        console.log(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    }

    console.log("Distance: " + calcDistance(targetPos, explosionPos))
    console.log("isHit: " + calcDistance(targetPos, explosionPos) < hitDistance)

    return calcDistance(targetPos, explosionPos) < hitDistance;
}

export function Explosion({ targetPos, adjustments }) {
    const [explosionPos, setExplosionPos] = useState(getRandomXYPositions(5, 95, 0, 60))

    // console.log(explosionPos)

    const info = {
        imageSrc: explosionImage,
        className: "explosion",
        isClickable: false,
        additionalClasses: isHit(targetPos, explosionPos) ? '' : ' greyed'
    };
    // console.log('expl');

    return (
        <GameFieldImage
            positionProps={{
                pos: explosionPos,
                setPos: setExplosionPos
            }}
            info={info}
            explosion={true}
        />
    );
}

export function ExplosionList({ explosionList }) {
    console.log(explosionList);

    if (explosionList) {
        return (
            <div className="explosion-area">
                {explosionList.map((expl) => (expl))}
            </div>
        );
    }
    return (
        <div className="explosion-area"></div>
    );
}
