// ------------------- Imports ------------------- //
import { render } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Top } from "./top";
import "./style.css";
import { Status } from "./status";
import { SwatchSection } from "./swatches";
import { Canvas } from "./canvas";
import { Canvas2 } from "./canvas2";
import { HSL } from "./hslsection";

// ------------------- Styling ------------------- //
const containerStyle = {
  backgroundColor: "lightblue",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
};

const canvasContainerStyle = {
  border: "solid black",
  padding: "10px",
  width: "50%",
  display: "flex",
  flexDirection: "row",
  gap: "10px",
}

const editorStyle = {
  padding: "10px",
  height: "50%",
  backgroundColor: "whitesmoke",
  display: "flex",
  flexDirection: "row",
  gap: "10px",
}

// ------------------- Swatch Class ------------------- //
export type Swatch = {
  hue: number;
  sat: number;
  lum: number;
};

// ------------------- Helper Random Function ------------------- //
export function random(a: number, b?: number): number {
  if (b != undefined) {
    return a + Math.random() * (b - a);
  } else {
    return Math.random() * a;
  }
}

// ------------------- App Component ------------------- //
function App() {
  // Variables
  const [selected_swatch, setSelectedSwatch] = useState(0 as number);
  const [swatches, setSwatches] = useState([] as Swatch[]);
  const [point, setPoint] = useState({x: swatches[selected_swatch]?.sat * 2 || 0, y: swatches[selected_swatch]?.lum * 2 || 0});

  // Change Functions
  function changeSelectedSwatch(hue: number, sat: number, lum: number) {
    let arr_copy = [...swatches];
    arr_copy[selected_swatch].hue = hue;
    arr_copy[selected_swatch].sat = sat;
    arr_copy[selected_swatch].lum = lum;
    setSwatches(arr_copy);
    setPoint({x: sat * 2, y: lum * 2});
  }

  function changePoint(point: {x: number, y: number}) {
    changeSelectedSwatch(swatches[selected_swatch].hue, point.x/2, point.y/2);
  }

  function addSwatch() {
    if (swatches.length === 16) {
      return;
    }

    console.log(...swatches);
    let new_swatch = {
      hue: random(0,360),
      sat: random(0,100),
      lum: random(0,100),
    }
    let newarr: Swatch[] = [...swatches, new_swatch];
    setSwatches(newarr);
    setSelectedSwatch(newarr.length - 1);
  }

  function deleteSwatch() {
    if (swatches.length === 1) {
      return;
    }

    let newarr: Swatch[] = [...swatches];
    newarr.splice(selected_swatch, 1);
    setSwatches(newarr);
    if (!(selected_swatch === 0)) {
        setSelectedSwatch(selected_swatch - 1);
    }
  }

  function selectSwatch(num: number) {
    setSelectedSwatch(num);
  }

  // Update Point When Needed
  useEffect(() => {
    if (swatches[selected_swatch]) {
      setPoint({x: swatches[selected_swatch].sat * 2, y: swatches[selected_swatch].lum * 2});
    }
  }, [swatches, selected_swatch]);

  // Run Once
  useEffect(() => {
    let newSwatches = [];
    for (let i = 0; i < 10; ++i) {
      newSwatches.push({
        hue: random(0,360),
        sat: random(0,100),
        lum: random(0,100),
      });
    }
    setSwatches(newSwatches);
    setSelectedSwatch(0);
    setPoint({x: newSwatches[selected_swatch].sat * 2, y: newSwatches[selected_swatch]?.lum * 2});
  }, []);

  return (
    <div style={containerStyle}>
      <Top swatches={swatches} addSwatch={addSwatch} deleteSwatch={deleteSwatch}></Top>
      <div style={editorStyle}>
        <div style={canvasContainerStyle}>
          <Canvas selected_swatch={selected_swatch} swatches={swatches} changePoint={changePoint} point={point}></Canvas>
          <Canvas2 selected_swatch={selected_swatch} swatches={swatches} changeSelectedSwatch={changeSelectedSwatch}></Canvas2>
        </div>
        <HSL selected_swatch={selected_swatch} swatches={swatches} changeSelectedSwatch={changeSelectedSwatch}></HSL>
      </div>
      <SwatchSection selected_swatch={selected_swatch} swatches={swatches} selectSwatch={selectSwatch}></SwatchSection>
      <Status selected_swatch={selected_swatch} swatches={swatches}></Status>
    </div>
  );
}

render(<App />, document.body);