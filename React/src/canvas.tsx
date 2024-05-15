// ------------------- Imports ------------------- //
import {
    useRef,
    useLayoutEffect,
} from "preact/hooks";

import { Swatch } from "./main";

// ------------------- Props ------------------- //
type CanvasProps = {
    selected_swatch: number,
    swatches: Swatch[],
    changePoint: (point: {x: number, y: number}) => void,
    point: {x: number, y: number},
};

// ------------------- Component ------------------- //
export function Canvas({selected_swatch, swatches, changePoint, point}: CanvasProps) {
    // Get Canvas Ref
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Click Handler
    const clickHandler = (e: MouseEvent) => {
        changePoint({x: e.offsetX, y: e.offsetY});
    };

    useLayoutEffect(() => {
        const gc = canvasRef.current?.getContext("2d");
        if (gc) draw(gc);
    }), [point];

    function draw(gc: CanvasRenderingContext2D) {
        gc.fillStyle = "red";
        gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);

        for (let i = 0; i < gc.canvas.width; i=i+5) {
            for (let j = 0; j < gc.canvas.height; j=j+5) {
                gc.fillStyle = `hsl(${swatches[selected_swatch]?.hue || 0}, ${i/2}%, ${j/2}%)`;
                gc.fillRect(i, j, 5, 5);
            }
        }

        // Draw Circle
        gc.strokeStyle = "white";
        gc.beginPath();
        gc.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        gc.stroke();

        gc.strokeStyle = "black";
        gc.beginPath();
        gc.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        gc.stroke();
    }

    return (
        <canvas
            ref={canvasRef}
            style={{width: 200, height: 200}}
            width={200}
            height={200}
            onClick={clickHandler}
        />
    );
}