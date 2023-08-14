import Konva from "konva";

export const createRuler = (rulerConfig?: any) => {
  const {
    stageWidth = 500,
    stageHeight = 500,
    rulerWidth = 20,
    rulerHeight = 20,
    precision = 10,
    backgroundColor = "#f0f0f0",
    lineColor = "#ccc",
    textColor = "#212121",
    fontSize = 10,
    opacity = 0.6,
  } = rulerConfig || {};
  const rulerLayer: any = new Konva.Layer({
    id: "rulerLayerId",
    draggable: false,
  });

  // 多边形
  const ruler = new Konva.Line({
    points: [
      0,
      0,
      stageWidth,
      0,
      stageWidth,
      -rulerHeight,
      -rulerWidth,
      -rulerHeight,
      -rulerWidth,
      stageHeight,
      0,
      stageHeight,
      0,
      0,
    ],
    fill: backgroundColor,
    closed: true,
    stroke: lineColor,
    strokeWidth: 1,
    opacity: opacity,
  });
  rulerLayer.add(ruler);
  rulerLayer.add(
    new Konva.Text({
      x: -8,
      y: -8,
      text: "0",
      fontSize: fontSize,
      fill: textColor,
      listening: false,
    })
  );

  // X轴刻度
  for (let i = precision; i < stageWidth; i = i + precision) {
    const line = new Konva.Line({
      points: [i, 0, i, i % 100 === 0 ? -rulerHeight : -rulerHeight / 2],
      stroke: lineColor,
      strokeWidth: 1,
    });
    rulerLayer.add(line);
    if (i % 100 === 0) {
      rulerLayer.add(
        new Konva.Text({
          x: i + 1,
          y: -rulerHeight + 2,
          text: "" + i,
          fontSize: fontSize,
          fill: textColor,
          listening: false,
        })
      );
    }
  }
  // y轴刻度
  for (let j = precision; j < stageHeight; j = j + precision) {
    const line = new Konva.Line({
      points: [0, j, j % 100 === 0 ? -rulerWidth : -rulerWidth / 2, j],
      stroke: lineColor,
      strokeWidth: 1,
    });
    rulerLayer.add(line);
    if (j % 100 === 0) {
      rulerLayer.add(
        new Konva.Text({
          x: -rulerWidth,
          y: j + 1,
          text: "" + j,
          fontSize: fontSize,
          fill: textColor,
          listening: false,
        })
      );
    }
  }

  rulerLayer.$update = (config) => {
    rulerLayer.remove();
    return createRuler(config);
  };
  return rulerLayer;
};
