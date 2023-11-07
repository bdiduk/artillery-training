import './App.css';
import {createContext, useEffect, useState} from "react";

import {Target, ReferencePoint, getRandomXYPositions} from './GameFieldImage';
import {Explosion, ExplosionList} from './Explosion';
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
        <div className="game-field">
            <Target positionProps={gameFieldProps.target}/>
            <ReferencePoint positionProps={gameFieldProps.reference}/>
            <ExplosionList explosionList={explosionList}/>
        </div>
    );
}

function Settings({handleFireClick, handleResetExplosions}) {
    function handleRerender() {
        console.log('rerendered... nope :(')
    }

    return (
        <div className="settings">
            <h3>Settings</h3>
            <FireMenu handleFireButton={handleFireClick} handleResetExplosions={handleResetExplosions}/>
            {/*<button className="rerender-targets" onClick={handleRerender}>Rerender targets</button>*/}
        </div>
    );
}

function FireMenu({handleFireButton: handleFireClick, handleResetExplosions}) {
    const [xAdjustment, setXAdjustment] = useState('');
    const [yAdjustment, setYAdjustment] = useState('');

    function onFireButtonClick() {
        // console.log('handle fire click');
        handleFireClick(xAdjustment, yAdjustment);
    }

    function onResetExplosions() {
        handleResetExplosions();
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
        </div>
    );
}

const WindowSizeContext = createContext({width: window.innerWidth, height: window.innerHeight});

function App() {
    const [targetPos, setTargetPos] = useState(getRandomXYPositions(5, 95, 0, 60))
    const [referencePos, setReferencePos] = useState(getRandomXYPositions(5, 95, 0, 60))
    const gameFieldProps = {
        target: {pos: targetPos, setPos: setTargetPos},
        reference: {pos: referencePos, setPos: setReferencePos},
    };
    // const [explosionList, setExplosionList] = useState([<Explosion targetPos={targetPos} key='0'/>]);
    const [explosionList, setExplosionList] = useState([]);
    // const [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight})

    function addExplosion(xAdjustment, yAdjustment) {
        const adjustments = {
            xAdjustment: xAdjustment,
            yAdjustment: yAdjustment
        };
        const explosion = <Explosion targetPos={targetPos} adjustments={adjustments} key={explosionList.length}/>;
        setExplosionList([
            ...explosionList, explosion
        ]);
    }

    function clearExplosionList() {
        setExplosionList([]);
    }

    // const handleResize = () => {
    //     setWindowSize({
    //         width: window.innerWidth,
    //         height: window.innerHeight
    //     });
    // };
    //
    // useEffect(() => {
    //     window.addEventListener('resize', handleResize);
    //
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     }
    // }, []);

    return (
        <div className="app">
            <div className="game column"><Game gameFieldProps={gameFieldProps} explosionList={explosionList}/></div>
            <div className="settings column"><Settings handleFireClick={addExplosion} handleResetExplosions={clearExplosionList}/></div>
        </div>
    );
}

export default App;