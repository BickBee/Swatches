// ------------------- Imports ------------------- //
import {
    useState,
} from "preact/hooks";

import { Swatch } from "./main";
import { HSLComponent } from "./HSLComponent";
import { RGBComponent } from "./RGBComponent";
import { HEXComponent } from "./HEXComponent";

// ------------------- Styling ------------------- //
const hslStyle = {
    border: "solid grey",
    padding: "10px",
    width: "50%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
};

const radioStyle = {
    height: "25px",
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItems: "baseline",
}

// ------------------- Props ------------------- //
type HSLProps = {
    selected_swatch: number,
    swatches: Swatch[],
    changeSelectedSwatch: (hue: number, sat: number, lum: number) => void,
};

// ------------------- Component ------------------- //
export function HSL({selected_swatch, swatches, changeSelectedSwatch}: HSLProps) {
    const [selectorChoice, setSelectorChoice] = useState("HSL");

    function changeSelector(type: string) {
        setSelectorChoice(type);
    }

    return (
        <div style={hslStyle}>
            <div style={radioStyle}>
                <input type="radio" name="hslarea" onChange={() => changeSelector("HSL")} checked={selectorChoice === "HSL"}></input>
                <label>HSL</label>
                <input type="radio" name="hslarea" onChange={() => changeSelector("RGB")}></input>
                <label>RGB</label>
                <input type="radio" name="hslarea" onChange={() => changeSelector("HEX")}></input>
                <label>Hex</label>
            </div>

            {selectorChoice === "HSL" && <HSLComponent selected_swatch={selected_swatch} swatches={swatches} changeSelectedSwatch={changeSelectedSwatch}/>}
            {selectorChoice === "RGB" && <RGBComponent selected_swatch={selected_swatch} swatches={swatches} changeSelectedSwatch={changeSelectedSwatch}/>}
            {selectorChoice === "HEX" && <HEXComponent selected_swatch={selected_swatch} swatches={swatches} changeSelectedSwatch={changeSelectedSwatch}/>}
        </div>
    );
}