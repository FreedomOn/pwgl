
<template>
  <div class="page">   
    <div class="header">
        <!-- <div class="header_left">
            <span>地图工具</span>
        </div> -->
        <div class="header_right">
            <el-input v-model="selsctInput"  placeholder="请输入设备名字进行搜索" style="width:400px"></el-input>
            <el-button type="primary" icon="el-icon-search"   @click="select()">快速搜索</el-button>
        </div>   
    </div> 
    <div class="amap-wrapper">
      <el-amap class="amap-box" :plugin="plugin" vid="amap-vue" :zoom="zoom" :center="center">
          <el-amap-marker v-for="marker in markers" :key="  
          marker.id"  :position="marker.position" :text="marker.text" :events="marker.markderclick"></el-amap-marker>
          <el-amap-text v-for="(text,index) in markers" :key="index" :text="text.text" :offset="text.offset" :position="text.position" >
          </el-amap-text>
          <!-- <el-amap-info-window
            :position="currentWindow.position"
            :content="currentWindow.content"
            :visible="currentWindow.visible"
            :events="currentWindow.events"
            autoMove=true>
          </el-amap-info-window> -->
      </el-amap>
    </div>
    <el-dialog
      title="设备基本信息"
      :visible.sync="dialogVisible"
      width="25%"
      :before-close="handleClose">

      <el-form :label-position="labelPosition" label-width="100px" :model="device">
        <el-form-item label="设备名称：">
          {{device.name}}
        </el-form-item>
        <el-form-item label="版本：">
          {{device.firmwareVersion}}
        </el-form-item>
        <el-form-item label="设备类型：">
          {{device.type}}
        </el-form-item>
        <el-form-item label="设备状态：">
          {{device.statusId}}
        </el-form-item>
      </el-form>


    </el-dialog>
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
       dialogVisible: false,
       device:{
         name:'',
         firmwareVersion:'',
         type:'',
         statusId:'',
       },
       labelPosition: 'right',
      //  currentWindow: {
      //       position: [0, 0],
      //       content: '',
      //       events: {},
      //       visible: false
      //  },
      //  slotWindow: {
      //       position: [120.163936,30.254841]
      //   },
      //  windows: [
      //       {
      //         position: [120.18726,30.288452],
      //         content: 'Hi! I am here!',
      //         visible: true,
      //         events: {
      //           close() {
      //             console.log('close infowindow1');
      //           }
      //         }
      //       }
      //   ],
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
      handleClose(done) {
            done();
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
                 console.log(ele.id);
                 that.dialogVisible = true;
                 let oneDevice = {
                   'id':ele.id,
                 }
                 that.$axios({
                    method:'post',
                    url:'/wlsbgl/device/getDeviceMapOne',
                    data: that.qs.stringify(oneDevice)
                 })
                 .then((res)=>{
                   console.log(res.data);
                   that.device.name = res.data.name;
                   that.device.firmwareVersion = res.data.firmwareVersion;
                   let deviceType = res.data.type;
                   if (deviceType == 0) {
                      that.device.type = "网关设备"
                    }else if(deviceType==1){
                      that.device.type = "终端设备"
                    }
                   let deviceStatus = res.data.statusId;
                    if(deviceStatus == 0){
                      that.device.statusId = '在线'
                    }else if(deviceStatus == 1){
                     that.device.statusId = '离线'
                    }else if(deviceStatus == 2){
                      that.device.statusId = '故障'
                    }
                 })
                 .catch((err)=>{
                   console.log(err)
                 })
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
    height: 7%;
    /* background: #f1f1f1 */
    margin-bottom: 5px 
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
