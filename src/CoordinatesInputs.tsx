import { Coordinates } from "./App";
import { LabeledInput } from "./LabeledInput";

type Props = {
    coordinates: Coordinates[];
    onEdit: (ix: number, value: Coordinates) => void
    onRemove: (ix: number) => void
}

export const CoordinatesInputs = ({ coordinates, onEdit, onRemove }: Props) => {
    return <>
        {
            coordinates.map((tuple, ix) => {
                const key = JSON.stringify(tuple);
                return (
                    <div key={key} className="input-group">
                        <LabeledInput
                            name='x'
                            value={tuple.x}
                            onInput={
                                (value) => onEdit(ix, {
                                    ...tuple,
                                    x: value
                                })} />

                        <LabeledInput
                            name='y'
                            value={tuple.y}
                            onInput={
                                (value) => onEdit(ix, {
                                    ...tuple,
                                    y: value
                                })} />

                        <button onClick={() => onRemove(ix)}>Remove</button>
                    </div>
                );
            })
        }
    </>
}