<template>
  <view class="demo-canvas">
    <DasCanvas
      :jsonObj="jsonData"
      :options="options"
      @selection-updated="updated"
      @selection-cleared="cleared"
      ref="$DasCanvas"
    ></DasCanvas>
    <view class="buttons-wrap">
      <view class="buttons">
        <button @click="zoomIn">放大</button>
        <button @click="zoomOut">缩小</button>
        <button @click="reset">重置</button>
        <button @click="clear">清空</button>
      </view>
      <view class="buttons">
        <button @click="getChildren">获取所有canvas子对象</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { json } from './mock'
import { ref, getCurrentInstance, onMounted } from 'vue'
import DasCanvas from '@/das-fe/mobile-ui/packages/das-canvas/index.vue'
import type { Options } from '@/das-fe/mobile-ui/packages/das-canvas/type.sfc'

const options = ref<Options>({})
const jsonData = ref()
const instance: any = getCurrentInstance()

let timer: any = null
const getJSON = () => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    jsonData.value = json
  }, 500)
}
getJSON()

const updated = (item) => {
  console.log('选中元素：', item)
  item.style.fill = 'green'
}
const cleared = (item) => {
  console.log('取消选中：', item)
  item.style.fill = '#fff'
}

const reset = () => {
  instance?.refs.$DasCanvas?.getCanvasDraw().reset()
}
const zoomIn = () => {
  instance?.refs.$DasCanvas?.getCanvasDraw().zoomIn()
}
const zoomOut = () => {
  instance?.refs.$DasCanvas?.getCanvasDraw().zoomOut()
}
const clear = () => {
  instance?.refs.$DasCanvas?.getCanvasDraw().clear()
}
const getChildren = () => {
  console.log('所有canvas子对象: ', instance?.refs.$DasCanvas?.getCanvasDraw().children)
}
</script>

<style scoped>
.demo-canvas {
  height: 430px;
  /* background-color: #fff; */
  /* background: #f2f2f2; */
}
.buttons {
  display: flex;
  justify-content: space-around;
  margin: 10px;
}
.buttons-wrap {
  height: 300px;
  background-color: #fff;
}
</style>
