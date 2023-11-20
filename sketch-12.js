const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = ({ width, height }) => {
  const cells = 10;
  const margin = 10;

  const canvasWidth = width - margin * 2;
  const canvasHeight = height - margin * 2;
  const cellWidth = Math.floor(canvasWidth / cells);
  const cellHeight = Math.floor(canvasHeight / cells);
  const radius = cellWidth * 0.5;

  return ({ context, width, height }) => {
    let x, y;

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    context.save();
    x = margin;
    y = margin;
    context.translate(x, y);

    context.fillStyle = "white";

    for (let i = 0; i < cells; i++) {
      for (let j = 0; j < cells; j++) {
        context.save();

        x = cellWidth * 0.5 + cellWidth * i;
        y = cellHeight * 0.5 + cellHeight * j;
        context.translate(x, y);

        context.beginPath();
        context.arc(0, 0, radius, 0, 2 * Math.PI);
        context.fill();

        context.restore();
      }
    }

    context.restore();
  };
};

canvasSketch(sketch, settings);
