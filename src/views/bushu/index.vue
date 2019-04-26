<template>
    <div class="app-container">
        <div class="header">
            <div class="header_left">
                <span>地图工具</span>
            </div>
            <div class="header_right">
                <el-input v-model="selsctInput"  placeholder="请输入搜索内容" style="width:400px"></el-input>
                <el-button type="primary"  icon="el-icon-search"   @click="select()">快速搜索</el-button>
            </div>   
        </div>
        <div class="map">
            <baidu-map class="map"   :center="center"  @ready="handler"  :zoom="zoom" :scroll-wheel-zoom="true"  @click="getClickInfo" >
                <bm-view style="width: 96%; height:600px;margin:auto">
                     <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_SMALL" @click="clickHandler"></bm-point-collection>
                </bm-view>
                <!-- <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation> -->
                <!-- <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                </bm-marker> -->
             
            </baidu-map>
        </div>   
    </div>
</template>
<script>
const jsonp = require('jsonp');
export default {
  data () {
    return {
        center: {lng: 116.404, lat: 39.915},
        zoom: 15,
        selsctInput:'',
        points: []
     }
   },
  ready:{//地图组件渲染完毕时触发，返回一个百度地图的核心类和地图实例。

   },
  methods: {
     getClickInfo (e) {//点击获取对应的经纬度以及地点
        this.center.lng = e.point.lng
        this.center.lat = e.point.lat
        let a =  e.point.lng; //经度
        let b =  e.point.lat; //纬度
        jsonp('http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location='+b+','+a+'&output=json&pois=0&ak=DNmlfhwkFOLiSovfFzm8Mj4IxxK6fbcO', null, (err, data) => {
          if (err) {
            console.error(err.message);
          } else {
            // console.log(data)
          }
        });
      },
     handler({BMap,map}){
         let that = this;
         console.log(BMap,map) 
     },
     clickHandler (e) {
      alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
    },
     addPoints () {
      const points = [];
      for (var i = 0; i < 1000; i++) {
        const position = {lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21}
        points.push(position)
      }
      this.points = points
    }

  }
}
</script>  

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container{
  overflow: hidden;
  background: #ffffff;
  margin-top:25px;
}
.header{
    height: 50px;
    width: 100%;
    background: #f5f7fa;
    margin: auto;
    margin-top: -10px;
    overflow: hidden;
    .header_left{
       float: left;
       margin: 18px 31px;
    }
    .header_right{
       float: right;
       margin-top: 5px;
       margin-right: 28px;
    }
}
.map{
    background: #f5f7fa;
    
}
</style>
