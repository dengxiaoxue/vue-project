import Konva from "konva";

export const useTransformHooks = ({
  konvaStage,
  containerEl,
  containerLayer,
}) => {
  const addTransformer = () => {
    var tr = new Konva.Transformer({
      anchorStroke: "red",
      anchorFill: "yellow",
      anchorSize: 5,
      borderStroke: "green",
      // borderDash: [3, 3],
      centeredScaling: true,
      rotationSnaps: [0, 90, 180, 270], // 旋转吸附
    });
    containerLayer.value.add(tr);

    konvaStage.value.on("click", (e) => {
      if (e.target === konvaStage.value) {
        tr.nodes([]);
        return;
      }
      // tr.nodes([e.target]);
      tr.attachTo(e.target);
      // tr.rotateEnabled(e.target.name() !== 'backgroundImage')
    });
  };

  return { addTransformer };
};
