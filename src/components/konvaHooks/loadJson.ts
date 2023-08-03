import Konva from "konva";
import { ref, watch } from "vue";

export const useLoadJSONHooks = ({
  konvaStage,
  containerEl,
  containerLayer,
  rulerLayer,
}) => {
  const toJSON = () => {
    if (!konvaStage.value) return {};
    return konvaStage.value.toJSON();
  };

  const loadJSON = (json: any) => {
    return new Promise((resolve, reject) => {
      konvaStage.value = Konva.Node.create(json, containerEl.value);
      containerLayer.value = konvaStage.value
        .getLayers()
        .find((item: any) => item.getAttr("id") === "containerLayerId");
      rulerLayer.value = konvaStage.value
        .getLayers()
        .find((item: any) => item.getAttr("id") === "rulerLayerId");
      konvaStage.value.find("Image").forEach((item: any) => {
        const imageObj = new Image();
        imageObj.src = item.attrs.src;
        imageObj.onload = () => {
          item.image(imageObj);
          resolve({
            stage: konvaStage.value,
            layer: containerLayer.value,
            rulerLayer: rulerLayer.value,
          });
        };
      });
    });
  };

  return { toJSON, loadJSON };
};
