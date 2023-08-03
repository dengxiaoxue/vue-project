<script setup>
import { ref, watch, shallowRef } from "vue";
import {
  useStageHooks,
  createRuler,
  useBackgroundHooks,
  useCreateNodeHooks,
  useLoadJSONHooks,
  useTransformHooks,
} from "./konvaHooks/index";

const props = withDefaults(defineProps(), {
  stageWidth: 500,
  stageHeight: 300,
});

const containerEl = ref(null);
const containerLayer = shallowRef(null);
const rulerLayer = shallowRef(null);
const konvaStage = shallowRef(null);
const dropNode = shallowRef(null); // 当前拖拽的节点
watch(
  () => containerEl.value,
  () => {
    if (containerEl.value !== null) {
      initCanvas();
    }
  }
);

const stageWidth = 500;
const stageHeight = 300;
const rulerHeight = 20; // 刻度高
const rulerWidth = 20;
const offsetX = rulerWidth || 0;
const offsetY = rulerHeight || 0;
const { createStage, zoom } = useStageHooks({
  containerEl,
  containerLayer,
  offsetX,
  offsetY,
  dropNode, // 当前拖拽的节点
  konvaStage,
  rulerLayer,
  stageWidth,
  stageHeight,
});
const { addTransformer } = useTransformHooks({
  konvaStage,
  containerEl,
  containerLayer,
});

const initCanvas = () => {
  createStage();

  rulerLayer.value = createRuler();

  konvaStage.value.add(containerLayer.value); //将层添加至舞台
  konvaStage.value.add(rulerLayer.value);
};

const loading = ref(false);
const { uploadBackground, changeBackground, clearBackground } =
  useBackgroundHooks(containerLayer, loading, konvaStage, initCanvas);

const { createNode, getAbsolutePositionForStage } = useCreateNodeHooks({
  konvaStage,
  dropNode,
});

const { toJSON, loadJSON } = useLoadJSONHooks({
  konvaStage,
  containerEl,
  containerLayer,
  rulerLayer,
});

let count = 0;
const dragstart = (ev, item) => {
  const node = createNode({
    id: count++ + "",
    width: 20,
    height: 20,
    fill: "pink",
    draggable: true,
  });
  node.on("click", () => {
    console.log(getAbsolutePositionForStage(node));
    addTransformer();
  });
};
const changeNode = () => {};
const setPos = () => {
  dropNode.value.x(100);
  dropNode.value.y(100);
};

// 序列化
let json = "";
const ToJSON = () => {
  json = toJSON();
};
const LoadJSON = async () => {
  loading.value = true;
  await loadJSON(json);
  loading.value = false;
};

// 放大缩小重置
const zoomStage = (type) => zoom(type);

defineExpose({
  uploadBackground,
  changeBackground,
  clearBackground,
});
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
      <button @click="ToJSON">序列化</button>
      <button @click="LoadJSON">反序列化</button>
    </div>
    <div class="stage">
      <button @click="zoomStage('out')">放大舞台</button>
      <button @click="zoomStage('in')">缩小舞台</button>
      <button @click="zoomStage">重置舞台</button>
    </div>
    <div class="node">
      <button @dragstart="(e) => dragstart(e, item)" :draggable="true">
        拖我拖我
      </button>
      <button @click="changeNode">替换节点</button>
      <button @click="setPos">修改图标位置</button>
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
