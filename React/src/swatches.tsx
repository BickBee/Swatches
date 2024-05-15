// ------------------- Imports ------------------- //
import { Swatch } from "./main";
import { Swatch_item } from "./swatch";
  
// ------------------- Styling ------------------- //
const swatchContainerStyle = {
    height: "50%",
    padding: "10px",
    backgroundColor: "white",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    alignContent: "flex-start",
    flexDirection: "row",
};

// ------------------- Props ------------------- //
type SwatchProps = {
    selected_swatch: number,
    swatches: Swatch[],
    selectSwatch: (num: number) => void,
};

// ------------------- Component ------------------- //
export function SwatchSection({selected_swatch, swatches, selectSwatch}: SwatchProps) {
    return (
        <div style={swatchContainerStyle}>
            {swatches.map(function(blank, i){
                return <Swatch_item selected_swatch={selected_swatch} 
                                    swatches={swatches}
                                    swatch_number={i}
                                    selectSwatch={selectSwatch} />;
            })}
        </div>
    );
}