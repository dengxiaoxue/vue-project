import Konva from "konva";
import { ref, watch } from "vue";

export const createRuler = ({
  stageWidth = 500,
  stageHeight = 500, 
  rulerWidth = 20,
  rulerHeight = 20, 
  precision=10, 
  backgroundColor="#f0f0f0", 
  lineColor="#ccc", 
  textColor="#F56C6C", 
  fontSize=10, 
  opacity = 0.6
}) => {
  
  const rulerLayer = new Konva.Layer({
    id: 'rulerLayerId',
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
  return rulerLayer
}