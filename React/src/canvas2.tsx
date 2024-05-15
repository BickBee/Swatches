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
    changeSelectedSwatch: (hue: number, sat: number, lum: number) => void,
};

// ------------------- Component ------------------- //
export function Canvas2({selected_swatch, swatches, changeSelectedSwatch}: CanvasProps) {
    // Get Canvas Reference
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Click Handler
    const clickHandler = (e: MouseEvent) => {
        changeSelectedSwatch(((e.offsetY - 2.5)/200)*360, swatches[selected_swatch].sat, swatches[selected_swatch].lum);
    };

    useLayoutEffect(() => {
        const gc = canvasRef.current?.getContext("2d");
        if (gc) draw(gc);
    }), [];

    function draw(gc: CanvasRenderingContext2D) {
        gc.fillStyle = "red";
        gc.fillRect(0, 0, gc.canvas.width, gc.canvas.height);

        for (let i = 0; i < gc.canvas.width; i=i+5) {
            for (let j = 0; j < gc.canvas.height; j=j+5) {
                gc.fillStyle = `hsl(${(j/gc.canvas.height)*360}, ${100}%, ${50}%)`;
                gc.fillRect(i, j, 5, 5);
            }
        }

        gc.strokeStyle = "white";
        gc.strokeRect(0, ((swatches[selected_swatch]?.hue || 0) * 200)/360, 20, 5);
        gc.strokeStyle = "black";
        gc.strokeRect(1, ((swatches[selected_swatch]?.hue || 0) * 200)/360 + 1, 18, 3);
    }

    return (
        <canvas
            ref={canvasRef}
            style={{width: 20, height: 200}}
            width={20}
            height={200}
            onClick={clickHandler}
        />
    );
}