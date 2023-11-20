const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const cells = 50;
const margin = 20;
const patterns = [0, 1, 2, 3];

const sketch = () => {
  return ({ context, width, height }) => {
    const cellWidth = (width - margin * 2) / cells;
    const cellHeight = (height - margin * 2) / cells;

    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.lineWidth = 4;

    for (let i = 0; i < cells; i++) {
      for (let j = 0; j < cells; j++) {
        const randomPattern = random.pick(patterns);
        context.save();

        const x = margin + cellWidth * i;
        const y = margin + cellHeight * j;
        context.translate(x, y);

        if (randomPattern === 0) {
          context.beginPath();
          context.moveTo(0, 0);
          context.lineTo(cellWidth, cellHeight);
          context.stroke();
        } else if (randomPattern === 1) {
          context.beginPath();
          context.moveTo(cellWidth, 0);
          context.lineTo(0, cellHeight);
          context.stroke();
        } else if (randomPattern === 2) {
          context.beginPath();
          context.moveTo(cellWidth * 0.5, 0);
          context.lineTo(cellWidth * 0.5, cellHeight);
          context.stroke();
        } else {
          context.beginPath();
          context.moveTo(0, cellHeight * 0.5);
          context.lineTo(cellWidth, cellHeight * 0.5);
          context.stroke();
        }

        context.restore();
      }
    }
  };
};

canvasSketch(sketch, settings);
