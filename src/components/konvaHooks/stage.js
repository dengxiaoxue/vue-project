import Konva from "konva";
import { ref, watch } from "vue";

export const useStageHooks = ({ containerEl, containerLayer, offsetX, offsetY, dropNode }) =>{

  const createStage = ({stageWidth, stageHeight}) => {

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

  // konva不支持drop和drag Dom 到stage上，只能通过原生事件监听: https://konvajs.org/docs/sandbox/Drop_DOM_Element.html#sidebar
  const addStageEvent = (stage) => {
    containerEl.value.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    containerEl.value.addEventListener("drop", (e) => {
      e.preventDefault();
      stage.setPointersPositions(e);
      containerLayer.value.add(dropNode.value)
      const originPos = stage.getPointerPosition()
      const absolutePointerPos = {
        x: originPos.x - offsetX,
        y: originPos.y - offsetY
      }
      dropNode.value.position(absolutePointerPos)
    });
  }

  return { createStage }
}