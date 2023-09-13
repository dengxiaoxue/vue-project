<script setup lang="ts">
import { onMounted } from "vue";
import { useEditor } from "./x6Hooks/index";
import type { DimpleLayoutEditorOptions } from "./x6Hooks/type.d";

const props = defineProps<{ options?: DimpleLayoutEditorOptions }>();

const { initGraph, containerEl, canvas } = useEditor();

onMounted(() => {
  initGraph(props.options || {});
});
defineExpose({
  canvas,
});
</script>

<template>
  <div class="x6-canvas-wrap">
    <div class="tools">
      <slot name="tool-bar">
        <button @dragstart="canvas.$dragstart" :draggable="true">拖我</button>
        <button @mousedown="canvas.$dragstart">拖我</button>
        <button @click="canvas.$uploadBackground">上传背景图</button>
      </slot>
    </div>
    <div id="container" ref="containerEl" class="container"></div>
  </div>
</template>

<style scoped>
.tools {
  display: flex;
  justify-content: space-between;
}
.x6-canvas-wrap {
  border: 1px solid red;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.container {
  display: flex;
  flex: 1;
  min-height: 0;
}
</style>
