<script setup>
import Konva from "konva";
import { ref, watch, shallowRef } from "vue";
import { useStageHooks } from "./konvaHooks/stage";
import { createRuler } from "./konvaHooks/konvaRuler";
import { useBackgroundHooks } from "./konvaHooks/background";

const props = withDefaults(defineProps(), {
  stageWidth: 500,
  stageHeight: 300,
});

const containerEl = ref(null);
const containerLayer = shallowRef(null);
watch(
  () => containerEl.value,
  () => {
    if (containerEl.value !== null) {
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

  const stage = useStageHooks({ containerEl, containerLayer }).createStage({
    stageWidth,
    stageHeight,
    offsetX,
    offsetY,
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
const { uploadBackground, changeBackground, clearBackground } =
  useBackgroundHooks(containerLayer, loading);

const dragstart = (ev, item) => {};
const changeNode = () => {};
const getPos = () => {};
</script>

<template>
  <div class="options">
    <div class="bg">
      <button
        @click="
          uploadBackground(
            'https://test204.rd.chn-das.com/oss/business/t6975983572026373/iwm/stationMap/2023-07-26/地图20230726-162326DxTr1Dh-EmG88-ahPMe2gzli5zeyAhA6KFCO_7Clr0.jpg'
          )
        "
      >
        上传背景图
      </button>
      <button
        @click="
          changeBackground(
            'http://192.168.100.204/oss/business/t6975983572026373/iwm/stationMap/2023-07-25/2-3-2答题-填字题20230725-193819gHagRNU-BSLhxPpMHg27B6DaC9Y0ix5U-wPop8ebUI.png'
          )
        "
      >
        替换背景图
      </button>
      <button @click="clearBackground">删除画布</button>
    </div>
    <div class="node">
      <button @dragstart="(e) => dragstart(e, item)" :draggable="true">
        拖我拖我
      </button>
      <button @click="changeNode">替换节点</button>
      <button @click="getPos">点击获取坐标</button>
    </div>
  </div>
  <div
    class="konva-box"
    ref="containerEl"
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
