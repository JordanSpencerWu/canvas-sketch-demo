const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
import * as Tweakpane from "tweakpane";

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const params = {
  n: 30,
  degree: 1,
  useCustomDegree: true,
};

const sketch = () => {
  return ({ context, width, height }) => {
    let degree = 360 / params.n;

    if (params.useCustomDegree) degree = params.degree;

    let angle = math.degToRad(degree * params.n);

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    context.translate(width * 0.5, height * 0.5);
    context.rotate(angle);
    context.lineWidth = 4;
    context.strokeStyle = "white";

    for (let i = 0; i < params.n; i++) {
      const pecentage = 0.65;
      const scale = math.mapRange(i, 0, params.n, 0.2, 1, true);
      const length = width * pecentage * scale;
      angle = math.degToRad(degree * i);

      context.save();

      const x = Math.floor(length * 0.5);
      const y = Math.floor(length * 0.5);
      context.rotate(-angle);

      context.beginPath();
      context.rect(-x, -y, length, length);
      context.stroke();

      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: "Controls" });
  folder.addInput(params, "n", { min: 1, max: 50, step: 1 });
  folder.addInput(params, "degree", { min: 1, max: 180, step: 0.5 });
  folder.addInput(params, "useCustomDegree");
};

createPane();

canvasSketch(sketch, settings);
