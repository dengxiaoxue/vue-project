<script setup>
import Konva from "konva";
import { ref, watch, shallowRef } from "vue";
import { createRuler } from "./konvaHooks/konvaRuler";

const props = withDefaults(defineProps(), {
  stageWidth: 500,
  stageHeight: 300,
});

const container = ref(null);
const containerLayer = shallowRef(null);
watch(
  () => container.value,
  () => {
    if (container.value !== null) {
      initCanvas();
    }
  }
);

const initCanvas = () => {
  const stageWidth = 500;
  const stageHeight = 300;
  const rulerHeight = 20; // 刻度高
  const rulerWidth = 20;
  const offsetX = rulerWidth || 0;
  const offsetY = rulerHeight || 0;

  const stage = new Konva.Stage({
    container: container.value, // id of container <div>
    width: stageWidth,
    height: stageHeight,
    draggable: false, // 只设置stage的draggable，可以拖动的是整个画布
    offsetX: -offsetX, // 设置偏移量，刻度不占位置
    offsetY: -offsetY,
  });

  //创建层 layer
  containerLayer.value = new Konva.Layer({
    id: "containerLayerId",
    draggable: true, // 只设置layer的draggable，可以拖动的是整个layer
  });

  const rulerLayer = createRuler({
    stageWidth,
    stageHeight,
    rulerWidth,
    rulerHeight,
    precision: 10,
    backgroundColor: "#f0f0f0",
    lineColor: "#ccc",
    textColor: "#212121",
    fontSize: 10,
  });

  // const rect = new Konva.Rect({
  //   x: 10,
  //   y: 10,
  //   width: 100,
  //   height: 100,
  //   fill: "blue",
  // });
  // const rect2 = new Konva.Circle({
  //   x: 200,
  //   y: 100,
  //   width: 100,
  //   height: 100,
  //   fill: "pink",
  // });
  // rect2.on("click", function () {
  //   console.log(rect2.getAbsolutePosition(stage));
  // });
  // rect.on("click", function () {
  //   console.log(rect.getAbsolutePosition(stage));
  // });
  // containerLayer.value.add(rect);
  // containerLayer.value.add(rect2);

  stage.add(containerLayer.value); //将层添加至舞台
  stage.add(rulerLayer);
};

const loading = ref(false);
const imageURL =
  "https://test204.rd.chn-das.com/oss/business/t6975983572026373/iwm/stationMap/2023-07-26/地图20230726-162326DxTr1Dh-EmG88-ahPMe2gzli5zeyAhA6KFCO_7Clr0.jpg";
const uploadBackground = () => {
  console.log(hasBackground());
  if (!containerLayer.value || hasBackground()) return;
  console.log(123);
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
};
const hasBackground = () => {
  return containerLayer.value.find("#BackgroundImage").length > 0
    ? true
    : false;
};

const changeBackground = () => {};
const clearBackground = () => {};
const dropStart = () => {};
const changeNode = () => {};
const getPos = () => {};
</script>

<template>
  <div class="options">
    <div class="bg">
      <button @click="uploadBackground">上传背景图</button>
      <button @click="changeBackground">替换背景图</button>
      <button @click="clearBackground">删除画布</button>
    </div>
    <div class="node">
      <button @click="dropStart">拖我拖我</button>
      <button @click="changeNode">替换节点</button>
      <button @click="getPos">点击获取坐标</button>
    </div>
  </div>
  <div
    class="konva-box"
    ref="container"
    id="container"
    :class="{ loading: loading }"
  ></div>
</template>

<style>
.konva-box {
  margin: 10px;
  width: 500px;
  height: 300px;
  border: 1px solid pink;
  position: relative;
}
.loading::after {
  display: block;
  content: "";
  width: 30px;
  height: 30px;
  border: 2px solid #f1b0b0;
  border-top-color: transparent;
  border-radius: 100%;
  position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 15px);

  animation: circle infinite 0.75s linear;
}
button {
  margin: 10px;
}
@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
