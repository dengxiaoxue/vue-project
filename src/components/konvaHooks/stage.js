import Konva from "konva";
import { ref, watch } from "vue";

export const useStageHooks = ({ containerEl, containerLayer }) =>{

  const createStage = ({stageWidth, stageHeight, offsetX, offsetY}) => {

    // 创建舞台
    const stage = new Konva.Stage({
      container: containerEl.value, // id of container <div>
      width: stageWidth,
      height: stageHeight,
      draggable: false, // 只设置stage的draggable，可以拖动的是整个画布
      offsetX: -offsetX, // 设置偏移量，刻度不占位置
      offsetY: -offsetY,
    });

    // 添加舞台事件
    addStageEvent(stage)

    //创建层 layer
    containerLayer.value = new Konva.Layer({
      id: "containerLayerId",
      draggable: true, // 只设置layer的draggable，可以拖动的是整个layer
    });

    return stage
  }

  const addStageEvent = (stage) => {
    containerEl.value.addEventListener("dragover", (e) => {
      e.preventDefault();
      console.log("拖拽1");
    });
    containerEl.value.addEventListener("drop", (e) => {
      e.preventDefault();
      stage.setPointersPositions(e);
      const rect2 = new Konva.Rect({
        width: 100,
        height: 100,
        fill: "pink",
        draggable: true
      });
      containerLayer.value.add(rect2)
      console.log(stage.getPointerPosition(), rect2.getAbsolutePosition(stage))
      rect2.position(stage.getPointerPosition())
      console.log("拖拽2");
    });
  }

  return { createStage }
}