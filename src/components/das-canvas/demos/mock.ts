export const json = {
  "cells": [
    {
      "position": {
        "x": 130,
        "y": 430
      },
      "size": {
        "width": 10,
        "height": 10
      },
      "visible": true,
      "shape": "circle",
      "id": "d0b9b25e-db85-4b1c-82bf-e03d9bf449bb",
      "data": {
        "isDrawEdgeSource": true,
        "index": 0
      },
      "zIndex": 1
    },
    {
      "position": {
        "x": 1060,
        "y": 130
      },
      "size": {
        "width": 10,
        "height": 10
      },
      "visible": true,
      "shape": "circle",
      "id": "1f70fdf8-494a-41d1-9e06-bb1959f27dc2",
      "data": {
        "isDrawEdgeTarget": true,
        "index": 0
      },
      "zIndex": 2
    },
    {
      "shape": "edge",
      "attrs": {
        "line": {
          "targetMarker": false,
          "sourceMarker": false
        }
      },
      "id": "7503297b-a857-4f1d-8a47-6e73e6290ab4",
      "data": {
        "isDrawEdge": true,
        "index": 0
      },
      "zIndex": 3,
      "source": {
        "cell": "d0b9b25e-db85-4b1c-82bf-e03d9bf449bb"
      },
      "target": {
        "cell": "1f70fdf8-494a-41d1-9e06-bb1959f27dc2"
      },
      "tools": {
        "items": [
          "vertices",
          "segments"
        ]
      },
      "vertices": [
        {
          "x": 500,
          "y": 410
        },
        {
          "x": 630,
          "y": 150
        },
        {
          "x": 880,
          "y": 590
        }
      ]
    },
    {
      "position": {
        "x": 1110,
        "y": 250
      },
      "size": {
        "width": 50,
        "height": 50
      },
      "attrs": {
        "text": {
          "text": "终点"
        },
        "image": {
          "xlink:href": "https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon64_wx_logo.png"
        },
        "label": {
          "fontSize": 12,
          "refX": 0.5,
          "refY": "100%",
          "refY2": 4,
          "textAnchor": "middle",
          "textVerticalAnchor": "top"
        }
      },
      "visible": true,
      "shape": "image",
      "id": "4f13619a-3b5e-487b-9dda-f8ac7a11cf2b",
      "data": {
        "type": "end",
        "key": "end1694069225933"
      },
      "zIndex": 4
    },
    {
      "shape": "edge",
      "attrs": {
        "line": {
          "targetMarker": false,
          "sourceMarker": false
        }
      },
      "id": "5bded9c5-2e06-4c38-a21e-e3c75f0cf090",
      "router": {
        "name": "manhattan",
        "args": {
          "step": 1
        }
      },
      "zIndex": 5,
      "source": {
        "cell": "7503297b-a857-4f1d-8a47-6e73e6290ab4"
      },
      "target": {
        "cell": "4f13619a-3b5e-487b-9dda-f8ac7a11cf2b"
      }
    },
    {
      "shape": "edge",
      "attrs": {
        "line": {
          "stroke": "#FFA500",
          "targetMarker": false,
          "sourceMarker": false
        }
      },
      "id": "c2197bd7-a3b8-484a-8034-bddef013da57",
      "zIndex": 6,
      "source": {
        "x": 140.99,
        "y": 434.59
      },
      "target": {
        "x": 1109,
        "y": 275
      },
      "vertices": [
        {
          "x": 140.99,
          "y": 434.59
        },
        {
          "x": 500,
          "y": 410
        },
        {
          "x": 630,
          "y": 150
        },
        {
          "x": 880,
          "y": 590
        },
        {
          "x": 1026.08,
          "y": 230.72
        },
        {
          "x": 1026.08,
          "y": 230.72
        },
        {
          "x": 1026.1,
          "y": 275
        },
        {
          "x": 1109,
          "y": 275
        }
      ]
    },
    {
      "position": {
        "x": 670,
        "y": 280
      },
      "size": {
        "width": 100,
        "height": 40
      },
      "visible": true,
      "shape": "rect",
      "id": "0837c3fd-c88b-4962-aa66-c905d9c142b5",
      "zIndex": 7
    }
  ]
}