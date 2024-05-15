// ------------------- Imports ------------------- //
import { Swatch } from "./main";

// ------------------- Styling ------------------- //
const statusStyle = {
    paddingRight: "10px",
    justifyContent: "right",
    height: "50px",
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "lightgrey",
};

// ------------------- Props ------------------- //
type StatusProps = {
    selected_swatch: number,
    swatches: Swatch[],
};

// ------------------- Component ------------------- //
export function Status({selected_swatch, swatches}: StatusProps) {
  return (
    <div style={statusStyle}>
      <p>{swatches.length} swatches (selected #{selected_swatch + 1})</p>
    </div>
  );
}