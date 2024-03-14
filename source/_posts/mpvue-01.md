---
title: 小程序中分包使用echarts，mpvue的环境
date: 2024-03-14 16:19:49
tags: [vue]
categories: Vue
index_img: /img/cover/3.webp
---
[参考文档](https://github.com/ecomfe/echarts-for-weixin)
### 1.原生echarts-for-weixin参考文档
- 问题在于整个组件更换定制压缩后的echarts还是接近500k，如果放根目类，默认会在主包，而微信主包和分包都不能大于2M，所以分包用更好。
- 分包的话需要手动复制组件文件夹，而改到webpack里自动复制更好
```javascript
// webpack.base.conf.js
plugins: [
    ...
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, '../src/.../ec-canvas'),
        to: path.resolve(config.build.assetsRoot, './pages/.../ec-canvas'),
        ignore: ['.*']
    }]),
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(config.build.assetsRoot, './static'),
        ignore: ['.*']
    }]),
    ...
]
```
- 然后使用的时候import的echarts发现被编译了，所以还要加个配置跳过编译
```javascript
module: {
    rules: [
        {
            test: /\.js$/,
            include: [resolve('src'), resolve('test')],
            exclude: [resolve('src/pages/.../ec-canvas/echarts.js')], // 加这一行
            use: [
            'babel-loader',
            {
                loader: 'mpvue-loader',
                options: Object.assign({checkMPEntry: true}, vueLoaderConfig)
            },
            ]
        },
    ]
}
```

### 2.分包后也正常使用
- 1.组件里引用
```javascript
"usingComponents": {
    "ec-canvas": "../ec-canvas/ec-canvas"
}
```
- 2.初始化
```javascript
// index.vue
import * as echarts from '../ec-canvas/echarts';

let myChart = null;
function initChart(canvas, width, height, dpr) {
    myChart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // 像素比
    });
  canvas.setChart(myChart);

  var option = {};
  myChart.setOption(option);
  return myChart;
}
```

- 3.异步赋值
在mpvue里之前用lazyload的时候return chart确实会报错，还是直接用setOption去赋值
```javascript
import fetchData from '@/api'

methods: {
    getData() {
        fetchData().then(res => {
            this.setOptions(res.data)
        })
    },
    setOptions(data) {
        const series = data
        myChart.clear();
        var option = {
            legend: {
                data: titleArr,
                itemWidth: 15,
                itemHeight: 10,
                itemGap: 5,
                padding: 3
            },
            label: { // 柱状图 内部 显示数值
                show: true
            },
            tooltip: {
                trigger: 'axis',
                position: [10, 10],
                axisPointer: {
                    // Use axis to trigger tooltip
                    type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                }
            },
            grid: {
                left: '7%',
                right: '7%',
                x: 35,
                y: 55,
                x2: 35,
                y2: 60,
                top: '25%',
                borderWidth: 1
            },
            yAxis: {
                type: 'value',
                minInterval: 1,
            },
            xAxis: {
                type: 'category',
                data: dateArr
            },
            dataZoom: [
                { type: "inside" }, // 用于添加滚轮缩放
                { type: "slider" }, // 用于添加滑动条缩放，
                {
                    type: "inside",
                    start: 94,
                    end: 100
                }
            ],
            color: ['#131FE8', '#0984DE', '#07F2F2', '#07A93A', '#0BE00C', '#D6F008', '#F0AF1B', '#EE1A05'],
            series: series
        };
        myChart.setOption(option);
    }
}
```
