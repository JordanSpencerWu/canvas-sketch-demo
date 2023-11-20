const canvasSketch = require("canvas-sketch");
import * as Tweakpane from "tweakpane";

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const params = {
  cells: 15,
  margin: 10,
  syncFactor: 0.0001,
  slowFactor: 0.09,
  fill: false,
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    let x, y, f, distance;

    const canvasWidth = width - params.margin * 2;
    const canvasHeight = height - params.margin * 2;
    const cellWidth = Math.floor(canvasWidth / params.cells);
    const cellHeight = Math.floor(canvasHeight / params.cells);
    const radius = cellWidth * 0.5;

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "white";
    context.fillStyle = "white";
    context.lineWidth = 2;

    for (let i = 0; i < params.cells; i++) {
      for (let j = 0; j < params.cells; j++) {
        context.save();

        x = params.margin + cellWidth * 0.5 + cellWidth * i;
        y = params.margin + cellHeight * 0.5 + cellHeight * j;
        distance = getDistance(width / 2, height / 2, x, y) * params.syncFactor;
        f = Math.abs(Math.sin(frame * params.slowFactor + distance));
        context.translate(x, y);

        context.beginPath();
        context.arc(0, 0, radius * f, 0, 2 * Math.PI);

        if (params.fill) {
          context.fill();
        } else {
          context.stroke();
        }

        context.restore();
      }
    }
  };
};

const getDistance = (x1, y1, x2, y2) => {
  const dx = x1 - x2;
  const dy = y1 - y2;

  return Math.sqrt(dx * dx + dy * dy);
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: "Controls" });
  folder.addInput(params, "cells", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "margin", { min: 0, max: 50, step: 1 });
  folder.addInput(params, "syncFactor", {
    min: 0.0001,
    max: 0.025,
    step: 0.001,
  });
  folder.addInput(params, "slowFactor", {
    min: 0.009,
    max: 0.09,
    step: 0.001,
  });
  folder.addInput(params, "fill");
};

createPane();
canvasSketch(sketch, settings);
