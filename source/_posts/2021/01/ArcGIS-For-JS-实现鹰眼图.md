---
title: ArcGIS For JS 实现鹰眼图
date: 2021-01-04 09:08:07
tags:
- ArcGIS For JS
- JavaScript
categories:
- ArcGIS For JS
---

# 鹰眼图/概述图实现

![bPrbRu](https://cdn.jsdelivr.net/gh/emhui/oss@master/uPic/bPrbRu.png)

本例展示在3D场景中添加一个2D的鹰眼图/概述图。概述图展示当前所在的3D场景。使用[watch()](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#watch)来实现2D概览图和3D场景图的同步。[具体案例](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=overview-map)。

> 有关watching属性的更多信息，可以查看[Working with properties](https://developers.arcgis.com/javascript/latest/guide/programming-patterns/#properties)

## 具体实现

1. 创建一个DIV，用来展示鹰眼图。

```html
<div id="overviewDiv"><div id="extentDiv"></div></div>
```

2. 为鹰眼图创建一个Map。
3. 为鹰眼图创建一个MapView

```javascript
var overviewMap = new Map({
    basemap: "topo"
})

var mapView = new MapView({
    contrain: "overviewDIV",
    map: overviewMap,
    constraints: {
        rotationEnabled: false
    }
})

// 移除默认的MapVIew自带的控件,具体效果可看文末下面
mapView.ui.components = [];
```

4. 创建一个灰色的矩形用来标示当前的位置，并添加到mapview中。

```javascript
const extent3Dgraphic = new Graphic({
    geometry: null,
    symbol: {
      type: "simple-fill",
      color: [0, 0, 0, 0.5],
      outline: null
    }
  });
  mapView.graphics.add(extent3Dgraphic);
```

5. **重点：使用WatchUtils监听MainView的extent属性变化**

**WatchUtils的用法**

`watchUtils.init(obj, propertyName, callback)`

具体代码

```javascript
watchUtils.init(mainView, "extent", function(extent) {
// 当3D场景静止的时候，mapView移动到视图的位置
if (mainView.stationary) {
  mapView.goTo({
    center: mainView.center,
    scale:
      mainView.scale *
      2 *
      Math.max(
        mainView.width / mapView.width,
        mainView.height / mapView.height
      )
  });
}

extent3Dgraphic.geometry = extent;
});
```
## 其他

**mapView.ui.components = []的作用**

如图，该语句作用是清空默认的组件

![LmJOlG](https://cdn.jsdelivr.net/gh/emhui/oss@master/uPic/LmJOlG.png)

**Scale缩放算式**

```
mainView.scale * 2 *
Math.max(
mainView.width / mapView.width,
mainView.height / mapView.height
```

`mapView.width/height` 是指当前显示区域的宽度和高度.

```
var size = mainView.scale *
Math.max(
mainView.width / mapView.width,
mainView.height / mapView.height)
```

令上面的算式=size，下面两张图是size*1、2的效果。 可见其实size *1的效果已经不错了，但是 *2 效果可以更好。

**size * 1**

![wgFEZq](https://cdn.jsdelivr.net/gh/emhui/oss@master/uPic/wgFEZq.png)

**size * 2**

![sfffrS](https://cdn.jsdelivr.net/gh/emhui/oss@master/uPic/sfffrS.png)

[Overview Sample](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=overview-map)

### 2D和3D同步切换

![Y3EIi3](https://cdn.jsdelivr.net/gh/emhui/oss@master/uPic/Y3EIi3.png)

[views-synchronize](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=views-synchronize)

#### 代码讲解

```javascript
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="initial-scale=1,maximum-scale=1,user-scalable=no"
    />
    <title>Synchronize MapView and SceneView - 4.14</title>

    <style>
      html,
      body {
        padding: 0;
        margin: 0;
        height: 100%;
      }
    </style>

    <link
      rel="stylesheet"
      href="https://js.arcgis.com/4.14/esri/themes/light/main.css"
    />
    <script src="https://js.arcgis.com/4.14/"></script>

    <script>
      require([
        "esri/Map",
        "esri/views/MapView",
        "esri/views/SceneView",
        "esri/core/watchUtils"
      ], function(Map, MapView, SceneView, watchUtils) {
        var map = new Map({
          basemap: "satellite"
        });

        var view1 = new SceneView({
          id: "view1",
          container: "view1Div",
          map: map
        });

        var view2 = new MapView({
          id: "view2",
          container: "view2Div",
          map: map,
          constraints: {
            // Disable zoom snapping to get the best synchronization
            snapToZoom: false
          }
        });

        /**
         * utility method that synchronizes the viewpoint of a view to other views
         * 同步视图
         */
        var synchronizeView = function(view, others) {
          others = Array.isArray(others) ? others : [others];

          var viewpointWatchHandle;
          var viewStationaryHandle;
          var otherInteractHandlers;
          var scheduleId;

          var clear = function() {
            if (otherInteractHandlers) {
              otherInteractHandlers.forEach(function(handle) {
                handle.remove();
              });
            }
            // 这是什么意思?
            // viewpointWatchHandle 和 viewStatioaryHandle 对象是WatchHandle对象，其中有一个remove对象方法。用来清空监听属性
            viewpointWatchHandle && viewpointWatchHandle.remove();
            viewStationaryHandle && viewStationaryHandle.remove();
            scheduleId && clearTimeout(scheduleId);
            otherInteractHandlers = viewpointWatchHandle = viewStationaryHandle = scheduleId = null;
          };

            // 监听当前控制视图的 交互和动画属性
          var interactWatcher = view.watch("interacting,animation", function(
            newValue
          ) {
            if (!newValue) {
              return;
            }
            if (viewpointWatchHandle || scheduleId) {
              return;
            }

            // 开始更新其他视图
            scheduleId = setTimeout(function() {
              scheduleId = null;
              // 监听当前view的视点属性
              viewpointWatchHandle = view.watch("viewpoint", function(
                newValue
              ) {
                // 根据新获取的视点，其他视图也同时更新它的视点
                others.forEach(function(otherView) {
                  otherView.viewpoint = newValue;
                });
              });
            }, 0);

            // stop as soon as another view starts interacting, like if the user starts panning
            // 如果移动其他视图，则销毁当前视图的所有变量
            otherInteractHandlers = others.map(function(otherView) {
              return watchUtils.watch(
                otherView,
                "interacting,animation",
                function(value) {
                  if (value) {
                    clear();
                  }
                }
              );
            });

            // or stop when the view is stationary again
            // 当不再和视图进行交互时候，即 stationary 状态，则也注销所有变量
            // 当监听的属性为True的时候执行
            viewStationaryHandle = watchUtils.whenTrue(
              view,
              "stationary",
              clear
            );
          });

          return {
            remove: function() {
              this.remove = function() {};
              clear();
              interactWatcher.remove();
            }
          };
        };

        /**
         * 同步多个View的视点
         */
        var synchronizeViews = function(views) {
        /* array.map(function(currentValue,index,arr), thisValue)
        * 遍历所有的view
        * views.concat() 对当前对views进行复制一份
        * handles 存储一系列的同步事件
        */
          var handles = views.map(function(view, idx, views) {
            var others = views.concat(); // 复制一份views
            others.splice(idx, 1); // 删除当前视图，其他视图则是others
            return synchronizeView(view, others); //
          });

          return {
            remove: function() {
              this.remove = function() {};
              handles.forEach(function(h) {
                h.remove();
              });
              handles = null;
            }
          };
        };

        // 绑定两个视图
        synchronizeViews([view1, view2]);
      });
    </script>
  </head>
  <body>
    <div id="view1Div" style="float: left; width: 50%; height: 100%;"></div>
    <div id="view2Div" style="float: left; width: 50%; height: 100%;"></div>
  </body>
</html>

```
