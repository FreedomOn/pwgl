<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-bg" style="padding:20px">
       <div class="dashboard-text">欢迎您:{{name}}  
        </div>
    </div> -->
    <div class="dashboard-bg">
        <div class="con_top_lrft">
            <div class="con_top_lrft_top">
                当前设备统计：
            </div>
            <div  class="con_top_buttom">
                <div class="con_top_left_left">
                    <ve-pie :data="piechartData" :settings="piechartSettings" height=300px></ve-pie>
                    <p>设备类型</p>
                </div>
                <div class="con_top_left_right">
                    <ve-pie :data="piechartDataGroup" :settings="piechartSettingsGroup" height=300px ></ve-pie>
                    <p>设备分组</p>
                </div>
            </div>
           
        </div>
        <div class="con_top_middle">
            <div class="con_top_middle_top">
                容器状态统计：
            </div>
            <div class="con_top_middle_content">
                <ve-histogram :data="histchartData" :settings="histchartSettings"  :extend="extend" height=300px></ve-histogram>
            </div>
        </div>
        <div class="con_top_right">
            <div class="con_top_right_top">
                应用统计
            </div>
            <div class="con_top_right_bottom">
                <p>-镜像数量({{mirrNum}})</p>
                <p>-应用数量({{applyNum}})</p>
                <p>-容器设备数量({{deviceNum}})</p> 
            </div> 
        </div>
    </div>
    <div class="dashboard-bg">
         <div class="con_mid_lrft">
            <div class="con_mid_lrft_top">
                设备数量趋势：
            </div>
            <div class="con_mid_left_buttom">
                 <ve-line :data="deviceLineChartData" :extend="deviceextend" :settings="deviceLineChartSettings" height=300px></ve-line>
            </div>
            <div class="con_mid_left_time">
                <el-date-picker
                    v-model="deviceValue"
                    @change="deviceSelTime"
                    type="daterange"
                    align="right"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
            </div>   
        </div>
        <div class="con_mid_middle">
            <div class="con_mid_middle_top">
                设备状态趋势：
            </div>
            <div class="con_mid_middle_content">
                 <ve-line :data="deviceTypeLineChartData" :extend="deviceTypeextend" :settings="deviceTypeLineChartSettings" height=300px></ve-line>
                 <!-- <ve-line :data="chartData" :settings="chartSettings" :extend="deviceTypeextend" height=300px>></ve-line> -->
                  <div class="con_mid_middle_time">
                    <el-date-picker
                        v-model="deviceTypeValue"
                        @change="deviceTypeSelTime"
                        type="daterange"
                        align="right"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </div>   
            </div>
        </div>
        <div class="con_mid_right">
            <div class="con_mid_right_top">
                使用统计
            </div>
            <div class="con_mid_right_bottom">
                <p>-电表应用({{electricNum}})</p>
                <p>-安全应用({{safeNum}})</p> 
                <p>-转换应用({{transitionNum}})</p>  
            </div>  
        </div>
    </div>
    <div class="bottom_bon_all">
        <div class="bottom_title">
            重要事件通知    
        </div>
        <div class="bottom_content">
            <ul v-for="(item,index) in info" :key="index">
                <li>{{item.name}}</li>
            </ul>
        </div>
        
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDeviceNumData,getDeviceTypeData} from '@/api/info'
export default {
  name: 'dashboard',    
  mounted() {
    this.getAllNum();
    this.getConType();
    this.getDeviceType();
    this.getDeviceGroup();
    this.getDeviceNum();
    this.getDeviceTypehaha();
  },
  methods: {
      //设备数量趋势选择时间段
    deviceSelTime(value){
        // console.log(value);
        console.log(this.deviceValue[0],this.deviceValue[1]);
        this.getDeviceNum();
    },
    deviceTypeSelTime(value){
        console.log(this.deviceTypeValue)
        this.getDeviceTypehaha();
    },
    //获取应用统计 1.镜像数量 2.应用数量 3. 容器设备数量
    getAllNum(){
        this.$axios({
            method:'post',
            url:'/wlsbgl/index/appImageDeviceNum',
        })
        .then((res) => {
            console.log(res.data);
            this.mirrNum = res.data.imageNum;
            this.applyNum = res.data.appNum;
            this.deviceNum = res.data.DeviceHostNum;
        })
        .catch((err) => {
            console.log(err)
        });
    },
    //获取容器状态统计
    getConType(){
        this.$axios({
            method:'post',
            url:'/wlsbgl/index/statusDevice',
        })
        .then((res) => {
            console.log(res.data);
            this.histchartData.rows = res.data.rows
        })
        .catch((err) => {
            console.log(err)
        });
    },
    //当前设备统计里面的 设备类型 接口
    getDeviceType(){
        this.$axios({
            method:'post',
            url:' /wlsbgl/index/typeDevice',
        })
        .then((res) => {
            console.log(res.data);
            this.piechartData.rows = res.data.rows;
            console.log(this.piechartData.rows)
        })
        .catch((err) => {
            console.log(err)
        });
    },
    //当前设备统计里面的 设备分组 接口
    getDeviceGroup(){
        this.$axios({
            method:'post',
            url:'/wlsbgl/index/DeviceGroup'
        })
        .then((res) => {
            console.log(res.data);
            this.piechartDataGroup.rows = res.data.rows;
            let groupData = res.data.rows;
            let arr = [];
            for(let i=0;i<groupData.length;i++){
                arr.push(groupData[i].设备分组)
            }
            console.log(arr);
            this.piechartDataGroup.columns = arr;
        })
        .catch((err) => {
            console.log(err)
        });
    },
    //设备数量趋势  
    async getDeviceNum(){ 
        let that = this;
        let time = {
            'startTime': this.deviceValue[0] ,
            'endTime':this.deviceValue[1],
        }
        let deviceNum = await  getDeviceNumData(time)
        console.log(deviceNum);
        this.deviceLineChartData.rows = deviceNum;
    },
    // 设备状态趋势
    async getDeviceTypehaha(){
        let that = this;
        let time = {
            'startTime': this.deviceTypeValue[0] ,
            'endTime':this.deviceTypeValue[1],
        }
        let deviceType = await  getDeviceTypeData(time)
        console.log(deviceType);
        this.deviceTypeLineChartData.rows = deviceType; 
    },
  },
  
  data () {  
    //设备类型扇形图
    this.piechartSettings = {
      dimension: '设备类型',
      metrics: '设备个数',
      radius: 60,
      offsetY:140
    }
    //设备分组扇形图
    this.piechartSettingsGroup = {
      dimension: '设备分组',
      metrics: '设备个数',
      radius: 60,
      offsetY:140
    }
    //容器状态统计柱状图
    this.histchartSettings = {
      metrics: ['在线', '离线', '故障'],
       dimension: ['容器状态']
    }
    //容器状体 柱状图 显示具体条数设置
    this.extend = {
        series: {
            label: { show: true, position: "top" }
        }
    }
    //设备数量趋势横坐标以time类型显示 纵坐标显示表头数量
    this.deviceLineChartSettings = {
       xAxisType: 'time',
       yAxisName: ['数量',],
    }
    //设备状态趋势横坐标以time类型显示 纵坐标显示表头数量
    this.deviceTypeLineChartSettings = {
       xAxisType: 'time',
       yAxisName: ['数量',],
    }
    //设置时间显示旋转45度
    this.deviceextend = {
        'xAxis.0.axisLabel.rotate': 45
    },
    this.deviceTypeextend = {
        'xAxis.0.axisLabel.rotate': 45
    }
    return {
      //设备类型数据
      piechartData: {
            columns: ['网关设备', '终端设备'],
            rows: []
        },
      //设备分组数据
       piechartDataGroup: {
            columns: [],
            rows: []
        },
        //容器状态统计数据
        histchartData: {
            columns: [ '在线', '离线', '故障'],
            rows: []
        },
        //设备数量趋势数据
        deviceLineChartData: {
            columns: ['日期', '网关设备', '终端设备', ],
            rows: []
        },
        //设备状态趋势数据
        deviceTypeLineChartData:{
           columns: ['日期', '在线', '离线', '故障'],
            rows: []
        },
        //时间选择
          pickerOptions: {
            shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近一个月',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近三个月',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
                }
            }]
        },
        deviceValue:'',
        deviceTypeValue:'',
        mirrNum:10,//镜像数量 
        applyNum:20,//应用数量
        deviceNum:30,// 容器设备数量
        electricNum:11,//电表应用
        safeNum:22,// 安全应用
        transitionNum:33,// 转换应用 
        info:[
          { name: 'Runoob' },
          { name: 'Google' },
         { name: 'Taobao' }
        ],//重要事件通知
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
    user_orgCode () {
      return this.$store.state.user.userlists[0].user_orgCode
    },
    user_orgname () {
      return this.$store.state.user.userlists[0].countryName
    },
    uer_type () {
      return this.$store.state.user.usertype
    },
    user_place () {
      return this.$store.state.user.userlists[0].user_place
    },
    user_placeCode () {
      return this.$store.state.user.userlists[0].user_placeCode
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    padding: 10px;
    background: #efefef;
  }
  &-text {
    font-size: 20px;
    line-height: 26px;
  }
  &-chart {
    font-size: 14px;
  }
  &-bg {
    background: #fff;
    margin-top: 10px;
    padding: 10px;
  }
}

