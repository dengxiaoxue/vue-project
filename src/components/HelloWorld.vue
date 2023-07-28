<script setup>
import { Graph } from "@antv/x6";
import { Dnd } from "@antv/x6-plugin-dnd";
import { Transform } from "@antv/x6-plugin-transform";
import { ref, watch, shallowRef } from "vue";
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
const container = ref();
const graph = shallowRef();
const dnd = ref();
const pos = ref();
const parent = shallowRef();
watch(
  () => container.value,
  () => {
    if (container.value !== null) initGraph();
  }
);
const initGraph = () => {
  graph.value = new Graph({
    container: document.getElementById("container"),
    width: 800,
    height: 600,
    background: true,
  });
  graph.value.drawBackground({
    color: "#f5f5f5",
    image: undefined,
  });
  dnd.value = new Dnd({
    target: graph.value,
    // 自定义拖拽节点的样式
    getDragNode(node) {
      // 这里返回一个新的节点作为拖拽节点
      const res = graph.value.createNode({
        width: 20,
        height: 20,
        id: node?.id,
        shape: "image",
        attrs: {
          image: {
            fill: "#ccc",
            stroke: "pink",
            width: 40,
            height: 40,
            xlinkHref:
              "data:image/jpeg;base64,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",
          },
          label: {
            fontSize: 14,
            fill: "yellow",
            text: "图片",
          },
        },
      });
      return res;
    },
    // 拖拽结束时，获取放置到目标画布的节点，默认克隆被拖拽的节点。
    getDropNode(node) {
      const { width, height } = node.size();
      // 返回一个新的节点作为实际放置到画布上的节点
      // 获取节点位置
      const res = node.clone({ keepId: true }).size(width * 2, height * 2);
      parent.value.addChild(res);
      selectedId.value = res.id;
      selectedNode.value = res;
      return res;
      // return graph.value.createNode({
      //   width: 20,
      //   height: 20,
      //   shape: "rect",
      //   attrs: {
      //     body: {
      //       fill: "#ccc",
      //       stroke: "pink",
      //     },
      //   },
      // });
    },
    // 拖拽结束时，验证节点是否可以放置到目标画布中
    validateNode(node) {
      getNodePos();
      return true;
    },
  });
  graph.value.use(
    new Transform({
      resizing: {
        enabled: true,
        orthogonal: false,
        restrict: false,
        preserveAspectRatio: false,
      },
      rotating: {
        enabled: true,
        grid: 15,
      },
    })
  );

  initEvent();
  graph.value.fromJSON({});
};

const initEvent = () => {
  graph.value.on("node:delete", ({ view, e }) => {
    e.stopPropagation();
    view.cell.remove();
    parent.value = null;
  });
  graph.value.on("node:click", ({ e, x, y, node, view }) => {
    selectedId.value = node.id;
    selectedNode.value = node.clone({ keepId: true });
    getNodePos();
  });
  graph.value.on("node:added", ({ node }) => {
    pos.value = node.position();
  });
};

// 背景图
const BackgroundlinkHref = ref(
  "https://test204.rd.chn-das.com/oss/business/t6975983572026373/iwm/stationMap/2023-07-26/地图20230726-162326DxTr1Dh-EmG88-ahPMe2gzli5zeyAhA6KFCO_7Clr0.jpg"
);
const uploadBackground = () => {
  if (parent.value) return;
  parent.value = graph.value.addNode({
    x: 80,
    y: 40,
    id: "Background",
    shape: "image",
    width: 320,
    height: 240,
    zIndex: 0,
    label: "Parent\n(try to move me)",
    attrs: {
      image: {
        fill: "#ccc",
        stroke: "pink",
        width: 40,
        height: 40,
        xlinkHref: BackgroundlinkHref.value,
      },
      label: {
        event: "node:delete",
        fontSize: 14,
        fill: "red",
        text: "删除",
      },
    },
  });
};
const clearBackgroud = () => {
  if (parent.value) {
    parent.value?.remove();
    parent.value = null;
  }
};
const updateBackground = () => {
  if (parent.value) {
    parent.value?.remove();
    parent.value = null;
    BackgroundlinkHref.value =
      "http://192.168.100.204/oss/business/t6975983572026373/iwm/stationMap/2023-07-25/2-3-2答题-填字题20230725-193819gHagRNU-BSLhxPpMHg27B6DaC9Y0ix5U-wPop8ebUI.png";
    uploadBackground();
  }
};

// 拖拽节点
let count = 0;
const selectedId = ref(0);
const selectedNode = ref(null);
function dragstart(e, data) {
  // 该 node 为拖拽的节点，默认也是放置到画布上的节点，可以自定义任何属性
  const node = graph.value.createNode({
    shape: "rect",
    width: 100,
    height: 40,
    id: ++count,
  });
  dnd.value.start(node, e);
}
const getNodePos = () => {
  if (!selectedNode.value) return;
  // 是否返回相对于父节点的相对位置，默认为 false 表示返回节点相对于画布的绝对位置。
  pos.value = selectedNode.value.position({ relative: false });
};
const setNodePos = () => {
  if (!selectedNode.value) return;
  selectedNode.value.position(100, 100, { relative: false });
  pos.value = selectedNode.value.position({ relative: false });
};
const updateNode = () => {
  // const nodes = graph.value.getNodes();
  if (!selectedNode.value) return;
  selectedNode.value.attr(
    "image/xlinkHref",
    "data:image/png;base64,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"
  );
  // selectedNode.value.prop("size", { width: 100, height: 100 });
  // selectedNode.value.size(100, 100);
  // console.log(selectedNode.value.prop());
};
let json = null;
const toJSON = () => {
  json = graph.value.toJSON();
};
const fromJSON = () => {
  graph.value.fromJSON(json);
  const nodes = graph.value.getNodes();
  nodes.forEach((item) => {
    if (item.id === "Background") parent.value = item;
  });
};
</script>

<template>
  <div class="box">
    <button @click="uploadBackground">上传背景图</button>
    <button @click="clearBackgroud">清除背景图</button>
    <button @click="updateBackground">替换背景图</button>
  </div>
  <div class="box">
    <button @click="updateNode">替换图标</button>
    <button @click="setNodePos">修改图标位置</button>
  </div>
  <div class="box">
    <button @click="toJSON">序列化</button>
    <button @click="fromJSON">反序列化</button>
  </div>
  <div id="container" ref="container"></div>
  <button @dragstart="(e) => dragstart(e, item)" :draggable="true">拖我</button>
  <div>位置：{{ pos }}</div>
  <div>当前id: {{ selectedId }}</div>
</template>

<style scoped>
.box {
  width: 100%;
}
.my-selecting {
  border: 1px solid pink;
}
</style>
