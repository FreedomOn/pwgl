
<template>
  <div class="page">   
    <div class="header">
        <div class="header_left">
            <span>地图工具</span>
        </div>
        <div class="header_right">
            <el-input v-model="selsctInput"  placeholder="请输入设备名字进行搜索" style="width:400px"></el-input>
            <el-button type="primary" icon="el-icon-search"   @click="select()">快速搜索</el-button>
        </div>   
    </div> 
    <div class="amap-wrapper">
      <el-amap class="amap-box" :plugin="plugin" vid="amap-vue" :zoom="zoom" :center="center">
          <el-amap-marker v-for="marker in markers" :key="  
          marker.id"  :position="marker.position" :text="marker.text" :events="marker.markderclick"></el-amap-marker>
          <el-amap-text v-for="(text,index) in markers" :key="index" :text="text.text" :offset="text.offset" :position="text.position" ></el-amap-text>
      </el-amap>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      let self = this
      return {
       selsctInput:'',
       uid: 3,
       zoom: 12,
       center: [120.163936,30.254841],
       resdata: [],
       markers: [],
       texts:[],
       plugin: [{
            pName: 'Geolocation',
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                    // self.center = [result.position.lng, result.position.lat]
                    self.$nextTick();
                  }
                });
              }
            }
          }]
      } 
    },
    mounted () {
       this.getdata()
    },
    methods: {
      // 请求数据
      getdata () {
        let that = this;
        this.$axios.post('/wlsbgl/device/getDeviceMap')
          .then((res) => {
            console.log(res.data)
            that.getmark(res.data.rows)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // 获取地图图标数据
      getmark (data) {
         let markder = [];
         let text = '';
         let that = this
         data.forEach(ele => {
            markder.push({
              'id': ele.id,
              'position': [ele.lat, ele.lng],
              'text':ele.name,
              'offset':[-2,-45],
              'markderclick':{
                click: (id) => {
                console.log(id);
                },
              }
            })
         });

         this.markers = markder;
         this.texts = text;
         console.log(this.markers )
      },
      select(){
          let that = this;
          let selcontent = that.selsctInput;
          let sel = {
            'name':selcontent
          }
          that.$axios({
          method:'post',
          url:'/wlsbgl/device/getDeviceMap',
          data: that.qs.stringify(sel)  //将传递的参数变为字符形式
         })
          .then((res) => {
            console.log(res.data)
            that.getmark(res.data.rows)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  }
</script>

<style scoped>
.page {
  height: 650px;
  width: 100%;
}
.header{
    width: 100%;
    height: 10%;
    background: #f1f1f1
}
.header_left{
    float: left;
    margin: 18px 31px;
}
.header_right{
    float: right;
    margin-top: 5px;
    margin-right: 28px;
}
.amap-wrapper {
  width: 100%;
  height: 90%;
}
</style>
