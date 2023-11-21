import './App.css';
import {createContext, useContext, useState} from "react";

import {Target, ReferencePoint, getRandomXYPositions} from './GameFieldImage';
import {ExplosionList} from './Explosion';
import {MouseAimPointer} from './MouseAimPointer';

function Game({ gameFieldProps, explosionList }) {
    return (
        <div className="game-wrapper">
            <Field gameFieldProps={ gameFieldProps } explosionList={explosionList}/>
            <MouseAimPointer />
        </div>
    );
}

function Field({ gameFieldProps, explosionList }) {
    return (
        <div className="game-field" id="game-field">
            <Target positionProps={gameFieldProps.target}/>
            <ReferencePoint positionProps={gameFieldProps.reference}/>
            <ExplosionList targetPos={gameFieldProps.target.pos} explosionList={explosionList}/>
        </div>
    );
}

function Settings({handleFireClick, handleResetExplosions, handleRestart}) {
    return (
        <div className="settings">
            <h3>Settings</h3>
            <FireMenu
                handleFireButton={handleFireClick}
                handleResetExplosions={handleResetExplosions}
                handleRestart={handleRestart} />
        </div>
    );
}

function FireMenu({handleFireButton: handleFireClick, handleResetExplosions, handleRestart}) {
    const [xAdjustment, setXAdjustment] = useState('');
    const [yAdjustment, setYAdjustment] = useState('');

    function onFireButtonClick() {
        handleFireClick(xAdjustment, yAdjustment);
    }

    function onResetExplosions() {
        handleResetExplosions();
    }

    function onRestart() {
        handleRestart();
    }

    function onAdjustmentChange(value, type) {
        if (type === "X") {
            setXAdjustment(value);
        } else {
            setYAdjustment(value);
        }
    }

    return (
        <div className="fire-menu">
            Fire menu
            <label className="coordinates" id="fire-x-coordinate">
                X {' '}
                <input
                    type="number"
                    value={xAdjustment}
                    onChange={(e) => onAdjustmentChange(e.target.value, "X")}/>
            </label>
            {/*<br/>*/}
            <label className="coordinates" id="fire-y-coordinate">
                Y {' '}
                <input
                    type="number"
                    value={yAdjustment}
                    onChange={(e) => onAdjustmentChange(e.target.value, "Y")}/>
            </label>
            <button type="button" onClick={onFireButtonClick}>
                Fire
            </button>
            <button type="button" onClick={onResetExplosions}>
                Reset explosions
            </button>
            <br/>
            <br/>
            <button type="button" onClick={onRestart}>
                Restart
            </button>
        </div>
    );
}

export const WindowSizeContext = createContext({width: window.innerWidth, height: window.innerHeight});

function App() {
    const windowSize = useContext(WindowSizeContext);

    const [targetPos, setTargetPos] = useState(getRandomXYPositions(windowSize))
    const [referencePos, setReferencePos] = useState(getRandomXYPositions(windowSize))
    const [explosionList, setExplosionList] = useState([]);

    const gameFieldProps = {
        target: {pos: targetPos, setPos: setTargetPos},
        reference: {pos: referencePos, setPos: setReferencePos},
    };
    // const [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight})

    function addExplosion(xAdjustment, yAdjustment) {
        let pos;

        if (explosionList.length === 0) {
            pos = {...referencePos};
        } else {
            pos = {...explosionList[explosionList.length - 1]};
        }

        pos.posX += parseInt(xAdjustment) || 0;
        pos.posY += parseInt(yAdjustment) || 0;

        setExplosionList([...explosionList, pos]);
        // console.log(explosionList);
    }

    function clearExplosionList() {
        setExplosionList([]);
    }

    function restartApp() {
        const newTargetPos = getRandomXYPositions(windowSize);
        const newReferencePos = getRandomXYPositions(windowSize);

        setTargetPos(newTargetPos);
        setReferencePos(newReferencePos);
        clearExplosionList();
        console.log('restart');
    }

    return (
        <div className="app">
            <div className="game column">
                <Game
                    gameFieldProps={gameFieldProps}
                    explosionList={explosionList}/>
            </div>
            <div className="settings column">
                <Settings
                    handleFireClick={addExplosion}
                    handleResetExplosions={clearExplosionList}
                    handleRestart={restartApp} />
            </div>
        </div>
    );
}

export default App;