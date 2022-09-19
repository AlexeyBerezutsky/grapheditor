import { Coordinates } from './App';
import { MouseEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { convert } from './tools';

export const plotSize = 100;

type Props = {
    onClick: (coordinates: Coordinates) => void,
    coordinates: Coordinates[];
};

export const Plot = ({
    onClick,
    coordinates
}: Props) => {
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

    const onPlotAreaClick = (event: MouseEvent) => {
        const node = event.target as HTMLElement

        const bounds = node.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = bounds.bottom - event.clientY;
        const newCoordinates = { x: x / aspect, y: y / aspect };

        onClick(newCoordinates);
    }

    return (
        <div onClick={onPlotAreaClick} className="plot" ref={ref}>
            {convert(coordinates,aspect).map((tuple, ix) => {
                return (
                    <div
                        onClick={(event) => { event.stopPropagation() }}
                        className="point"
                        key={ix}
                        style={{
                            left: tuple.x,
                            bottom: tuple.y,
                        }}
                    />
                );
            })}
        </div>
    )
}