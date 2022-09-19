import { Coordinates } from './App';
import { MouseEvent } from 'react';

type Props = {
    onClick: (coordinates: Coordinates) => void,
    coordinates: Coordinates[];
};

export const Plot = ({
    onClick,
    coordinates
}: Props) => {

    const onplotAreacClick = (event: MouseEvent) => {
        const node = event.target as HTMLElement

        const bounds = node.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = bounds.bottom - event.clientY;

        onClick({ x, y });
    }

    return (
        <div onClick={onplotAreacClick} className="plot">
            {coordinates.map((tuple, ix) => {
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