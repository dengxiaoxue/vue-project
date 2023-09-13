import { Dnd } from '@antv/x6-plugin-dnd'

import type { DimpleLayoutCanvas } from '../../type'

export default (canvas: DimpleLayoutCanvas, options: any) => {
  canvas.dnd = new Dnd({ target: canvas })
}