// 
$colorrow1: #5ab1ef;
$colorrow2: #19d4ae;
$bordercolor: rgb(19, 7, 87);
.tablesrows {
  display: flex;
  font-size: 12px;
  background: #fff;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  .tablesrows-box1 {
    width: 82px;
    > div {
      padding: 10px 0;
      border-top: 1px solid $bordercolor;
    }
  }
  .tablesrows-box2 {
    flex: 1;
    display: flex;
    > div {
      flex: 1;
      text-align: center;
      
      > div {
        padding: 10px 0;
        border-left: 1px solid $bordercolor;
        border-top: 1px solid $bordercolor;
      }
    }
  }
}
.dashboard-bg{
    display: flex;
    width: 100%;
    flex-direction:row ;
    justify-content :space-around; 
    .con_top_lrft{
        width: 40%;
        height: 300px;
        // background: #f1f1f1;
        // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .con_top_lrft_top{
            margin-left: 20px;
            margin-top: 10px;
            color: #303133;
        }
        .con_top_buttom{
            display: flex;
            flex-direction:row ;
            justify-content :space-between ;
            padding-top:10px;
            .con_top_left_left{
            width: 295px;
            height: 300px;
            p{
                text-align: center;
                margin-top: -70px;
            }
            }
            .con_top_left_right{
                width: 295px;
                height: 300px;
                p{
                    text-align: center;
                    margin-top: -70px;
                }
            }
        }
    }
    .con_top_middle{
        width: 40%;
        height: 300px;
        // background: #f1f1f1;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .con_top_middle_top{
            margin-left: 20px;
            margin-top: 10px;
            color: #303133;
        }
    }
    .con_top_right{
        width: 18%;
        height: 300px;
        // background: #f1f1f1;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .con_top_right_top{
            background: #059d9d;
            color: white;
            height: 30px;
            line-height: 30px;
        }
        .con_top_right_bottom{
            p{
                margin-left: 15px;
            }
        }
    }
    .con_mid_lrft{
        width: 40%;
        height: 340px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .con_mid_lrft_top{
            margin-left: 20px;
            margin-top: 10px;
            color: #303133;
        }
        .con_mid_left_time{
            text-align: center;
            margin-top: -50px;
        }
    }
    .con_mid_middle{
        width: 40%;
        height: 340px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .con_mid_middle_top{
            margin-left: 20px;
            margin-top: 10px;
            color: #303133;
        }
        .con_mid_middle_time{
            text-align: center;
            margin-top: -50px;
        }
    }
    .con_mid_right{
        width: 18%;
        height: 340px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .con_mid_right_top{
            background: #059d9d;
            color: white;
            height: 30px;
            line-height: 30px;
        }
        .con_mid_right_bottom{
            p{
                margin-left: 15px;
            }
        }
    }
}
.bottom_bon_all{
        background: #fff;
        margin-top: 10px;
        padding: 10px;
         .bottom_title{
            // width: 100%;
            background: #059d9d;
            color: white;
            height: 30px;
            line-height: 30px;
        }
        li{
            list-style: none;
        }
    }
</style>
