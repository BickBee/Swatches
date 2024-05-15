// ------------------- Imports ------------------- //
import { Swatch } from "./main";

// ------------------- Styling ------------------- //
const topStyle = {
  paddingLeft: "10px",
  height: "50px",
  backgroundColor: "lightgrey",
  flex: "0 0 auto",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const btnStyle = {
  width: "100px",
  flex: "0 0 auto",
}

// ------------------- Props ------------------- //
type TopProps = {
  swatches: Swatch[],
  addSwatch: () => void;
  deleteSwatch: () => void;
};

// ------------------- Component ------------------- //
export function Top({swatches, addSwatch, deleteSwatch}: TopProps) {
  let add_enabled = swatches.length < 16 ? true : false;
  let delete_enabled = swatches.length > 1 ? true : false;

  return (
    <div style={topStyle}>
      <button style={btnStyle} onClick={addSwatch} disabled={!add_enabled}>Add</button>
      <button style={btnStyle} onClick={deleteSwatch} disabled={!delete_enabled}>Delete</button>
    </div>
  );
}