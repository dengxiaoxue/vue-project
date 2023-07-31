const rulerHeight = 10; // 刻度高
  const precision = 10; // 精度
  const ruler = new Konva.Shape({
    x: 0,
    y: 0, // 左上角位置
    fill: "#EAEAEA", // 填充的颜色
    stroke: "red",
    strokeWidth: 0.5,
    width: stageWidth,
    height: rulerHeight,
    sceneFunc: function (context, shape) {
      const w = shape.getAttr("width");
      const h = shape.getAttr("height");

      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(w, 0);
      context.lineTo(w, h);
      context.lineTo(h, h);
      context.lineTo(h, stageHeight);
      context.lineTo(0, stageHeight);
      context.closePath();

      let count = 0;
      for (let i = precision; i < w; i = i + precision) {
        count++;
        context.rect(i, 0, 0, 10);
      }
      console.log(count);
      context.fillStrokeShape(shape);
    },
  });

const loading = ref(false);
const imageURL =
  "https://test204.rd.chn-das.com/oss/business/t6975983572026373/iwm/stationMap/2023-07-26/地图20230726-162326DxTr1Dh-EmG88-ahPMe2gzli5zeyAhA6KFCO_7Clr0.jpg";
const uploadBackground = () => {
  if (!containerLayer.value) return;
  loading.value = true;
  // 方法一
  Konva.Image.fromURL(
    imageURL,
    function (image) {
      image.setAttrs({
        id: "BackgroundImage",
      });
      containerLayer.value.add(image);
      loading.value = false;
    },
    () => {
      console.log("onError");
    }
  );
  // 方法二
  // addImage({
  //   src: imageURL,
  //   id: "BackgroundImage",
  //   draggable: false,
  // }).then((bg) => {
  //   bg && containerLayer.value.add(bg);
  //   loading.value = false;
  //   return bg;
  // });
};
const addImage = (config) => {
  const { src = "" } = config || {};
  return new Promise((res, rej) => {
    if (!src) return res(null);
    const defaultImage = new Image();
    defaultImage.src = config.src || "";
    defaultImage.onload = () => {
      const imageObject = new Konva.Image({ image: defaultImage });
      config["setDefaultImage"] = () => imageObject.image(defaultImage);
      imageObject.setAttrs(config);
      const extendImages = [
        { getter: "hoverSrc", setter: "setHoverImage" },
        { getter: "activeSrc", setter: "setActiveImage" },
        { getter: "disabledSrc", setter: "setDisabledImage" },
      ];
      for (const item of extendImages) {
        config[item.setter] = (newStr) => {
          const newImageSrc = newStr || imageObject.attrs[item.getter];
          if (!newImageSrc) return;
          const image = new Image();
          image.src = newImageSrc;
          image.onload = () => imageObject.image?.(image);
        };
      }
      imageObject.setAttrs(config);
      res(imageObject);
    };
  });
};