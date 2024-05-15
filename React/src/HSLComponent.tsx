// ------------------- Imports ------------------- //
import { Swatch } from "./main";

// ------------------- Styling ------------------- //
const HSLContainer = {
    display: "flex",
    flexDirection: "row",
}

const labelStyle = {
    minWidth: "50px",
    width: "50px",
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
type HSLComponentProps = {
    selected_swatch: number,
    swatches: Swatch[],
    changeSelectedSwatch: (hue: number, sat: number, lum: number) => void,
};

// ------------------- Components ------------------- //
export function HSLComponent({selected_swatch, swatches, changeSelectedSwatch}: HSLComponentProps) {    
    return (
        <>
            <div style={HSLContainer}>
                <label style={labelStyle}>Hue</label>
                <input style={textfieldStyle} type="number" pattern="\d\d\d" value={`${Math.round(swatches[selected_swatch]?.hue) || 0}`} onInput={(e) => {
                    if (parseInt(e.currentTarget.value) > 360) {
                        e.currentTarget.value = "360";
                    }
                    changeSelectedSwatch(parseInt(e.currentTarget.value), swatches[selected_swatch].sat, swatches[selected_swatch].lum);
                }} required />
                <input style={sliderStyle} type="range" min="0" max="360" value={`${swatches[selected_swatch]?.hue || 0}`} onInput={(e) => {
                    changeSelectedSwatch(parseInt(e.currentTarget.value), swatches[selected_swatch].sat, swatches[selected_swatch].lum);
                }}/>
            </div>
            <div style={HSLContainer}>
                <label style={labelStyle}>Sat</label>
                <input style={textfieldStyle} type="number" pattern="\d\d\d" value={`${Math.round(swatches[selected_swatch]?.sat) || 0}`} onInput={(e) => {
                    if (parseInt(e.currentTarget.value) > 100) {
                        e.currentTarget.value = "100";
                    }
                    changeSelectedSwatch(swatches[selected_swatch].hue, parseInt(e.currentTarget.value), swatches[selected_swatch].lum);
                }} required />
                <input style={sliderStyle} type="range" min="0" max="100" value={`${swatches[selected_swatch]?.sat || 0}`} onInput={(e) => {
                    changeSelectedSwatch(swatches[selected_swatch].hue, parseInt(e.currentTarget.value), swatches[selected_swatch].lum);
                }}/>
            </div>
            <div style={HSLContainer}>
                <label style={labelStyle}>Lum</label>
                <input style={textfieldStyle} type="number" pattern="\d\d\d" value={`${Math.round(swatches[selected_swatch]?.lum) || 0}`} onInput={(e) => {
                    if (parseInt(e.currentTarget.value) > 100) {
                        e.currentTarget.value = "100";
                    }
                    changeSelectedSwatch(swatches[selected_swatch].hue, swatches[selected_swatch].sat, parseInt(e.currentTarget.value));
                }} required />
                <input style={sliderStyle} type="range" min="0" max="100" value={`${swatches[selected_swatch]?.lum || 0}`} onInput={(e) => {
                    changeSelectedSwatch(swatches[selected_swatch].hue, swatches[selected_swatch].sat, parseInt(e.currentTarget.value));
                }}/>
            </div>
        </>
    );
}