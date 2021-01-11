title: Ceisum实现铁路仿真
tags:
  - Cesium
  - JavaScript
  - 铁路
  - 仿真
categories:
  - Cesium
date: 2021-01-03 23:21:00
---
# 铁路模拟仿真实现

实现效果

![train](https://cdn.jsdelivr.net/gh/emhui/oss@master/uPic/lxieypx;.gif)

内容比较多，只讲部分内容，可能有点乱。可以参考一下代码，有不懂的欢迎提问

# 初始化变量

这些变量下面都会用到

```javascript
// 运动车厢的速度
let velocity = 30 // 速度,根据他来计算到达各个点的时间
// 当前目标点的位置
// var currentIndex = 1

// 每节车厢相对上一节车厢延时一定时间到达同一个位置
var delayTime = 13

// 存储所有运动中的实体对象
var dynamicEntities = []

// 运动模型数量
var dynamicNum = 5

// 每节铁轨的长度，用于计算两个点之前铺设多少节铁轨
var modelLength = 170

// 初始化dynamicEntitye
for (let i = 0; i < dynamicNum ; ++i) {
    let obj = {
        entity: null, // 实体对象
        property: new Cesium.SampledPositionProperty(), // 动态位置属性
        timeAndOrientationList: [],
        startTime: 0,
        endTime: 0
    }
    dynamicEntities.push(obj)
}
```


# 加载线路并获取位置

我们需要有一系列点路径坐标（火车运行的路径）。这里我从Google Eearth中绘制了一条线，然后导出为KML数据加载进来。

![Google earth](https://cdn.jsdelivr.net/gh/emhui/oss@master/uPic/7MbzTG.png)

通过加载的这条路径，我们需要获取路径中每个转折点的坐标信息。通过这些转折点，我们可以完成**设置铁轨位置**和**计算出模型实体每个时间点对应点位置**

**加载KML**

```javascript

// 初始化路径 设置带时间的路径
viewer.dataSources.add(Cesium.KmlDataSource.load(routerUrl,
    {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToGround: true
    })
).then(dataSource => {
	// ... 加载好后获取改路径点坐标数组
    var router = dataSource.entities.getById('0129AA13ED12D2857AD0');
    var positions = router.polyline.positions._value
    viewer.flyTo(router)
    // createDynamicPositions(positions) // 计算带时间的路径
    // createDynamicEntity() // 根据动态路径创建模型实体
})
```

首先我们加载好路线后，就要获取改路线的坐标数组（每个转折点或顶点的位置）。

```javascript
// 获取路径对象
var router = dataSource.entities.getById('0129AA13ED12D2857AD0');
// 获取对象中的坐标数组
var positions = router.polyline.positions._value
```

我们可以看一下这些数组的内容

![IoR5O3](https://cdn.jsdelivr.net/gh/emhui/oss@master/uPic/IoR5O3.png)

在这里可以看出来，这些坐标全是笛卡尔类型。同时可以知道我们总共有13个转折点

接下来两章是重点

# 加载铁轨

效果展示

![Kkx93r](https://cdn.jsdelivr.net/gh/emhui/oss@master/uPic/Kkx93r.png)

实现上面效果，这里我们需要做下面几步。

- 计算每段路（两个点）之间的距离S
- 设置每个铁轨的固定长度L
- 计算每段路可以铺设多少个模型 num = S / L
- 通过每段路两端的点的坐标，计算出这段中每个铁轨模型的位置

```javascript

// 这个是每个模型的长度，在一开始的时候就定义了
// var modelLength = 170

function repeateModel(posCart1, posCart2) {
    // 需要摆放模型的数量
    // 模型的数量 = 两个点之间的长度 / 每个模型的长度
    let modelNum = parseInt(computeDistance(posCart1, posCart2) / modelLength)
    // 根据两个点的经纬度调整每个模型的方向
    let heading = computeOrientation(posCart1, posCart2)
    // 开始计算每个模型的位置
    for (var i = 1; i < modelNum; ++i) {
    	// 求第i个点的位置。下面有介绍为什么这样写
        var mid = new Cesium.Cartesian3()
        Cesium.Cartesian3.add(
            Cesium.Cartesian3.multiplyByScalar(posCart1, i / modelNum, new Cesium.Cartesian3()),
            Cesium.Cartesian3.multiplyByScalar(posCart2, (modelNum - i) / modelNum, new Cesium.Cartesian3()),
            mid
        )
		// 计算出位置后，添加铁轨模型到Viewer中。同时调整模型的方向
        viewer.entities.add({
            position: mid,
            model: {
                uri: modelRailwayUrl,
                scale: 0.025
            },
            orientation: changeOrientation(mid, heading)
        })
    }

}
```

**两个坐标之前第i的位置如何求**

先看一下下面的一道数学题

![bJgWdB](https://cdn.jsdelivr.net/gh/emhui/oss@master/uPic/bJgWdB.png)

通过这道题，我们就可以写出下面代码，求出第i个点的位置了

```javascript
Cesium.Cartesian3.add(
    Cesium.Cartesian3.multiplyByScalar(posCart1, i / modelNum, new Cesium.Cartesian3()),
    Cesium.Cartesian3.multiplyByScalar(posCart2, (modelNum - i) / modelNum, new Cesium.Cartesian3()),
    mid
)
```

**模型方向问题**

在上面代码中。我们经常要用到一个计算模型方向和改变模型方向的函数，那么为什么要计算模型的方向呢？

我们打开铁轨模型和系统自带的一些模型。看看他们的方向

使用下面命令调出查看方向的小工具

```javascript
viewer.extend(Cesium.viewerCesiumInspectorMixin);
```

![EUBOGy](https://cdn.jsdelivr.net/gh/emhui/oss@master/uPic/EUBOGy.png)

可以看到，我们的模型的方向默认位置是朝向南方（红色是东方，绿色是北方）。而官网的模型方向默认是东方。根据官方对模型的描述

> By default, the model is oriented upright and facing east. Control the orientation of the model by specifying a Quaternion for the Entity.orientation property. This controls the heading, pitch, and roll of the model.

可以看到，我们的模型方向是有问题。因此需要手动纠正。查阅很多方法，无法从模型本身入手。所以只能通过代码的方式来纠正方向。大概的思路是先计算出两个点的方向，然后在向东方偏移90度左右即可。

**计算方向函数**

```javascript
function computeOrientation(posCart1, posCart2) {
    let heading = bearing(
        Cesium.Cartographic.fromCartesian(posCart1).latitude,
        Cesium.Cartographic.fromCartesian(posCart1).longitude,
        Cesium.Cartographic.fromCartesian(posCart2).latitude,
        Cesium.Cartographic.fromCartesian(posCart2).longitude
    )
    return heading
}
        // 计算两点之间的方向
function bearing(startLat, startLng, destLat, destLng) {
    startLat = Cesium.Math.toRadians(startLat);
    startLng = Cesium.Math.toRadians(startLng);
    destLat = Cesium.Math.toRadians(destLat);
    destLng = Cesium.Math.toRadians(destLng);

    let y = Math.sin(destLng - startLng) * Math.cos(destLat);
    let x = Math.cos(startLat) * Math.sin(destLat) - Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    let brng = Math.atan2(y, x);
    let brngDgr = Cesium.Math.toDegrees(brng);
    return (brngDgr + 360) % 360;
}
```

**改变模型的位置**

```javascript
function changeOrientation(position, degree) {
    var heading = Cesium.Math.toRadians(degree);
    var pitch = Cesium.Math.toRadians(0.0);
    var roll = Cesium.Math.toRadians(0.0);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(heading, pitch, roll));
    return orientation
}
```

# 加载运动的车头和车厢

这里我们需要了解一个知识。[Cesium的Property机制总结](https://www.jianshu.com/p/f0b47997224c).[^1]这篇文章中，我们可以看到一个属性`SampledPositionProperty`,它可以使用物体的运动。

![move](https://upload-images.jianshu.io/upload_images/80648-366b91d38f419afa.gif?imageMogr2/auto-orient/strip|imageView2/2/w/296/format/webp)

它的实现代码如下

```javascript
var property = new Cesium.SampledPositionProperty();

property.addSample(Cesium.JulianDate.fromIso8601('2019-01-01T00:00:00.00Z'),
    Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 300000.0));

property.addSample(Cesium.JulianDate.fromIso8601('2019-01-03T00:00:00.00Z'),
    Cesium.Cartesian3.fromDegrees(-114.0, 45.0, 300000.0));

blueBox.position = property;
```

它的原理是，Entity在不同的时间运动到不同的位置。因此我们的火车运动也是一样，在不同的时候运动到不同的位置即可。那么如何实现呢？

还是通过之前获取的铁轨路径数组，再计算到达每个转折点的时间。构成一个如下图所示的数据结构。

![XzFZ1f](https://cdn.jsdelivr.net/gh/emhui/oss@master/uPic/XzFZ1f.png)

如何让模型运动起来也可以总结为下面这张图

![Eg6FPk](https://cdn.jsdelivr.net/gh/emhui/oss@master/uPic/Eg6FPk.png)

比如4点的时候在position1位置，4.30的时候在position2位置。4.50的时候在position3位置。

那么现在时间点应该如何计算

我们设置一个速度变量V，然后计算两点的距离S。那么到达下一个的时间就是

```
time = S / V
```

因此实现代码如下（伪代码）

```javascript
// 计算到下一个坐标所花费的时间
let time2Next = computeTime(datas[index], datas[index + 1])
// 计算到达改点的时刻
let time = totalTime + time2Next
// 将时刻+位置信息写入到模型的位置变量中
dynamicEntity.property.addSample(
    Cesium.JulianDate.addSeconds(start, time, new Cesium.JulianDate()),
    position
)
// 计算总花费时间
totalTime += time2Next

```

这里又有新的问题。

我们需要好几节车厢一起运动，如何实现呢？

使用延时启动，就是每一个车厢到达一个转折点的时间都比上一节车厢晚一段时间。如下图所示，不同的车厢在不同的时间点的位置不一样。

![Lp33qj](https://cdn.jsdelivr.net/gh/emhui/oss@master/uPic/Lp33qj.png)

```javascript
let time = totalTime + delayTime * i
```

我们看一下实现效果,车厢是一节在一节的后面出现的

![train](https://cdn.jsdelivr.net/gh/emhui/oss@master/uPic/lxiemjmjiuxm.gif)

通过代码实现

```javascript
function createDynamicPositions(positions) {
    var length = positions.length
    var totalTime = 0// 跑完全部路程的时间
    // 遍历铁轨路径的每个转折点
    positions.forEach((position, index, datas) => {
        // 在每个路径转角处创建一个Point对象
        CreatePoint(position, index)
        if (index + 1 < length) {
            // 计算一个点到另一点需要到时间
            let time2Next = computeTime(datas[index], datas[index + 1])
            // 计算两个转角点的方向
            let orientation = computeOrientation(datas[index], datas[index + 1])
            // 为每个车厢模型设置 时间+位置
            dynamicEntities.forEach((dynamicEntity, i) => {
            	// 这里实现了 每个模型都相对于之前都个模型延时一定时间进行启动
                let time = totalTime + delayTime * i
                dynamicEntity.property.addSample(
                    Cesium.JulianDate.addSeconds(start, time, new Cesium.JulianDate()),
                    position
                )
                // 记录每个模型分别达到一个点的时间、方向、位置
                let obj = {
                    time: totalTime, // 到达下一个点需要耗费的时间,它是一个数值，不是一个时间点
                    position: position,
                    orientation: orientation
                }

                // 计算开始时间
                if (index === 0) {
                    dynamicEntity.startTime = Cesium.JulianDate.addSeconds(start, time, new Cesium.JulianDate())
                }

                // 计算最后一个时间
                if (index + 2 === length) {
                    dynamicEntity.endTime = Cesium.JulianDate.addSeconds(start, time, new Cesium.JulianDate())
                }
                // 将计算得到的 时间+位置 属性存储到每个实体中
                dynamicEntity.timeAndOrientationList.push(obj)

            })

            totalTime += time2Next

        }
    });
```

这里我们发现我们也计算了每个模型的方向，为什么要计算方向呢？在上面设置铁轨的时候讲到了，因为我们的模型方向默认是有点问题的。默认朝向南方，因此需要手动调整方向，我们需要自己写一个方法，判断到了转角处进行转向。（如果是模型默认朝向东方的话，则不需要使用该方法，直接使用自带的一种方法，具体方法后面再谈）

如何实现到了转角处自动转向呢？我们在刚刚上一步的时候记录了每个模型到达某个位置的时候是在是什么时间点。因此只需要判断，当前模型运行的时间是否到了转角的时间点，到了的话就开始转向，而这个方向我们同时也在上一步的时候存储到每个实体中

```javascript
let obj = {
    time: totalTime, // 到达下一个点需要耗费的时间,它是一个数值，不是一个时间点
    position: position,
    orientation: orientation
}
```

监听当前时间点并转向的代码如下

```javascript
viewer.clock.onTick.addEventListener((clock) => {
	// 判断每个运动的模型当前是否到了转向时间
    dynamicEntities.forEach(dynamicEntity => {
    	// 计算每个运动的模型与模型的开始时间差
        let timeOffset = Cesium.JulianDate.secondsDifference(clock.currentTime, dynamicEntity.startTime);
        // 判断是否达到转向的时间点
        dynamicEntity.timeAndOrientationList.forEach((obj, index, array) => {
            if (timeOffset >= obj.time && timeOffset <= array[index + 1].time) {
                // 177在第一条铁轨是一个好的角度
                dynamicEntity.entity.orientation = changeOrientation(obj.position, obj.orientation + 180)
            }
        })
    })
```

如果模型的方向是正确的，只需要在创建模型实体对象的时候，指定该属性即可

```javascript
orientation: new Cesium.VelocityOrientationProperty(dynamicEntity.property),
```

目前还有下面问题暂时无法解决

- 各个模型之间的衔接不好

> 经过测试如果模型的方向是正确的话，那么就可以解决这个问题。所以可以从模型入手，更改模型的默认方向，使它默认朝向东方，但是自己一直没有找到如何编辑GLB模型。所以暂时无解。

[^1]: [Cesium的Property机制总结](https://www.jianshu.com/p/f0b47997224c)
