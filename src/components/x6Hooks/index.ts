import { Graph } from "@antv/x6";
import { Dnd } from "@antv/x6-plugin-dnd";
import { Transform } from "@antv/x6-plugin-transform";
import { Export } from "@antv/x6-plugin-export";
import { ref, shallowRef } from "vue";
import mergeWith from "lodash-es/mergeWith";
import type { DimpleLayoutEditorOptions } from "./type.d";
import { buildInPlugins } from "./plugins";
export const useEditor = () => {
  const containerEl = ref<HTMLDivElement>();
  const graph = shallowRef<any>({});
  const dnd = ref<any>();
  const pos = ref<any>(); // 位置
  const relativePos = ref<any>(); // 位置
  let json = ref(null);
  // 拖拽节点
  let count = 0;
  const selectedId = ref<any>(0); // 当前id
  const selectedNode = ref<any>(null);
  const data = {
    nodes: [
      {
        id: "node1",
        shape: "rect",
        x: 40,
        y: 40,
        width: 100,
        height: 40,
        label: "hello",
        attrs: {
          body: {
            stroke: "#8f8f8f",
            strokeWidth: 1,
            fill: "#fff",
            rx: 6,
            ry: 6,
          },
        },
      },
      {
        id: "node2",
        shape: "rect",
        x: 160,
        y: 180,
        width: 100,
        height: 40,
        label: "world",
        attrs: {
          body: {
            stroke: "#8f8f8f",
            strokeWidth: 1,
            fill: "#fff",
            rx: 6,
            ry: 6,
          },
        },
      },
    ],
    edges: [
      {
        shape: "edge",
        source: "node1",
        target: "node2",
        label: "",
        // 顶点
        vertices: [
          { x: 100, y: 200 },
          { x: 300, y: 120 },
        ],
        attrs: {
          line: {
            stroke: "#8f8f8f",
            strokeWidth: 1,
          },
        },
      },
    ],
  };
  const defaultOptions = {
    autoResize: true, // 自动大小
    mousewheel: true, // 滚轮缩放
    scaling: { min: 0.25, max: 10 }, // 缩放大小限制
    panning: false, // 平移
    background: { color: "#F2F7FA" },
    translating: { restrict: true }, // 限制节点只在画布范围内
    grid: {
      visible: true,
      type: "doubleMesh",
      args: [
        {
          color: "#eee", // 主网格线颜色
          thickness: 1, // 主网格线宽度
        },
        {
          color: "#ddd", // 次网格线颜色
          thickness: 1, // 次网格线宽度
          factor: 4, // 主次网格线间隔
        },
      ],
    },
  };
  const initGraph = (initOptions: any) => {
    const options: DimpleLayoutEditorOptions = mergeWith(
      defaultOptions,
      initOptions || {},
      (objValue, srcValue) => {
        if (Array.isArray(objValue)) return objValue.concat(srcValue);
      }
    );
    options.container = options.container || containerEl.value;
    graph.value = new Graph(options);

    // 支持将画布内容通过图片的形式导出来
    // graph.value.use(new Export());

    // dnd.value = new Dnd({
    //   target: graph.value,
    //   // 自定义拖拽节点的样式
    //   getDragNode(node) {
    //     return node;
    //     // 这里返回一个新的节点作为拖拽节点
    //     const res = graph.value.createNode({
    //       width: 20,
    //       height: 20,
    //       id: node?.id,
    //       shape: "image",
    //       attrs: {
    //         image: {
    //           fill: "#ccc",
    //           stroke: "pink",
    //           width: 40,
    //           height: 40,
    //           xlinkHref: "https://img5.sucaisucai.com/02/66/02566175_1.jpg",
    //         },
    //         label: {
    //           fontSize: 14,
    //           fill: "yellow",
    //           text: "图片",
    //         },
    //       },
    //     });
    //     return res;
    //   },
    //   // 拖拽结束时，获取放置到目标画布的节点，默认克隆被拖拽的节点。
    //   getDropNode(node) {
    //     const { width, height } = node.size();
    //     // 返回一个新的节点作为实际放置到画布上的节点
    //     // 获取节点位置
    //     // const res = node.clone({ keepId: true }).size(width * 2, height * 2);
    //     const res = node.clone({ keepId: true });
    //     // graph.value?.addChild(res);
    //     selectedId.value = res.id;
    //     selectedNode.value = res;
    //     return res;
    //     return graph.value.createNode({
    //       width: 20,
    //       height: 20,
    //       shape: "rect",
    //       attrs: {
    //         body: {
    //           fill: "#ccc",
    //           stroke: "pink",
    //         },
    //       },
    //     });
    //   },
    //   // 拖拽结束时，验证节点是否可以放置到目标画布中
    //   validateNode(node) {
    //     // graph.value.$getNodePos();
    //     return true;
    //   },
    // });
    // graph.value.use(
    //   new Transform({
    //     resizing: {
    //       enabled: true,
    //       orthogonal: false,
    //       restrict: false,
    //       preserveAspectRatio: false,
    //     },
    //     rotating: {
    //       enabled: true,
    //       grid: 15,
    //     },
    //   })
    // );
    Object.values(buildInPlugins).forEach((item: any) => item(graph.value!));

    // initEvent();
    graph.value.fromJSON(data);
  };

  const initEvent = () => {
    graph.value.on("node:delete", ({ view, e }) => {
      e.stopPropagation();
      view.cell.remove();
      // parent.value = null;
    });
    graph.value.on("node:click", ({ e, x, y, node, view }) => {
      selectedId.value = node.id;
      selectedNode.value = node.clone({ keepId: true });
      graph.value?.$getNodePos();
    });
    graph.value.on("node:added", ({ node }) => {
      pos.value = node.position();
    });
  };

  // 背景图
  const BackgroundlinkHref = ref(
    "https://test204.rd.chn-das.com/oss/business/t6975983572026373/iwm/stationMap/2023-07-26/地图20230726-162326DxTr1Dh-EmG88-ahPMe2gzli5zeyAhA6KFCO_7Clr0.jpg"
  );
  // 上传背景图
  graph.value.$uploadBackground = () => {
    // if (parent.value) return;
    graph.value.addNode({
      x: 80,
      y: 40,
      id: "Background",
      shape: "image",
      width: 320,
      height: 240,
      zIndex: 0,
      label: "Parent\n(try to move me)",
      attrs: {
        image: {
          fill: "#ccc",
          stroke: "pink",
          width: 40,
          height: 40,
          xlinkHref: BackgroundlinkHref.value,
        },
        label: {
          event: "node:delete",
          fontSize: 14,
          fill: "red",
          text: "删除",
        },
      },
    });
    // coverLayer.value = graph.value.addNode({
    //   // x: 80,
    //   // y: 40,
    //   id: "coverLayer",
    //   shape: "custom-group-node",
    //   width: 240,
    //   height: 240,
    //   zIndex: 0,
    //   // label: "Parent\n(try to move me)",
    //   attrs: {
    //     body: {
    //       fill: "pink",
    //       stroke: "#ccc",
    //       fillOpacity: 0.1,
    //       strokeOpacity: 0.1,
    //     },
    //   },
    // });
    // parent.value.addChild(coverLayer.value);
  };
  // 清除背景图
  graph.value.$clearBackgroud = () => {
    // if (parent.value) {
    //   parent.value?.remove();
    //   parent.value = null;
    // }
  };
  // 替换背景图
  graph.value.$updateBackground = () => {
    // if (parent.value) {
    //   parent.value?.remove();
    //   parent.value = null;
    //   BackgroundlinkHref.value =
    //     "http://192.168.100.204/oss/business/t6975983572026373/iwm/stationMap/2023-07-25/2-3-2答题-填字题20230725-193819gHagRNU-BSLhxPpMHg27B6DaC9Y0ix5U-wPop8ebUI.png";
    //   graph.value.$uploadBackground();
    // }
  };
  // 拖拽节点
  graph.value.$dragstart = (e) => {
    // 该 node 为拖拽的节点，默认也是放置到画布上的节点，可以自定义任何属性
    const node = graph.value?.createNode({
      width: 50,
      height: 50,
      id: ++count,
      shape: "image",
      zIndex: 2,
      attrs: {
        image: {
          fill: "#ccc",
          stroke: "pink",
          width: 40,
          height: 40,
          xlinkHref: "https://img5.sucaisucai.com/02/66/02566175_1.jpg",
        },
        label: {
          fontSize: 14,
          fill: "red",
          text: "图片",
        },
      },
    });
    graph.value.dnd.start(node, e);
    console.log(node.getZIndex());
  };
  // 覆盖图层
  function dragstart2(e, data) {
    // 该 node 为拖拽的节点，默认也是放置到画布上的节点，可以自定义任何属性
    // 节点属性：https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Fills_and_Strokes
    const cover = graph.value.createNode({
      shape: "rect",
      width: 100,
      height: 40,
      id: "cover",
      attrs: {
        body: {
          fill: "pink",
          stroke: "#ccc",
          fillOpacity: 0.5,
          strokeOpacity: 0.2,
        },
      },
    });
    dnd.value.start(cover, e);
    console.log(cover.getZIndex());
  }
  graph.value.$getNodePos = () => {
    if (!selectedNode.value) return;
    // 是否返回相对于父节点的相对位置，默认为 false 表示返回节点相对于画布的绝对位置。
    pos.value = selectedNode.value?.position({ relative: false });
    relativePos.value = selectedNode?.value.position({ relative: true });
  };
  // 修改图标位置
  graph.value.$setNodePos = () => {
    if (!selectedNode.value) return;
    selectedNode.value.position(100, 100, { relative: false });
    pos.value = selectedNode.value.position({ relative: false });
  };
  // 替换图标
  graph.value.$updateNode = () => {
    // const nodes = graph.value.getNodes();
    if (!selectedNode.value) return;
    selectedNode.value.attr(
      "image/xlinkHref",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEX///+As/9rltV3rv97sP+Ctf9olNSGp9vj7v/g6PV0ouZgj9NlktRumtp1rf+Tvf/Z4/Pe6v+x0f+Wv//q8/+81//Q4//V5v/0+f+Huf+myv/S3fGuz//v9v9ai9HF3f+bxP/L2vKmv+hqnOS1yOhrqP9Phs99o9zC0u6KrN+qwuiVtOK+2f/G1/ImYi3fAAAIP0lEQVR4nO3d6XbiOBAFYMDGSbcd3BADgQ7ZOjPphX7/1xuWEBZrqSpdSc4c3X9z5kzgGxmtZbvXS0lJSUlJSUlJSUlJSUlJSUlJ+T+luZ7PHqeTfaaPs/l1E/srodLMp8t6mG2TH7P75369nM4/NXQ1m9T5FtbXZUvN68lsFfurCnI3W24aTm87c2bZcDm7i/2VOWnWNVV3VI7q9Se5Ypv1gqk7KhfT7iNntZB3QNaz2ARTmvs8c+Dtk+X3XW3I8e3IpfmOyUe349gYReYL9+Y7JlvMY4MugvV1z3hdo317Y1eu1dWTD9/O+NSJyc7UaXgwJ88msXm98dCfb2ccRr5UlyOvvm1Gy4i+cd9vA+6T96M1473/BtxndB/Ft1qEaMB98kWETnXua4hQJws+/k9CXaGHjAKPG94GeX2yp4C+u4A/wWPyRbCNjibIIKEg9gMtHK/DX6GHZEFGxsCd6AUxQJc6D92JnmfknRgZ6J8YHej7Qh3H/A0e4rO7aboA3BC9DRp3sWkf8TX0L2LDPrLwA3yKM5NRJX/yAZx040e4j48dqg6ME6fBD4urLrXgNhl61d+dXuYQcG9z351e5pAcuj01RvwI69tjasDfGyHnNoDvcz4TaSDXBA64RHyf7PrkL375MXT/izlsNxxyjV4Iy68AIuw6BXyXfks4QBCHGOAE049eChHEHDK1QY31LSGCCBn3URPuthBAREzBYct6hRBABCz4YdM1lRBAdJ684XZHlUJ3ovPGFG7GrRa6Ex0bEbjBrRE6Ex0bEbho0gmdiU6NiNwf1QpdiU7d6S1It/siWqEr8VYObJB7MwahI3Ek3yGGruxNQjeiw2ofunVhFDoSpcBH6P6aWehEzB6FQsRmysnXMAudiLUMCD5psgldiMLTqCl2B9EqdCDmU5EQvAlsFzoQRfMa9HEoQSgnii7TNXibmyIUE/O1QIjtSYlCMVHQm97Bb6AgCaXEjH/wPYskFBIz/g1hkJ18iVBGFOzwYza6JUIZkb39jT/zpQtFRPbeMPxnyBFKiOwfIuiwQigUENlHGOjRkCkUELkjIv7cnifkE5nLYOmk1PA/hiysZETm1FS4Ezya6v87qrB8lZ1pMHeGZWvD0dxwIk4UPnzrfX+QEJlrRNGMZleJpSXShBtgT0ZkzmokXel7qZmOSBLugEIirzMVTCo+auk0RIrwHSgj8uZt/I7mpFhQTSQIP4AiYsYB8geLs2pIJdEuPAFKiKzhgn3jz0W5p4poFZ4BBcSzD7CFOxy2xiIF0Sa8AG6IzKGfNSCyVxatA6420SJsAXtXxYBFZK0uHrnDYd7qqltEs1ABrD7+JY2Yc04v+FMaO9EoNAKJRNakRrA6tBJNQguQRmStECXrXxvRILQCSUTvQhtRLyQAKUT/QgtRKyQBCcQAQjNRJyQC7cQQQiNRIyQDrcQgQhNRLWQAbUSWUH78qycqhSyghcgaD9lzGgJRJWQCzUTWnMZlx1tHVAjZQCORNS91KrrUENtCAdBEZK0t3B4MoSa2hCKggchaHzpWKSiJl0IhUE/kbQk7njypiBdCMVBLZO3TON+spiD+cyb8Vw7UEXl7bc5HT23i/LSU99t3B6CGyNsvdT/FbxONYQGVROaeN6CmjUVkAlVE5rkF4i4EBpENVBCZZ0+QojYyUQBsE7mlbZAzYCJRBGwRuaXQmHN8ElEIvCRyz/FBtRgEohh4TmTXYqDqaaxEB+AZkV1PA6uJshCdgKdE/v2ysLo2I9EReELk39aNq000EJ2BH0RBbSKwsE1LBAAPREF9KbJGWEOEAN+JghphaGWbkggC7omSu2agtfoKIgy4JYpq9bH3W7SIQOCGmItuC8LeM3NBhAIHxVcJEH3f0xkRCxxUryIh+ragEyIYOCiF98mi64Q/iGhg8SYDgu8hPRLRwEH1UyjEl0LviHDgoJQCPTylbUPEA6sXsRB6P/7BeIMGDsovYiH0mQqHDNHE4koO9PPcYDSxbB0QcOLlgZBgonSo2MfPA9ihxPLZSejpqZ5I4o0bkNOIGSP5j9KcYE3IaETeAaUtVKJ4wnYMuTuNI3TrSPehPnMvirD4Bfgs6t5wFGEJeV4y8QgjhrD6jfk0Yqk85sPeQxIWA9Cn0Z5BG0FYtuodpCHt8IcXVn9wn9fJNiwq4OeRrtPbX1e4FHbhA+wa3Ya22r8pYCFco/KVvTKkyRt8cWtI4Trjvgxt3A9IxIz1p6G93yIY0X1J0Q7tHSWBiCX4R7gPbQoehOi0+WQIbakYgAjvZQ4hvu/JP7Hy9qpH4mmUZ2LhsgNsC7GG3y8RsazXh/hOJJ9E7GStg8QHDwNhp4j+geTNNy/EArfmNSVid9O+DcVPiO8Dxh+jVR6HifMQ3+kMJhY3wd7p3KO+lxt7xuRpLqoL7d3qQKKf1YQptEMpFLHwsR60ZUX6MWKI1Q18RU/KPeVKBRCLh+BX6CFjyrDhTCyqIMO8JktCM7oRixK4sy3JeGhvRhdiVcRswH2mmdUoJhYl6PjMLSv78C8jFuWvOF1oO9e1zSghlm+B5tmkzBcWI5tY3kQY442xGVnEonzrmm+b8e3I1OfQiVV5Fb8DVae5zw0NSSMWVfkSbBkoyazWDx524ob3Jq7ZDpbVeqFDWohVefNb/vqtoGnW9Uip1BKLbeu9dvrqvMzdbDnM2kolsSrLwZ+/IbcoUFnNJnW+YeYaYrH93ZXl28tzV6YuojTz6bIe7otKt+lXu2xrSKu3P6/Pn+rKNKW5ns8ep5NtXn6//vz7/VvzGS/LlJSUlJSUlJSUlJSUlJSUlJQUbf4D7yPKFGIFHYIAAAAASUVORK5CYII="
    );
    // selectedNode.value.prop("size", { width: 100, height: 100 });
    // selectedNode.value.size(100, 100);
    // console.log(selectedNode.value.prop());
  };
  // 序列化
  graph.value.$toJSON = () => {
    json.value = graph.value.toJSON();
    console.log(json.value);
  };
  // 反序列化
  graph.value.$fromJSON = () => {
    graph.value.fromJSON(json.value);
    const nodes = graph.value.getNodes();
    // nodes.forEach((item) => {
    //   if (item.id === "Background") parent.value = item;
    // });
  };
  // 导出为svg
  graph.value.$exportSVG = () => {
    const res = graph.value.toSVG((svg) => {
      console.log(svg);
    });
  };
  return { containerEl, initGraph, canvas: graph.value };
};
