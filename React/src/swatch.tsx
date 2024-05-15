// ------------------- Imports ------------------- //
import { Swatch } from "./main";

// ------------------- Props ------------------- //
type SwatchProps = {
    selected_swatch: number,
    swatches: Swatch[],
    swatch_number: number,
    selectSwatch: (num: number) => void,
};

// ------------------- Component ------------------- //
export function Swatch_item({selected_swatch, swatches, swatch_number, selectSwatch}: SwatchProps) {
    
    // ------------------- Styling (located here for dynamic colouring) ------------------- //
    const swatchStyle = {
        border: "solid lightgrey",
        width: "50px",
        height: "50px",
        flex: "0 0 auto",
        position: "relative",
        backgroundColor: `hsl(${swatches[swatch_number].hue}, ${swatches[swatch_number].sat}%, ${swatches[swatch_number].lum}%)`,
    }

    if (selected_swatch === swatch_number) {
        swatchStyle.border = "solid black";
    }
    
    return (
        <div style={swatchStyle} onClick={() => selectSwatch(swatch_number)}></div>
    );
}