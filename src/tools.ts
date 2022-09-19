import { Coordinates } from "./App";

export const convert = (coordinates: Coordinates[], aspect: number): Coordinates[] => {
    return coordinates.map((tuple: Coordinates) => ({ x: tuple.x * aspect, y: tuple.y * aspect }))
}
export const isExist = (coordinates: Coordinates[], tuple: Coordinates) => {
    const found = coordinates.find((item) => Math.abs(item.x - tuple.x) < Number.EPSILON && Math.abs(item.y - tuple.y) < Number.EPSILON);
    return !!found;
}