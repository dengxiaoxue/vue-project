import type { Graph, Node } from "@antv/x6";
import type { Dnd } from "@antv/x6-plugin-dnd";

export type DimpleLayoutCanvas = Graph & {
  /** 拖拽交互往插件 */
  dnd: Dnd;

  /** 设置工具信息 */
  setTools: (tools: DimpleLayoutEditorTool[]) => DimpleLayoutEditorTool[];

  /** 获取所有的工具 */
  getTools: () => DimpleLayoutEditorTool[];

  /** 创建自动计算路线的节点，这个方法创建的节点可以连接到绘制的路网上 */
  createRouteNode: (
    options?: Node.Config & { shape?: "circle" | "rect" | "image" }
  ) => Node;
};

type BuildInPlugins = "transform" | "";
export type DimpleLayoutEditorOptions = Graph.Options & {
  tools?: DimpleLayoutEditorTool[];
  plugins?: { [key in BuildInPlugins]: any };
};

type BuiltInTools = "drawRoute" | "";

export type DimpleLayoutEditorToolEvents = "click" | "mousedown";
export type DimpleLayoutEditorTool = {
  /** 工具key */
  key?: string;

  /** 工具排序的index,内置工具最小值为1，支持小数点微调 */
  index?: number;

  /** 工具位置（flex容器中的位置） */
  position?: "left" | "center" | "right";

  /** 工具是否显示 */
  visible?: boolean;

  /** 工具是否禁用 */
  disabled?: boolean;

  /** 工具名称 */
  name: any;

  /** 工具图标 */
  icon?: any;

  /** 工具事件的回调 */
  on?: {
    [key in DimpleLayoutEditorToolEvents]?: (
      event: MouseEvent,
      canvas: DimpleLayoutCanvas
    ) => any;
  };

  /** 首次加载完成是执行的回调 */
  onMounted?: (canvas: DimpleLayoutCanvas) => any;

  /** 自定义渲染组件，如果写了组件，那么前面icon和name以及所有回调都不会生效 */
  component?: any;

  [key: string]: any;
};
