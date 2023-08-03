import Konva from "konva";

export const useBackgroundHooks = (containerLayer, loading) => {
  let BackgroundImageObject: any = null;

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
        BackgroundImageObject = image;
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
    BackgroundImageObject.attrs.src = imageURL;
    const newImage = new Image();
    newImage.src = imageURL;
    newImage.onload = () => {
      BackgroundImageObject.image(newImage);
      loading.value = false;
    };
  };

  const clearBackground = () => {
    if (!isUploadBackground()) return;
    BackgroundImageObject.destroy();
    BackgroundImageObject = null;
  };

  const isUploadBackground = () => {
    // containerLayer.value.find("#BackgroundImage").length > 0
    return BackgroundImageObject ? true : false;
  };
  return {
    uploadBackground,
    isUploadBackground,
    changeBackground,
    clearBackground,
  };
};
