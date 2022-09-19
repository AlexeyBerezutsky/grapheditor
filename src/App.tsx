import { useState, MouseEvent } from "react";

type Coordinates = {
    x?: number;
    y?: number;
};

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
        const y = event.clientY - bounds.top

        handleAddPoint({ x, y });

    }

    return (
        <div className="App">
            <div>
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

                <button onClick={() => handleAddPoint}>Add point</button>
            </div>
            <div
                onClick={handleGlobalClick}
                style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    border: "1px solid black"
                }}
            >
                {coordinates.map((row, ix) => {
                    return (
                        <div
                            key={ix}
                            style={{
                                left: row.x,
                                top: row.y,
                                position: "absolute",
                                width: "2px",
                                height: "2px",
                                backgroundColor: "red"
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}
