// ------------------- Imports ------------------- //
import {
    useEffect,
    useState,
} from "preact/hooks";

import { Swatch } from "./main";
import { HSLtoRGB, RGBtoHSL } from "./RGBComponent";

// ------------------- Styling ------------------- //
const HEXContainer = {
    padding: "5px",
    display: "flex",
    flexDirection: "column",
}

const textfieldStyle = {
    width: "100px",
    height: "20px",
    alignSelf: "left",
    marginRight: "10px",
}

const errorStyle = {
    color: "red",
}

// ------------------- Helper Functions ------------------- //
function RGBtoHEX(red: number, green: number, blue: number) {
    red = Math.round(red);
    green = Math.round(green);
    blue = Math.round(blue);
    function ConvertHex(val: number) {
        let hex = val.toString(16);
        if (hex.length === 1) {
            return `0${hex}`;
        } else {
            return hex;
        }
    }
    return `${ConvertHex(red)}${ConvertHex(green)}${ConvertHex(blue)}`;
}

function HEXtoRGB(hex: string) {
    let allowedChars = /^[0-9A-Fa-f]{6}$/;
    if (hex.length != 6) {
        return { red: 0, green: 0, blue: 0, valid: false};
    } else if (!allowedChars.test(hex)) {
        return { red: 0, green: 0, blue: 0, valid: false};
    }

    let valid = true;
    let red = parseInt(hex.substring(0, 2), 16);
    let green = parseInt(hex.substring(2, 4), 16);
    let blue = parseInt(hex.substring(4, 6), 16);

    if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255) {
        valid = false;
    }

    return { red: red, green: green, blue: blue, valid: valid};
}

// ------------------- Props ------------------- //
type HEXComponentProps = {
    selected_swatch: number,
    swatches: Swatch[],
    changeSelectedSwatch: (hue: number, sat: number, lum: number) => void,
};

// ------------------- Component ------------------- //
export function HEXComponent({selected_swatch, swatches, changeSelectedSwatch}: HEXComponentProps) { 
    const [valid, setValid] = useState(true); 
    let {red, green, blue} = HSLtoRGB(swatches[selected_swatch].hue, swatches[selected_swatch].sat, swatches[selected_swatch].lum);
    const [hex, setHex] = useState(RGBtoHEX(red, green, blue));
    const [lastValid, setLastValid] = useState(RGBtoHEX(red, green, blue));

    useEffect(() => {
        let temp_obj = HSLtoRGB(swatches[selected_swatch].hue, swatches[selected_swatch].sat, swatches[selected_swatch].lum);
        if (valid) {
            setHex(RGBtoHEX(temp_obj.red, temp_obj.green, temp_obj.blue));
            setLastValid(RGBtoHEX(temp_obj.red, temp_obj.green, temp_obj.blue));
        }
    }), [selected_swatch];

    return (
        <>
            <div style={HEXContainer}>
                <input style={textfieldStyle} value={`#${hex}`} onInput={(e) => {
                    let hex_from_text: string = e.currentTarget.value.replace('#', '');
                    let tempRGB = HEXtoRGB(hex_from_text);
                    if (tempRGB.valid) {
                        console.log("valid");
                        let tempHSL = RGBtoHSL(tempRGB.red, tempRGB.green, tempRGB.blue);
                        changeSelectedSwatch(tempHSL.hue, tempHSL.sat, tempHSL.lum);
                        setValid(true);
                        setHex(e.currentTarget.value.replace('#', ''));
                        setLastValid(e.currentTarget.value.replace('#', ''));
                    } else {
                        console.log("invalid");
                        console.log(e.currentTarget.value.replace('#', ''));
                        setValid(false);
                        setHex(e.currentTarget.value.replace('#', ''));
                    }
                }} 
                onChange={() => {
                    console.log("change");
                    setHex(lastValid);
                    setValid(true);
                }} required />
                {!valid && <p style={errorStyle}>Invalid: must be valid hex colour</p>}
            </div>
        </>
    );
}