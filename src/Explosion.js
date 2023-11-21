import React from "react";
import explosionImage from './media/explosion_80.png';
import GameFieldImage  from './GameFieldImage';

function isHit(targetPos, explosionPos, hitDistance = 50) {
    function calcDistance(targetPos, explosionPos) {
        const x1 = targetPos.posX;
        const x2 = explosionPos.posX;
        const y1 = targetPos.posY;
        const y2 = explosionPos.posY;
        // console.log("targetPos");
        // console.log(targetPos);
        // console.log("explosionPos");
        // console.log(explosionPos);
        // console.log(x2 - x1);
        // console.log(y2 - y1);
        // console.log(Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)));
        return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    }

    return calcDistance(targetPos, explosionPos) < hitDistance;
}

export function Explosion({ targetPos, explosionPos }) {
    const info = {
        imageSrc: explosionImage,
        className: "explosion",
        isClickable: false,
        additionalClasses: isHit(targetPos, explosionPos) ? '' : ' greyed'
    };

    return (
        <GameFieldImage
            positionProps={{
                pos: explosionPos,
                // setPos: setExplosionPos
            }}
            info={info}
            explosion={true}
        />
    );
}

export function ExplosionList({ targetPos, explosionList }) {
    // console.log(explosionList);

    if (explosionList) {
        return (
            <div className="explosion-area">
                {explosionList.map((expl, i) => (<Explosion targetPos={targetPos} explosionPos={expl} key={i}/>))}
            </div>
        );
    }
    return (
        <div className="explosion-area"></div>
    );
}
