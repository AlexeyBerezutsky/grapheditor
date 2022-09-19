import { useState, MouseEvent, useRef, useEffect, MutableRefObject } from "react";
import './App.css'
import { Plot } from "./Plot";

export type Coordinates = {
    x?: number;
    y?: number;
};

const plotSize = 100;


const convert = (coordinates: Coordinates[], aspect: number): Coordinates[] => coordinates.map((tuple: Coordinates) => ({ x: (tuple.x && tuple.x * aspect), y: (tuple.y && tuple.y * aspect) }))

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

    const handleRemove = (ix: number) => () => {
        coordinates.splice(ix, 1);
        setCoordinates([...coordinates]);
    };

    const handleAddPoint = () => {
        setCoordinates([...coordinates, {}]);
    };

    const handleCoordinateUpdate = (ix: number, entry: Coordinates) => {
        const newcoordinates = [...coordinates];
        newcoordinates[ix] = entry;
        setCoordinates(newcoordinates);
    };

    const handlePlotClick = (event: MouseEvent) => {
        const node = event.target as HTMLElement

        const bounds = node.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = bounds.bottom - event.clientY;

        const newCoordinates = { x: x / aspect, y: y / aspect };

        setCoordinates([...coordinates, newCoordinates]);
    }

    return (
        <div className="main">
            <div className="column">
                {coordinates.map((row, ix) => {
                    const key= JSON.stringify(row);
                    return (
                        <div key={key}>
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

                <button onClick={handleAddPoint}>Add point</button>
            </div>
            <div className="column" ref={ref}>
                <Plot coordinates={convert(coordinates, aspect)} onClick={handlePlotClick} />
            </div>
        </div>
    );
}
