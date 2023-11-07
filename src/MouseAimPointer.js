import React, { useState, useEffect } from "react";

// export const MouseAimPointer = () => {
//     const [position, setPosition] = useState({ x: 0, y: 0 });
//
//     useEffect(() => {
//         const updateMousePosition = (e) => {
//             setPosition({ x: e.clientX, y: e.clientY });
//             console.log(position);
//             // console.log(e.clientX, e.clientY);
//         };
//
//         window.addEventListener('mousemove', updateMousePosition);
//
//         return () => {
//             window.removeEventListener('mousemove', updateMousePosition);
//         };
//     }, []);
//
//     return (
//         <div className="mouse-aim-pointer" style={{ left: `${position.x}px`, top: `${position.y}px` }}>
//             <img
//                 src={explosionImage}
//                 alt="MouseAim"
//                 style={{ width: '30px', height: '30px' }}
//             />
//         </div>
//     );
// };

export const MouseAimPointer = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <div
            className="custom-mouse-pointer"
            style={{ left: position.x, top: position.y }}
        ></div>
    );
};

export default MouseAimPointer;