import Konva from "konva";

export const useBackgroundHooks = (
  containerLayer,
  loading,
  konvaStage,
  initCanvas
) => {
  const uploadBackground = (imageURL) => {
    if (!containerLayer.value || isUploadBackground()) return;
    loading.value = true;
    // 方法一
    Konva.Image.fromURL(
      imageURL,
      function (image) {
        image.setAttrs({
          id: "BackgroundImage",
          src: imageURL,
        });
        containerLayer.value.add(image);
        loading.value = false;
      },
      () => {
        console.log("onError");
      }
    );
  };

  const changeBackground = (imageURL) => {
    if (!isUploadBackground()) return;
    loading.value = true;

    const imgObject = containerLayer.value.find("#BackgroundImage")[0];
    imgObject.attrs.src = imageURL;

    const newImage = new Image();
    newImage.src = imageURL;
    newImage.onload = () => {
      imgObject.image(newImage);
      loading.value = false;
    };
  };

  const clearBackground = () => {
    if (!isUploadBackground()) return;
    konvaStage.value.remove();
    initCanvas();
  };

  const isUploadBackground = () => {
    return containerLayer.value.find("#BackgroundImage").length > 0;
  };
  return {
    uploadBackground,
    isUploadBackground,
    changeBackground,
    clearBackground,
  };
};
