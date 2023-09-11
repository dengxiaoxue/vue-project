const useEvent = (canvasDraw, startPoint, fingers, emits) => {
  /** 组件内置事件 */
  const onSelectionUpdated = (item) => {
    emits('selection-updated', item)
    item.controlsVis = { delete: true }
    if (item.type !== 'Lines') item.zIndex = 1
    canvasDraw.value.draw()
  }
  const onSelectionCleared = (item) => {
    if (!item) return
    emits('selection-cleared', item)
    item.controlsVis = { delete: false }
    item.zIndex = 0
    canvasDraw.value.draw()
  }
  const onTouchstart = (e) => {
    startPoint.value = e.point
    fingers.value = e.event.touches.length
    emits('touchstart', e)
  }
  const onTouchmove = (e) => {
    emits('touchmove', e)
  }
  const onTouchend = (e) => {
    // canvasDraw.value.draw()
    emits('touchend', e)
  }
  const onTap = (e) => {
    // console.log('点击坐标：', e.point)
    // console.log('所有canvas子对象：', canvasDraw.value.children)
  }
  const onDeleteControl = (e) => {
    console.log('点击删除控制点', e)
    canvasDraw.value.removeChild(e.id)
    canvasDraw.value.draw()
  }
  return { onSelectionUpdated, onSelectionCleared, onTouchstart, onTouchmove, onTouchend, onTap, onDeleteControl }
}

export { useEvent }
