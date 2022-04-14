---
title: videojs相关
date: 2019-02-14 14:05:42
tags: [javascript, videojs]
index_img: https://cdn.jsdelivr.net/gh/cry101/ImgHosting/img/vue-video-player.jpg
---


### 1.播放m3u8
vue里集成：[vue-video-player](https://github.com/surmon-china/vue-video-player)
自己引入的videojs在组件销毁时要调用dispose()方法释放下
```html
<template>
    <div class="video-box">
        <video :id="id" class="video-js vjs-default-skin vjs-big-play-centered" width="100%" height="100%">
            <source v-if="/.m3u8/.test(src)" :src="src" type="application/x-mpegURL">
            <source v-else :src="src" :type="item.format | filterFormat">
            <p class="vjs-no-js">
                您的浏览器不支持HTML5，请升级浏览器。
            </p>
        </video>
    </div>
</template>

<script>

export default {
    name: 'VideoBox',
    filters: {
        filterFormat(val) {
            let mimeType = ''
            // mov,mp4 用默认
            switch (val) {
                case 'flv':
                    mimeType = 'video/x-flv'
                    break
                case 'wmv':
                    mimeType = 'video/x-ms-wmv'
                    break
                case 'avi':
                    mimeType = 'video/x-msvideo'
                    break
                default:
                    mimeType = 'video/mp4'
            }
            console.log(mimeType)
            return mimeType
        }
    },
    props: {
        item: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
	        myPlayer: null
        }
    },
    computed: {
        src() {
            return this.item.video_uril
        },
        id() {
            return 'Id' + this.item.id || 'Id'
        }
    },
    mounted() {
        console.log('mounted player')
        this.playVideo()
    },
	beforeDestroy() {
        console.log('video beforeDestroy')
        console.log(this.myPlayer)
		this.myPlayer.dispose()
    },
    methods: {
        playVideo() {
            this.$nextTick(_ => {
                console.log(this.src, this.id)
                if (this.src) {
                    // eslint-disable-next-line
                    this.myPlayer = videojs(this.id, {
                        autoplay: true,
                        controls: true, // 控制条
                        poster: "",
                        techOrder: ["flash"],
                        muted: false, // 静音
                        preload: "auto", // 预加载
                        language: "zh-CN", // 初始化语言
                        playbackRates: [1, 2, 3, 4, 5, 8, 10, 20]// 播放速度
                    }, function() {
                        // console.log("--------------成功初始化视频--------------");
                        this.one("playing", function() { // 监听播放
                            console.log("开始播放")
                        })
                        this.one("error", function(error) { // 监听错误
                            console.error("监听到异常，错误信息：%o", error)
                        })
                    })
                }
            })
        },
        dispose() {
            console.log('dispose')
            this.myPlayer.dispose()
            this.myPlayer = null
        }
    }
}
</script>

<style scoped lang="scss">
.video-box{
    height: 400px;
    width: 100%;
    margin: 0 auto;
}
div{
    width: 100%;
    height: 100%;
    position: relative;
}
</style>


```
### 2.[常用MIME类型](https://blog.csdn.net/xue251248603/article/details/52982263)
|名称|扩展名|MIME Type|常用编码格式|
|:-|:-:|-:|-:|
|Flash|.flv|video/x-flv|H.264+MP3|
|MPEG-4|.mp4|video/mp4|H.264+AAC,H263+AAC|
|iPhone Index|.m3u8|application/x-mpegURL||
|iPhone Segment|.3gp|video/3gpp||
|3GP Mobile|.ts|video/MP2T||
|QuickTime|.mov|video/quicktime|H.264+AAC|
|A/V Interleave|.avi|video/x-msvideo|Xvid+MP3|
|Windows Media|.wmv|ideo/x-ms-wmv|VC-1+WMA|

### 3.常用的流媒体协议
|简写|全称|推出机构|使用范围|
|:-|:-:|-:|-:|
|HLS|HTTP Live Streaming|苹果|多应用于苹果|
|RTP|实时传输协议|IETF|范围较广|
|RTCP|实时传输控制协议|IETF|范围较广|
|RTSP|实时串流协议|RealNetworks等|范围较广|
|RTMP|实时消息协议|Adobe|较流行|
|MMS|串流媒体协议|Microsoft|范围较广|

HLS(Http Live Streaming)
HLS是苹果推出，实现的基于HTTP的流媒体传输协议:
优点：
1、通过m3u8索引文件可实现针对当前浏览设备的智能选择播放源，
2、通过m3u8索引文件可实现添加备份索引文件，防止服务器崩溃视频播放失败
3、和http视频一样 不需要太多服务器额外配置
缺点：
1、并非真正实时视频，30s左右时间差
2、需要视频处理
3、因为需要请求索引文件（ts视频文件）请求次数相对较多，对服务器负载较大
