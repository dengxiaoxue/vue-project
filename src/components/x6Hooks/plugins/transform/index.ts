import { Transform } from '@antv/x6-plugin-transform'

import type { DimpleLayoutCanvas } from '../../type'

export default (canvas: DimpleLayoutCanvas, options: any) => {
  canvas.use(new Transform({ resizing: { enabled: true } }))
}
