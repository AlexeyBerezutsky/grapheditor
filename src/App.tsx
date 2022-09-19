import './App.css'

import { useState, MouseEvent, useRef, useEffect, MutableRefObject } from "react";
import { CoordinatesInputs } from "./CoordinatesInputs";
import { Plot } from "./Plot";
import { convert, isExist } from './tools';

export type Coordinates = {
    x: number;
    y: number;
};

export const plotSize = 100;

export default function App() {
    const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
    const [aspect, setAspect] = useState<number>(1);
    const ref = useRef() as MutableRefObject<HTMLDivElement>;

    const updateSize = (node: HTMLElement) => () => {
        const aspect = node.getBoundingClientRect()?.width / plotSize;

        setAspect(aspect);
    }

    useEffect(() => {
        if (!ref?.current) {
            return;
        }

        const node = ref.current as HTMLElement;
        const updater = updateSize(node);
        window.addEventListener('resize', updater);
        updater();
        return () => window.removeEventListener('resize', updater);
    }, [ref?.current]);

    const handleCoordinateUpdate = (ix: number, entry: Coordinates) => {
        if (!isExist(coordinates, entry)) {
            const newcoordinates = [...coordinates];
            newcoordinates[ix] = entry;
            setCoordinates(newcoordinates);
        }
    };

    const AddCoordinates = ({ x, y }: Coordinates) => {
        const newCoordinates = { x: x / aspect, y: y / aspect };

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
            <div className="column" ref={ref}>
                <Plot coordinates={convert(coordinates, aspect)} onClick={AddCoordinates} />
            </div>
        </div>
    );
}
