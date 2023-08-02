import Konva from "konva";

export const useCreateNodeHooks = ({ konvaStage, dropNode }) => {
  const createNode = (congig) => {
    dropNode.value = new Konva.Circle({ ...congig });
    return dropNode.value;
  };

  // 获取相对于画布的绝对位置，包括偏移位置 设置位置用node.x(x)/node.y(y)
  const getAbsolutePositionForStage = (node) => {
    return node.getAbsolutePosition(konvaStage.value);
  };

  return {
    createNode,
    getAbsolutePositionForStage,
  };
};
