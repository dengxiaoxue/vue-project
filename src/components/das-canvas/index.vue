<template>
  <view class="container">
    <view class="canvas-wrap">
      <canvas
        type="2d"
        canvas-id="canvas"
        id="canvas"
        class="canvas"
        disable-scroll="true"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
      ></canvas>
    </view>
  </view>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useCanvas } from './hooks/use-canvas'
import type { Options } from './type.sfc'

const props = defineProps<{
  jsonObj: any // x6生成的json对象
  options: Options
}>()

const emits = defineEmits<{
  (e: 'selection-updated', item: any): void
  (e: 'selection-cleared', item: any): void
  (e: 'touchstart', data: any): void
  (e: 'touchmove', data: any): void
  (e: 'touchend', data: any): void
}>()

const canvasDraw = ref<any>(null) // 绘图对象
const startPoint = ref(null) // 手绘起点
const fingers = ref(null) // 手指数量
const jsonObj = ref<any>()

const { initCanvas, touchstart, touchmove, touchend, handelJSON, draw } = useCanvas(
  canvasDraw,
  startPoint,
  fingers,
  jsonObj,
  props,
  emits,
)
onMounted(() => {
  initCanvas()
})
watch(
  () => props.jsonObj,
  () => {
    if (!props.jsonObj) return
    jsonObj.value = handelJSON(props.jsonObj)
    draw()
  },
  {
    immediate: true,
  },
)
const destroy = () => {
  /** 销毁对象 */
  if (canvasDraw.value) {
    canvasDraw.value.destroy()
    canvasDraw.value = null
  }
}
defineExpose({
  getCanvasDraw: () => canvasDraw.value,
  destroy: destroy,
})
</script>
<style>
.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
}
.canvas-wrap {
  display: flex;
  height: 100%;
}
.canvas {
  flex: 1;
  width: 100%;
  height: 100%;
}
.buttons {
  display: flex;
  justify-content: space-around;
  margin: 10px;
}
</style>
