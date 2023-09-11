import { ref } from 'vue'
import type DasCanvas from './index.vue'

/** 获取组件实例 */
const getDasCanvasRef = () => ref<InstanceType<typeof DasCanvas> | null>(null)

export { getDasCanvasRef }

export default { name: 'DasCanvas', title: 'canvas地图' }
