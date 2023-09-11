import { CanvasDraw } from '../utils/canvasDraw'
import { useEvent } from './use-event'
import { getCurrentInstance, ref } from 'vue'

const useCanvas = (canvasDraw, startPoint, fingers, jsonObj, props, emits) => {
  const coefficient = ref(1)
  let ctx: any = null
  let canvasEle: any = null // canvas元素对象
  let canvasNode: any = null // wx的canvas节点

  const { onSelectionUpdated, onSelectionCleared, onTouchstart, onTouchmove, onTouchend, onTap, onDeleteControl } =
    useEvent(canvasDraw, startPoint, fingers, emits)
  /** 初始化canvas */
  const initCanvas = () => {
    // 画布宽高
    const canvasWidth = 1920
    const canvasHeight = 1080
    const info = uni.getSystemInfoSync()
    console.log('info: ', info)
    // 屏幕宽高
    const screenWidth = info.windowWidth
    const screenHeight = info.windowHeight

    // 系数
    coefficient.value = screenWidth / canvasWidth
    jsonObj.value = handelJSON(props?.jsonObj)

    const instance = getCurrentInstance() // 获取组件实例
    const query = uni.createSelectorQuery().in(instance)

    query
      .select('#canvas')
      .fields({ node: true, size: true, rect: true })
      .exec((res) => {
        const ele = res[0]
        canvasEle = ele
        canvasNode = canvasEle?.node
        ctx = canvasNode?.getContext('2d')

        // 配置项
        const option = {
          ele: ele, // canvas元素 这里用ref对象传值会报错
          drawCallBack: draw, // 必须：用户自定义绘图方法
          scale: 1, // 当前缩放倍数
          scaleStep: 0.1, // 缩放步长（按钮)
          touchScaleStep: 0.025, // 缩放步长（手势）
          maxScale: 10, // 缩放最大倍数（缩放比率倍数）
          minScale: 0.25, // 缩放最小倍数（缩放比率倍数）
          translate: { x: 0, y: 0 }, // 默认画布偏移
          isThrottleDraw: true, // 是否开启节流绘图（建议开启，否则安卓调用频繁导致卡顿）
          throttleInterval: 20, // 节流绘图间隔，单位ms
          pixelRatio: uni.getSystemInfoSync().pixelRatio, // 像素比（高像素比可以解决高清屏幕模糊问题）
          controls: {
            delete: {
              radius: 0,
              fill: '#f00',
              customDraw: drawDeleteControl,
            },
          },
          ...props.options,
        }
        console.log('option: ', option)
        canvasDraw.value = new CanvasDraw(option) // 创建CanvasDraw实例后就可以使用实例的所有方法了
        addEvents() // 添加事件监听
        canvasDraw.value.draw(true) // 可以按实际需要调用绘图方法
        console.log('canvasDraw.value', canvasDraw.value)
      })
  }
  const handelJSON = (data) => {
    if (!data) return
    let localData = JSON.parse(JSON.stringify(data))
    let source: any = null
    let target: any = null
    localData?.cells?.forEach((item) => {
      if (['circle', 'rect', 'image'].includes(item.shape)) {
        item.position.x *= coefficient.value
        item.position.y *= coefficient.value
        item.size.width *= coefficient.value
        item.size.height *= coefficient.value
        if (item.shape === 'circle') {
          item.area = {
            x: [item.position.x - item.size.width / 2, item.position.x + item.size.width / 2],
            y: [item.position.y - item.size.height / 2, item.position.y + item.size.height / 2],
          }
        }
        if (['rect', 'image'].includes(item.shape)) {
          item.area = {
            x: [item.position.x, item.position.x + item.size.width],
            y: [item.position.y, item.position.y + item.size.height],
          }
        }
      }
      if (['edge'].includes(item.shape)) {
        if (item?.source?.x) item.source.x *= coefficient.value
        if (item?.source?.y) item.source.y *= coefficient.value
        if (item?.target?.x) item.target.x *= coefficient.value
        if (item?.target?.y) item.target.y *= coefficient.value
        item?.vertices?.forEach((v) => {
          v.x *= coefficient.value
          v.y *= coefficient.value
        })
      }
    })
    const result = localData?.cells?.map((item) => {
      if (item?.shape === 'edge') {
        source = localData?.cells?.filter((node) => node.id === item.source.cell)[0]
        target = localData?.cells?.filter((node) => node.id === item.target.cell)[0]
        return {
          ...item,
          $position: [
            { x: source?.position?.x || item?.source?.x, y: source?.position?.y || item?.source?.y },
            { x: target?.position.x || item?.target?.x, y: target?.position.y || item?.target?.y },
          ],
          $source: source,
          $target: target,
        }
      }
      return item
    })
    return { ...localData, cells: result }
  }
  const draw = () => {
    if (!jsonObj.value) return
    const nodes = jsonObj.value?.cells?.filter((node) => node.shape !== 'edge')
    const edges = jsonObj.value?.cells?.filter((node) => node.shape === 'edge')

    edges?.forEach((cell) => {
      addShape(cell, ctx, canvasNode)
    })
    nodes?.forEach((cell) => {
      addShape(cell, ctx, canvasNode)
    })
  }
  const addShape = (node, stage, canvas) => {
    if (node.shape === 'circle') {
      const opt = {
        id: node?.id,
        points: [{ x: node.position.x, y: node.position.y }],
        style: { radius: node.size.width, strokeWidth: 1, stroke: node?.attrs?.body?.stroke || 'black', fill: '#fff' },
      }
      canvasDraw.value?.drawPoint(opt)
      return
    }
    if (node.shape === 'rect') {
      const opt = {
        id: node?.id,
        zIndex: 0,
        points: [
          { x: node.position.x, y: node.position.y },
          { x: node.position.x + node.size.width, y: node.position.y },
          { x: node.position.x + node.size.width, y: node.position.y + node.size.height },
          { x: node.position.x, y: node.position.y + node.size.height },
        ],
        style: { strokeWidth: 1, stroke: node?.attrs?.body?.stroke || 'black', fill: '#fff' },
      }
      canvasDraw.value?.drawShape(opt)
      return
    }
    if (node.shape === 'edge') {
      if (node?.$source?.shape === 'edge') return
      // 起止坐标
      const position = node?.$position
      // 途径点
      const vertices = node?.vertices

      const opt = {
        id: node?.id,
        points: [{ x: position[0].x, y: position[0].y }],
        style: { strokeWidth: 2 * coefficient.value, stroke: node?.attrs?.line?.stroke || '#000' },
        angle: 0,
      }
      if (vertices && vertices?.length > 0) {
        vertices.forEach((item) => {
          opt.points.push({ x: item.x, y: item.y })
        })
      }
      opt.points.push({ x: position[1].x, y: position[1].y })
      canvasDraw.value?.drawLines(opt)
      return
    }
    if (node.shape === 'image') {
      const opt = {
        id: node?.id,
        points: [{ x: node.position.x + node.size.width, y: node.position.y + node.size.height / 2 }],
        style: { radius: node.size.width, img: node?.attrs?.image['xlink:href'] },
        angle: 0,
      }
      canvasDraw.value?.drawPoint(opt)
      return
    }
  }
  const drawDeleteControl = (opt) => {
    canvasDraw.value.drawPoint(
      {
        id: 'delete',
        points: opt.points,
        style: {
          img: '',
          radius: 0,
        },
      },
      false,
    )
  }
  /** 绑定组件内置事件 */
  const addEvents = () => {
    canvasDraw.value?.on('selection:updated', onSelectionUpdated)
    canvasDraw.value?.on('selection:cleared', onSelectionCleared)
    canvasDraw.value?.on('touchstart', onTouchstart)
    canvasDraw.value?.on('touchmove', onTouchmove)
    canvasDraw.value?.on('touchend', onTouchend)
    canvasDraw.value?.on('tap', onTap)
    canvasDraw.value?.on('deleteControl:tap', onDeleteControl)
  }
  /** canvas事件绑定 */
  const touchstart = (e) => {
    canvasDraw.value.touchstart(e)
  }
  const touchmove = (e) => {
    canvasDraw.value.touchmove(e)
  }
  const touchend = (e) => {
    canvasDraw.value.touchend(e)
  }
  /** 重置画布（回复初始效果） */
  const reset = () => {
    canvasDraw.value.reset()
  }
  return { initCanvas, touchstart, touchmove, touchend, reset, handelJSON, draw }
}

export { useCanvas }
