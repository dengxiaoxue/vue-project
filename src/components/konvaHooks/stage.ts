import Konva from "konva";

export const useStageHooks = ({
  containerEl,
  containerLayer,
  offsetX,
  offsetY,
  dropNode,
  konvaStage,
  rulerLayer,
  stageWidth,
  stageHeight,
}) => {
  const createStage = () => {
    // 创建舞台
    konvaStage.value = new Konva.Stage({
      container: containerEl.value, // id of container <div>
      width: stageWidth,
      height: stageHeight,
      draggable: false, // 只设置stage的draggable，可以拖动的是整个画布
      offsetX: -offsetX, // 设置偏移量，刻度不占位置
      offsetY: -offsetY,
    });

    // 添加舞台事件
    addStageEvent();

    //创建层 layer
    containerLayer.value = new Konva.Layer({
      id: "containerLayerId",
      draggable: true, // 只设置layer的draggable，可以拖动的是整个layer
    });

    return konvaStage.value;
  };

  // konva不支持drop和drag Dom 到stage上，只能通过原生事件监听: https://konvajs.org/docs/sandbox/Drop_DOM_Element.html#sidebar
  const addStageEvent = () => {
    containerEl.value.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    containerEl.value.addEventListener("drop", (e) => {
      e.preventDefault();
      konvaStage.value.setPointersPositions(e);
      const res = containerLayer.value.getAbsolutePosition(konvaStage.value);
      containerLayer.value.add(dropNode.value);
      const originPos = konvaStage.value.getPointerPosition();
      const absolutePointerPos = {
        x: originPos.x - offsetX - res.x,
        y: originPos.y - offsetY - res.y,
      };
      dropNode.value.position(absolutePointerPos);
    });
  };

  const zoom = (
    /** 缩放类型：in表示缩小 out表示放大 reset，不填则表示还原 */
    type?: "in" | "out",
    /** 缩放系数：默认0.1 */
    radio?: number
  ) => {
    const oldScale = konvaStage.value?.scaleX() || 1;
    if (radio === undefined) radio = 0.1;
    let newScale = 1;
    if (type === "in") newScale = oldScale - radio;
    if (type === "out") newScale = oldScale + radio;
    konvaStage.value?.scale({ x: newScale, y: newScale });
    if (rulerLayer.value) {
      rulerLayer.value = rulerLayer.value.$update({
        stageWidth: stageWidth / newScale,
        stageHeight: stageHeight / newScale,
      });
      konvaStage.value.add(rulerLayer.value);
    }
  };

  return { createStage, zoom };
};
