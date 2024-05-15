// ------------------- Imports ------------------- //
import { Swatch } from "./main";

// ------------------- Helper Functions ------------------- //
export function HSLtoRGB(hue: number, sat: number, lum: number) {
    sat = sat / 100;
    lum = lum / 100;

    const c = (1 - Math.abs(2 * lum - 1)) * sat;
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    const m = lum - c / 2;

    let r = 0, g = 0, b = 0;

    if (hue < 60) {
        r = c; g = x;
    } else if (hue < 120) {
        r = x; g = c;
    } else if (hue < 180) {
        g = c; b = x;
    } else if (hue < 240) {
        g = x; b = c;
    } else if (hue < 300) {
        r = x; b = c;
    } else {
        r = c; b = x;
    }
    
    r = (r + m) * 255;
    g = (g + m) * 255;
    b = (b + m) * 255;

    return {red: r, green: g, blue: b};
}

export function RGBtoHSL(red: number, green: number, blue: number) {
    // Convert RGB values to the range 0-1
    red = red / 255;
    green = green / 255;
    blue = blue / 255;

    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    let hue = (max + min) / 2;
    let sat = (max + min) / 2;
    let lum = (max + min) / 2;

    if (max === min) {
        hue = 0;
        sat = 0;
    } else {
        const d = max - min;
        if (lum > 0.5) {
            sat = d/(2 - max - min);
        } else {
            sat = d/(max + min);
        }

        switch (max) {
            case red: hue = (green - blue) / d + (green < blue ? 6 : 0); break;
            case green: hue = (blue - red) / d + 2; break;
            case blue: hue = (red - green) / d + 4; break;
        }

        hue *= 60;
    }

    sat = sat * 100;
    lum = lum * 100;

    return {hue: hue, sat: sat, lum: lum};
}

// ------------------- Styling ------------------- //
const RGBContainer = {
    display: "flex",
    flexDirection: "row",
}

const labelStyle = {
    minWidth: "20px",
    width: "20px",
    textAlign: "right",
    alignSelf: "center",
    paddingRight: "10px",
  }

const textfieldStyle = {
    width: "50px",
    alignSelf: "center",
    marginRight: "10px",
}
  
const sliderStyle = {
    flex: "1 1 auto",
}

// ------------------- Props ------------------- //
type RGBComponentProps = {
    selected_swatch: number,
    swatches: Swatch[],
    changeSelectedSwatch: (hue: number, sat: number, lum: number) => void,
};

// ------------------- Component ------------------- //
export function RGBComponent({selected_swatch, swatches, changeSelectedSwatch}: RGBComponentProps) {
    let {red, green, blue} = HSLtoRGB(swatches[selected_swatch].hue, swatches[selected_swatch].sat, swatches[selected_swatch].lum);

    return (
        <>
            <div style={RGBContainer}>
                <label style={labelStyle}>R</label>
                <input style={textfieldStyle} type="number" pattern="\d\d\d" value={Math.round(red)} onInput={(e) => {
                    if (parseInt(e.currentTarget.value) > 255) {
                        e.currentTarget.value = "255";
                    } else if (e.currentTarget.value === "" || parseInt(e.currentTarget.value) < 0) {
                        e.currentTarget.value = "0";
                    }
                    let {hue, sat, lum} = RGBtoHSL(parseInt(e.currentTarget.value), green, blue);
                    changeSelectedSwatch(hue, sat, lum);
                }} required />
                <input style={sliderStyle} type="range" min="0" max="255" value={red} onInput={(e) => {
                    let {hue, sat, lum} = RGBtoHSL(parseInt(e.currentTarget.value), green, blue);
                    changeSelectedSwatch(hue, sat, lum);
                }}/>
            </div>
            <div style={RGBContainer}>
                <label style={labelStyle}>G</label>
                <input style={textfieldStyle} type="number" pattern="\d\d\d" value={Math.round(green)} onInput={(e) => {
                    if (parseInt(e.currentTarget.value) > 255) {
                        e.currentTarget.value = "255";
                    } else if (e.currentTarget.value === "" || parseInt(e.currentTarget.value) < 0) {
                        e.currentTarget.value = "0";
                    }
                    let {hue, sat, lum} = RGBtoHSL(red, parseInt(e.currentTarget.value), blue);
                    changeSelectedSwatch(hue, sat, lum);
                }} required />
                <input style={sliderStyle} type="range" min="0" max="255" value={green} onInput={(e) => {
                    let {hue, sat, lum} = RGBtoHSL(red, parseInt(e.currentTarget.value), blue);
                    changeSelectedSwatch(hue, sat, lum);
                }}/>
            </div>
            <div style={RGBContainer}>
                <label style={labelStyle}>B</label>
                <input style={textfieldStyle} type="number" pattern="\d\d\d" value={Math.round(blue)} onInput={(e) => {
                    if (parseInt(e.currentTarget.value) > 255) {
                        e.currentTarget.value = "255";
                    } else if (e.currentTarget.value === "" || parseInt(e.currentTarget.value) < 0) {
                        e.currentTarget.value = "0";
                    }
                    let {hue, sat, lum} = RGBtoHSL(red, green, parseInt(e.currentTarget.value));
                    changeSelectedSwatch(hue, sat, lum);
                }} required />
                <input style={sliderStyle} type="range" min="0" max="255" value={blue} onInput={(e) => {
                    let {hue, sat, lum} = RGBtoHSL(red, green, parseInt(e.currentTarget.value));
                    changeSelectedSwatch(hue, sat, lum);
                }}/>
            </div>
        </>
    );
}