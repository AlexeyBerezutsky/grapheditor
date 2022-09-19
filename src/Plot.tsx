import {MouseEventHandler} from 'react';
import { Coordinates } from './App';

type Props = {
    onClick: MouseEventHandler<HTMLDivElement>,
    coordinates: Coordinates[]
};

export const Plot = ({
    onClick,
    coordinates
}: Props )=>{
    return (
        <div onClick={onClick} className="plot">
        {coordinates.map((tuple) => {
            const key = JSON.stringify(tuple);
            return (
                <div
                    onClick= {(event)=>{ event.stopPropagation()}}
                    className="point"
                    key={key}
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