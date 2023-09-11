export type Options = {
  scale?: number; // 当前缩放倍数, 默认1
  scaleStep?: number; // 缩放步长（按钮), 默认0.1
  touchScaleStep?: number; // 缩放步长（手势）, 默认0.025
  maxScale?: number; // 缩放最大倍数（缩放比率倍数）, 默认5
  minScale?: number; // 缩放最小倍数（缩放比率倍数）, 默认0.5
  translate?: any; // 默认画布偏移, 默认{ x: 0, y: 0 }
  isThrottleDraw?: boolean; // 是否开启节流绘图（建议开启，否则安卓调用频繁导致卡顿）, 默认true
  throttleInterval?: number; // 节流绘图间隔，单位ms, 默认20
  pixelRatio?: any; // 像素比（高像素比可以解决高清屏幕模糊问题）, 默认uni.getSystemInfoSync().pixelRatio
  controls?: any; // 删除控制
};
