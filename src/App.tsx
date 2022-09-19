import './App.css'

import { useState } from "react";
import { CoordinatesInputs } from "./CoordinatesInputs";
import { Plot } from "./Plot";
import { isExist } from './tools';

export type Coordinates = {
    x: number;
    y: number;
};

export default function App() {
    const [coordinates, setCoordinates] = useState<Coordinates[]>([]);

    const handleCoordinateUpdate = (ix: number, entry: Coordinates) => {
        if (!isExist(coordinates, entry)) {
            const newcoordinates = [...coordinates];
            newcoordinates[ix] = entry;
            setCoordinates(newcoordinates);
        }
    };

    const AddCoordinates = (newCoordinates: Coordinates) => {
        if (!isExist(coordinates, newCoordinates)) {
            setCoordinates([...coordinates, newCoordinates]);
        }
    };

    const handleRemove = (ix: number) => {
        coordinates.splice(ix, 1);
        setCoordinates([...coordinates]);
    };

    return (
        <div className="main">
            <div className="column">
                <CoordinatesInputs
                    coordinates={coordinates}
                    onEdit={handleCoordinateUpdate}
                    onRemove={handleRemove} />
                <button className="addButton" onClick={() => AddCoordinates({ x: 0, y: 0 })}>Add point</button>
            </div>
            <div className="column" >
                <Plot coordinates={coordinates} onClick={AddCoordinates} />
            </div>
        </div>
    );
}
