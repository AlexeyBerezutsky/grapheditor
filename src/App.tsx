import { useState, MouseEvent } from "react";
import './App.css'

type Coordinates = {
    x?: number;
    y?: number;
};

// const toView = (coordinates: Coordinates, aspect: number): Coordinates=>{
//     return {
//         x: (coordinates.x || 0) * aspect,
//         y: (coordinates.y || 0) * aspect
//     }
// }

// const toCoordinates = (coordinates: Coordinates, aspect: number): Coordinates=>{
//     return {
//         x: (coordinates.x || 0) / aspect,
//         y: (coordinates.y || 0) / aspect
//     }
// }


// const aspect = 100;

export default function App() {
    const [coordinates, setCoordinates] = useState<Coordinates[]>([]);

    const handleRemove = (ix: number) => () => {
        coordinates.splice(ix, 1);
        setCoordinates([...coordinates]);
    };

    const handleAddPoint = (newCoordinates: Coordinates = {}) => {
        setCoordinates([...coordinates, newCoordinates]);
    };

    const handleCoordinateUpdate = (ix: number, entry: Coordinates) => {
        const newcoordinates = [...coordinates];
        newcoordinates[ix] = entry;
        console.log(newcoordinates);
        setCoordinates(newcoordinates);
    };

    const handleGlobalClick = (event: MouseEvent) => {
        const node = event.target as HTMLElement

        const bounds = node.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y =  bounds.bottom - event.clientY;

        const newCoordinates = { x, y };

        handleAddPoint(newCoordinates);
    }

    return (
        <div className="main">
            <div className="column">
                {coordinates.map((row, ix) => {
                    return (
                        <div key={ix}>
                            <input
                                value={row.x || ''}
                                onChange={(event) => {
                                    handleCoordinateUpdate(ix, {
                                        ...row,
                                        x: +event.target.value
                                    });
                                }}
                            />
                            <input
                                value={row.y || ''}
                                onChange={(event) => {
                                    handleCoordinateUpdate(ix, {
                                        ...row,
                                        y: +event.target.value
                                    });
                                }}
                            />
                            <button onClick={handleRemove(ix)}>Remove</button>
                        </div>
                    );
                })}

                <button onClick={() => handleAddPoint()}>Add point</button>
            </div>
            <div className="column">
                <div
                    onClick={handleGlobalClick}
                    className="plot"
                >
                    {coordinates.map((row, ix) => {
                        return (
                            <div
                                className="point"
                                key={ix}
                                style={{
                                    left: row.x,
                                    bottom: row.y,
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
