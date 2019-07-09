<template>
  <div class="contnet">
    <div class="app-container">
    <div class="tree">
      <el-tree 
        :data="data2"
        default-expand-all
        :expand-on-click-node="false"
        node-key="id"
        highlight-current
        @node-click="handleNodeClick"
        :props="defaultProps"
        >
         <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span>{{ node.label }}</span>
                      <span>
                              <a class="num-tag">{{data.num}}</a>
                      </span>
          </span>
      </el-tree>
      <el-tree
        :data="data5"
        node-key="id"
        highlight-current
        default-expand-all
        :expand-on-click-node="false"
        @node-click="grouphandleNodeClick"
        :props="groupProps"
        :render-content="renderContent">
      </el-tree>
    </div>
    <div class="body">
      <div class="header">
         <span>
          <el-button type="primary" size='small' @click="facilityAdd()">设备添加</el-button>
          <el-button type="primary" size='small' @click="groupAdd()">分组添加</el-button>
          <el-button type="primary" size='small' @click="modelDaochu()">模板导出</el-button>
          <el-button type="primary" size='small' @click="excelDaocru()" >设备导入</el-button>
          <el-button type="primary" size='small' @click="excelDaochu()">设备导出</el-button>
        </span> 
        <span class="span1">
          <el-input v-model="selsctInput"  placeholder="请输入搜索内容" style="width:400px;border-radius: 30px"></el-input>
          <el-button type="primary" icon="el-icon-search"  @click="select()">快速搜索</el-button>
        </span>
      </div>
      <div class="content">
         <el-table
          :data="tableData"
          stripe
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          :height="tableHeight"
          @selection-change="handleSelectionChange"
          v-loading="loading"
          element-loading-text="拼命加载中">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="设备名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="statesdata"
            label="类型"
            width="120"
           >
          </el-table-column>
           <el-table-column
            prop="firmwareVersion"
            label="版本"
             width="90"
            >
          </el-table-column>
           <el-table-column
            prop="devstate"
            label="状态"
             width="90"
            >
          </el-table-column>
           <el-table-column
            prop="updateTime"
             width="170"
            label="更新时间"
            >
          </el-table-column>
          <el-table-column
            prop=""
            label="型号">
          </el-table-column>
            <el-table-column
            prop="deviceGroup.name"
            label="分组">
          </el-table-column>
          <el-table-column
          fixed="right"
          label="操作"
          width="310"
          >
          <template slot-scope="scope">
            <el-button-group>
              <el-button @click="mangeDetail(scope.row)" type="info" icon="el-icon-info"  size="small">详情</el-button>
              <!-- <el-button @click="mangeState(scope.row)" type="text"  size="small">|状态</el-button> -->
              <el-button @click="mangeBushu(scope.row)"  type="primary" icon="el-icon-setting" size="small">部署</el-button>
              <el-button @click="mangedelete(scope.row)" type="danger" icon="el-icon-delete" size="small">删除</el-button>
              <el-button @click="mangeupdate(scope.row)" type="primary" icon="el-icon-edit" size="small">编辑</el-button> 
            </el-button-group>
          </template>
          </el-table-column>
        </el-table>
         <div v-if='fenye' class="pagination">
            <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="devicePageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
      </div>
    </div>
    
    <el-dialog
      title="请输入分组名字"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input v-model="groupinput" placeholder="请输入分组名字"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureGroup">确 定</el-button>
      </span>
    </el-dialog>
     <el-dialog
      title="添加网络设备"
      :visible.sync="adddialogVisible"
      width="70%"
      :before-close="handleClose">
      <el-form :inline="true" :model="addNetwork" ref="addNetwork" :rules="rules">
        <div class="addStyle">
          <span>基本信息：</span>
           <el-row>
              <el-col :span="12">
                  <el-form-item label="设备名称" prop='mangeName'>
                  <el-input v-model="addNetwork.mangeName" clearable placeholder="请输入..." style="width:300px"></el-input>
                  </el-form-item> 
              </el-col>
               <el-col :span="12">
                <el-form-item label="设备类型" prop='radio'>
                      <el-radio v-model="addNetwork.radio" label="0">网关设备</el-radio>
                      <el-radio v-model="addNetwork.radio" label="1">终端设备</el-radio>
                  </el-form-item> 
              </el-col>
          </el-row>
           <el-row>
              <el-col :span="12">
                <el-form-item label="分组" prop='value'>
                    <el-select v-model="addNetwork.value" placeholder="请选择" style="width:327px">
                    <el-option
                      v-for="item in addNetwork.selectGroup"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item> 
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                  <el-form-item label="经度" prop='jingdu'>
                  <el-input v-model="addNetwork.jingdu" clearable placeholder="请输入..." style="width:327px"></el-input>
                  </el-form-item> 
              </el-col>
              <el-col :span="12">
                  <el-form-item label="维度" prop='weidu'>
                  <el-input v-model="addNetwork.weidu" clearable placeholder="请输入..." style="width:300px"></el-input>
                  </el-form-item> 
              </el-col>
          </el-row>
           <el-row>
              <el-col :span="12">
                <el-form-item label="描述" prop='textarea'>
                      <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      style="width:750px"
                      v-model="addNetwork.textarea">
                    </el-input>
                  </el-form-item> 
              </el-col>
          </el-row>
        </div>
         <div class="addStyle1">
           <span>网关信息:</span>
            <el-row>
              <el-col :span="12">
                  <el-form-item label="固件版本" prop='firmware'>
                  <el-input v-model="addNetwork.firmware" clearable placeholder="请输入..." style="width:300px"></el-input>
                  </el-form-item> 
              </el-col>
               <el-col :span="12">
                  <el-form-item label="硬件信息" prop='hardware'>
                  <el-input v-model="addNetwork.hardware" clearable placeholder="请输入..." style="width:300px"></el-input>
                  </el-form-item> 
              </el-col>
          </el-row>
           <el-row>
              <el-col :span="12">
                  <el-form-item  prop='checked'>
                    <el-checkbox v-model="addNetwork.checked" @change="checkedChange()">容器支持</el-checkbox>
                  </el-form-item> 
              </el-col>
          </el-row>
            <el-row>
              <el-col :span="12">
                  <el-form-item label="容器版本" prop='container'>
                  <el-input v-model="addNetwork.container" clearable :disabled="vrnoclick" placeholder="请输入..." style="width:300px"></el-input>
                  </el-form-item> 
              </el-col>
          </el-row>
         </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd('addNetwork')">确 定</el-button>
      </span>
    </el-dialog>
     <el-dialog
      title="修改网络设备"
      :visible.sync="updatedialogVisible"
      width="70%"
      :before-close="handleClose">
      <el-form :inline="true" :model="updateNetwork" ref="updateNetwork" :rules="rules">
        <div class="addStyle">
          <span>基本信息：</span>
           <el-row>
              <el-col :span="12">
                  <el-form-item label="设备名称" prop='mangeName'>
                  <el-input v-model="updateNetwork.mangeName" clearable placeholder="请输入..." style="width:300px"></el-input>
                  </el-form-item> 
              </el-col>
               <el-col :span="12">
                <el-form-item label="设备类型" prop='radio'>
                      <el-radio v-model="updateNetwork.radio" label="0">网关设备</el-radio>
                      <el-radio v-model="updateNetwork.radio" label="1">终端设备</el-radio>
                  </el-form-item> 
              </el-col>
          </el-row>
           <el-row>
              <el-col :span="12">
                <el-form-item label="分组" prop='value'>
                    <el-select v-model="updateNetwork.value" placeholder="请选择" @change='updatechangesel' style="width:300px">
                    <el-option
                      v-for="item in updateNetwork.selectGroup"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item> 
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                  <el-form-item label="经度" prop='jingdu'>
                  <el-input v-model="updateNetwork.jingdu" clearable placeholder="请输入..." style="width:300px"></el-input>
                  </el-form-item> 
              </el-col>
              <el-col :span="12">
                  <el-form-item label="维度" prop='weidu'>
                  <el-input v-model="updateNetwork.weidu" clearable placeholder="请输入..." style="width:300px"></el-input>
                  </el-form-item> 
              </el-col>
          </el-row>
           <el-row>
              <el-col :span="12">
                <el-form-item label="描述" prop='textarea'>
                      <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      style="width:750px"
                      v-model="updateNetwork.textarea">
                    </el-input>
                  </el-form-item> 
              </el-col>
          </el-row>
        </div>
         <div class="addStyle1">
           <span>网关信息:</span>
            <el-row>
              <el-col :span="12">
                  <el-form-item label="固件版本" prop='firmware'>
                  <el-input v-model="updateNetwork.firmware" clearable placeholder="请输入..." style="width:300px"></el-input>
                  </el-form-item> 
              </el-col>
               <el-col :span="12">
                  <el-form-item label="硬件信息" prop='hardware'>
                  <el-input v-model="updateNetwork.hardware" clearable placeholder="请输入..." style="width:300px"></el-input>
                  </el-form-item> 
              </el-col>
          </el-row>
           <el-row>
              <el-col :span="12">
                  <el-form-item  prop='checked'>
                    <el-checkbox v-model="updateNetwork.checked" @change="updatecheckedChange()">容器支持</el-checkbox>
                  </el-form-item> 
              </el-col>
          </el-row>
            <el-row>
              <el-col :span="12">
                  <el-form-item label="容器版本" prop='container'>
                  <el-input v-model="updateNetwork.container" clearable :disabled="updatenoclick" placeholder="请输入..." style="width:300px"></el-input>
                  </el-form-item> 
              </el-col>
          </el-row>
         </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updatedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureupdate('updateNetwork')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="detailDialogVisible"
      width="70%"
      :before-close="handleClose">
      <el-tabs type="border-card" @tab-click="handleClick"  v-model="activeName" style="height:540px">
        <el-tab-pane label="基本信息" name="first" class="detailInfo">
          <el-row>
             <el-col :span="18" class="detailname">{{terminalDevice}}</el-col>
             <el-col :span="6">
               <el-button type="primary">重启</el-button>
               <el-button type="primary">更新</el-button>
             </el-col>
          </el-row>
          <div class="basicInfomation">
            <el-form :inline="true" :model="basicInfo">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="uuid:">
                          {{basicInfo.uuid}}
                  </el-form-item> 
                </el-col>
              </el-row>
               <el-row>
                <el-col :span="12">
                  <el-form-item label="设备编号:">
                          {{basicInfo.deviceNum}}
                  </el-form-item> 
                </el-col>
                <el-col :span="12">
                  <el-form-item label="序列号:">
                          {{basicInfo.orderNum}}
                  </el-form-item> 
                </el-col>
              </el-row>
               <el-row>
                <el-col :span="12">
                  <el-form-item label="设备类型:">
                          {{basicInfo.deviceType}}
                  </el-form-item> 
                </el-col>
                <el-col :span="12">
                  <el-form-item label="状态:">
                          {{basicInfo.state}}
                  </el-form-item> 
                </el-col>
              </el-row>
               <el-row>
                <el-col :span="12">
                  <el-form-item label="坐标:">
                          {{basicInfo.position}}
                  </el-form-item> 
                </el-col>
              </el-row>
               <el-row>
                <el-col :span="12">
                  <el-form-item label="启动时间:">
                          {{basicInfo.startTime}}
                  </el-form-item> 
                </el-col>
                <el-col :span="12">
                  <el-form-item label="更新时间:">
                          {{basicInfo.updateTime}}
                  </el-form-item> 
                </el-col>
              </el-row>
               <el-row>
                <el-col :span="12">
                  <el-form-item label="固件版本:">
                          {{basicInfo.firmware}}
                  </el-form-item> 
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-row>  
              <span class="descInfo">描述信息:</span>  <span>{{basicInfo.desc}}</span>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="配置信息" name="second" class="detailInfo">配置信息</el-tab-pane>
        <el-tab-pane label="事件列表" name="third" class="detailInfo">事件列表</el-tab-pane>
        <el-tab-pane label="容器应用"  name="fourth" class="detailInfo">容器应用</el-tab-pane>
      </el-tabs>
      <!-- <span slot="footer" class="dialog-footer,detailFooter">
        <el-button @click="detailDialogVisible = false"  type="primary" >关闭</el-button>
      </span> -->
    </el-dialog>
     <el-dialog
      title="删除分组"
      :visible.sync="deletedialogVisible"
      width="50%"
      :before-close="handleClose">
         <i class="el-icon-warning"></i> 删除分组后不可恢复，确定删除吗？
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureDeleteGroup">确 定</el-button>
      </span>
    </el-dialog>
     <el-dialog
      title="删除设备"
      :visible.sync="deleteDevicedialogVisible"
      width="50%"
      :before-close="handleClose">
         <i class="el-icon-warning"></i> 删除设备后不可恢复，确定删除吗？
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDevicedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureDeleteDevice">确 定</el-button>
      </span>
    </el-dialog>
      <!-- 文件上传 -->
      <section>
            <el-dialog
                title="设备分组excel上传"
                :visible.sync="filedialogVisible"
                width="50%"
                >
                <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="changefile"
                :limit="fileform.limit"
                :file-list="fileform.filelist"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传excel文件，一次只上传一个文件</div>
                </el-upload>
                <div v-show="fileform.errlist.length !== 0">
                <ul>
                    <li v-for="(item, index) in fileform.errlist" :key="index" style="color:red">{{item}}</li>
                </ul>
                </div>
                <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="closechangefile">关闭</el-button>
                </span>
          </el-dialog>
      </section>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDeviceData,addDevice,selectDevice,getGroup,addGroup,deleteGroup,delDevice,updateDevice} from '@/api/device'
let id=1000
export default {
  name: 'dashboard',
  mounted() {
    this.getData();  
    this.getTreeGroup();
    this.getnum();
  },
  methods: {
    //获取所有设备
    async getData () {
      let that = this;
      that.fenye = false;
      let currentNum = that.currentPage;
      let everyNum = that.devicePageSize;
      let devicesj = {
         'pageSize':currentNum,
         'pageNum':everyNum,
         'type':-1,
         'deviceGroupId':-1,
         'statusId':-1
       }
      let newdata = await selectDevice(devicesj) 
        // console.log(newdata)
      if(newdata.status == '200'){
          that.fenye = true;
          let arr = newdata.rows;
          // console.log(arr);
          let newArr = [];
          arr.forEach(element =>{
            let i = element.type;
            let j = element.statusId;
            if(j == 0){
              element.devstate = '在线'
            }else if(j == 1){
              element.devstate = '离线'
            }else if(j == 2){
              element.devstate = '故障'
            }
            if (i == 0) {
                element.statesdata = "网关设备"
              }else if(i==1){
                element.statesdata = "终端设备"
              }
              newArr.push(element)
          })
          // console.log(newArr)
          this.tableData = newArr;
          this.total = newdata.total;
          this.loading = false;
        }else {
          this.loading = false;
        } 
      },
      async getnum(){
          let that = this;
          let currentNum = that.currentPage;
          let everyNum = that.devicePageSize;
          let gatewayTotal = 0;
          let data2 = that.data2;
          let devicewg = {
            'pageSize':currentNum,
            'pageNum':everyNum,
            'type':0,
            'deviceGroupId':-1,
            'statusId':-1
          }
          let gatewayData = await selectDevice(devicewg);
          console.log(11111111)
          console.log(gatewayData)
          let offFhildren = [];
          let onChildren = [];
          gatewayData.rows.forEach(element =>{
            if(element.statusId == 1){
                console.log(element)
                offFhildren.push(element.id)
                // data2[0].children[0].children[0].num = offarr.length;
                // gatewayTotal = gatewayTotal+gatewayData.rows.length;
            }
            else if(element.statusId == 0){
                onChildren.push(element.id)
                // data2[0].children[0].children[1].num = gatewayData.rows.length;
                // gatewayTotal = gatewayTotal+gatewayData.rows.length;
            }
        })
        console.log(offFhildren.length);
        data2[0].children[0].children[1].num = offFhildren.length;
        data2[0].children[0].children[0].num = onChildren.length;
        data2[0].children[0].num = gatewayData.rows.length;
        console.log(gatewayTotal)
        let endpointTotal = 0;
        let devicezd = {
            'pageSize':currentNum,
            'pageNum':everyNum,
            'type':1,
            'deviceGroupId':-1,
            'statusId':-1
          }
        let endpointData = await selectDevice(devicezd);
        console.log(22222)
        console.log(endpointData)
        let online = [];
        let offline = [];
        let guline = [];
        endpointData.rows.forEach(element =>{
        if(element.statusId == 0){//在线
            online.push(element.id)
            // data2[0].children[1].children[0].num = endpointData.rows.length;
            // endpointTotal = endpointTotal+endpointData.rows.length;
        }
        else if(element.statusId == 1){//离线
            offline.push(element.id)
            // data2[0].children[1].children[1].num = endpointData.rows.length;
            // endpointTotal = endpointTotal+endpointData.rows.length;
        }
        else if(element.statusId == 2){//故障
            guline.push(element.id)
            // data2[0].children[1].children[2].num = endpointData.rows.length;
            // endpointTotal = endpointTotal+endpointData.rows.length;
        }
        })
        data2[0].children[1].children[0].num = online.length; 
        data2[0].children[1].children[1].num = offline.length; 
        data2[0].children[1].children[2].num = guline.length; 
        data2[0].children[1].num = endpointData.rows.length;
        data2[0].num =gatewayData.rows.length + endpointData.rows.length;
        console.log(endpointTotal)
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        let that = this;
        that.devicePageSize = val;
        that.getData();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        let that = this;
        that.currentPage = val;
        that.loading = true;
        that.getData();
      },
      //左侧树  所有设备点击事件
     handleNodeClick(data) {
        let that = this;
        that.currentPage = 1;
        console.log(data);
        that.loading = true;
        if(data.label == '网关设备'){
          that.deviceType = 0;
          that.devState = -1;
          console.log(333);
        }else if(data.label == '终端设备'){
           that.deviceType = 1;
           that.devState = -1;
        }else if(data.label == '所有设备'){
           that.deviceType = -1;
           that.devState = -1;
        }
        if(data.id == 3){
           that.deviceType = 0;
           that.devState = 0;
        }else if(data.id == 4){
           that.deviceType = 0;
           that.devState = 1;
        }
        if(data.id == 5){
          that.deviceType = 1;
           that.devState = 0;
        }else if(data.id == 6){
          that.deviceType = 1;
           that.devState = 1;
        }else if(data.id == 7){
          that.deviceType = 1;
           that.devState = 2;
        }
        that.getTreeData();
      },
      //树请求数据函数
     async getTreeData(){
        let that = this;
        that.fenye = false;
        let currentNum = that.currentPage;
        let everyNum = that.devicePageSize;
        let deviceState = that.deviceType;
        let deviceStaID = that.devState;
        let devicesj = {
         'pageSize':currentNum,
         'pageNum':everyNum,
         'type':deviceState,
         'name':'',
         'deviceGroupId':-1,
         'statusId':deviceStaID
       }
       let treeData = await selectDevice(devicesj) 
       if(treeData.status == '200'){
           that.fenye = true;
           let arr = treeData.rows;
           let newArr = [];
           arr.forEach(element =>{
              let i = element.type;
              let j = element.statusId;
              if(j == 0){
                element.devstate = '在线'
              }else if(j == 1){
                element.devstate = '离线'
              }else if(j == 2){
                element.devstate = '故障'
              }
              if (i == 0) {
                  element.statesdata = "网关设备"
                }else if(i==1){
                  element.statesdata = "终端设备"
                }
                newArr.push(element)
            })
          that.tableData =newArr;
          that.total = treeData.total;
          that.loading= false;
       }else{
          that.loading= false;
       }
      
      },
      //分组点击事件
      grouphandleNodeClick(data) {
        console.log(data);
        let that = this;
        that.deleteGroupId = data.id;
        that.getgroupeData();
      },
      async getgroupeData(){
        let that = this;
        that.fenye = false;
        let currentNum = that.currentPage;
        let everyNum = that.devicePageSize;
        let deviceid = that.deleteGroupId;
        let deviceStaID = that.devState;
        let devicesj = {
         'pageSize':currentNum,
         'pageNum':everyNum,
         'deviceGroupId':deviceid,
         'statusId':deviceStaID
       }
       let treeData = await selectDevice(devicesj) 
       if(treeData.status == '200'){
           that.fenye = true;
           let arr = treeData.rows;
           let newArr = [];
           arr.forEach(element =>{
              let i = element.type;
              let j = element.statusId;
              if(j == 0){
                element.devstate = '在线'
              }else if(j == 1){
                element.devstate = '离线'
              }else if(j == 2){
                element.devstate = '故障'
              }
              if (i == 0) {
                  element.statesdata = "网关设备"
                }else if(i==1){
                  element.statesdata = "终端设备"
                }
                newArr.push(element)
            })
          that.tableData =newArr;
          that.total = treeData.total;
          that.loading= false;
       }else{
          that.loading= false;
       }
      },
      //右上角模糊快速搜索
      select:function(){
         let that = this;
         that.selectData();
      },
      async selectData(){
        let that = this;
        that.fenye = false;
        let currentNum = that.currentPage;
        let everyNum = that.devicePageSize;
        let selectContent = that.selsctInput;
        let deviceState = that.deviceType;
        let deviceid = that.deleteGroupId;
        let devicest =  that.devState
        let seldevicesj = {
          'pageSize':currentNum,
          'pageNum':everyNum,
          'type':deviceState,
          'name':selectContent,
          'uuid':'',
          'deviceGroupId':deviceid,
          'statusId':devicest
        }
        let selcetsj = await selectDevice(seldevicesj) 
        if(selcetsj.status == '200'){
           that.fenye = true;
           let arr = selcetsj.rows;
           let newArr = [];
           arr.forEach(element =>{
              let i = element.type;
              let j = element.statusId;
              if(j == 0){
                element.devstate = '在线'
              }else if(j == 1){
                element.devstate = '离线'
              }else if(j == 2){
                element.devstate = '故障'
              }
              if (i == 0) {
                  element.statesdata = "网关设备"
                }else if(i==1){
                  element.statesdata = "终端设备"
                }
                newArr.push(element)
            })
           that.tableData =newArr;
           that.total = selcetsj.total;
           that.loading= false;
           that.$notify({
            title: '成功',
            message: '查询成功',
            type: 'success'
        });
       }else{
          that.loading= false;
          that.$notify.error({
                title: '失败',
                message: '查询失败',
            });
       }
      },
    //设备添加
    async facilityAdd(){
        let that = this;
        let groupData = await getGroup();
        that.addNetwork.selectGroup = groupData.rows;
        console.log(groupData) 
        that.adddialogVisible = true;
        //将上一次填写的内容请
        that.addNetwork.mangeName = '';
        that.addNetwork.value ='';
        that.addNetwork.jingdu = '';
        that.addNetwork.weidu = '';
        that.addNetwork.textarea = '';
        that.addNetwork.firmware = '';
        that.addNetwork.hardware = '';
        that.addNetwork.container = '';
        that.addNetwork.checked = false;
        that.vrnoclick = true;
        that.getdatetime();
      },
    //获取时间
    async getdatetime(){
        let that = this;
        let myDate = new Date();
        let nowYear=new Date().getFullYear().toString()
        let nowMonth=(new Date().getMonth() + 1).toString()
        let nowDay=new Date().getDate().toString();
        let nowHours= new Date().getHours().toString();       //获取当前小时数(0-23)
        let nowMin= new Date().getMinutes().toString();     //获取当前分钟数(0-59)
        let nowSeconds= new Date().getSeconds().toString();     //获取当前秒数(0-59)
        function timeAdd0(str) {
            if(str.length<=1){
                str='0'+str;
            }
            return str
        }
        nowYear=timeAdd0(nowYear)
        nowMonth=timeAdd0(nowMonth)
        nowDay=timeAdd0(nowDay)
        nowHours=timeAdd0(nowHours)
        nowMin=timeAdd0(nowMin)
        nowSeconds=timeAdd0(nowSeconds)
        console.log(nowYear+'-'+nowMonth+'-'+nowDay+' '+nowHours+':'+nowMin+':'+nowSeconds);
        that.nowTime = nowYear+'-'+nowMonth+'-'+nowDay+' '+nowHours+':'+nowMin+':'+nowSeconds
    },
    async getTreeGroup(){
          let grouptreeData = await getGroup();
          // console.log(grouptreeData);
          let that = this;
          that.data5[0].children = grouptreeData.rows;
          // console.log(that.data5)
          // console.log(that.data5[0].children)
      },
    //确定添加
    async sureAdd(addNetwork){
        let that = this;
        that.$refs[addNetwork].validate((valid) => {
          if (valid) {
            that.loading = true;
            that.adddialogVisible = false;
            that.addFunc();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      },
    async addFunc(){
        let that = this;
        let deviceName = that.addNetwork.mangeName; //设备名称
        let deviceType = that.addNetwork.radio;//设被类型 
        let deviceBanben = that.addNetwork.firmware;//固件版本
        let jdPosition =  that.addNetwork.jingdu;//经度
        let wdPostion = that.addNetwork.weidu;//维度
        let description = that.addNetwork.textarea;//描述
        let yingInfo = that.addNetwork.hardware;//硬件信息
        let contentVr = that.addNetwork.container//容器版本
        let fenGroup = that.addNetwork.value;//分组
        let nowdata =  that.nowTime//时间
        let addData = {
        'name':deviceName,
        'type':deviceType,
        'firmwareVersion':deviceBanben,
        'updataTime':nowdata,
        'lat':jdPosition,
        'lng':wdPostion,
        'description':description,
        'hardwareInfo':yingInfo,
        'containerVersion':contentVr,
        'deviceGroupId':fenGroup,
        }
        let param = {
          'param':JSON.stringify(addData),

        }
        let addsj = await addDevice(param) 
        console.log(addsj)
        if(addsj.status == '200'){
          that.adddialogVisible = false;
          that.loading = false;
          that.$notify({
            title: '成功',
            message: '新增成功',
            type: 'success'
          });
          that.getData();
        }else{
          that.loading = false;
          that.$notify.error({
                title: '失败',
                message: '新增失败',
            });
          that.getData();
          }
      },
    //设备添加 选择可输入版本
    checkedChange:function(){
        // console.log(111)
        let that = this;
        let selState = that.addNetwork.checked;
        console.log(selState)
        if(selState == true){
          that.vrnoclick = false;
        }else{
           that.vrnoclick = true;
           that.addNetwork.container = '';
        } 
      },
    //设备修改 选择可输入版本
    updatecheckedChange:function(){
        // console.log(111)
        let that = this;
        let selState = that.updateNetwork.checked;
        console.log(selState)
        if(selState == true){
          that.updatenoclick = false;
        }else{
           that.updatenoclick = true;
           that.updateNetwork.container = '';
        } 
      },
    //详情
    mangeDetail(scope){
        let that = this;
        console.log(scope);
        that.detailDialogVisible = true;
        that.activeName = 'first';
        that.basicInfo.uuid = scope.uuid;
        that.basicInfo.deviceNum = '';//设备编号
        that.basicInfo.orderNum = ''; //序列号
        let devicetype = scope.type;
        if(devicetype == 0){
          that.basicInfo.deviceType = '网关设备'
        }else if(devicetype == 1){
          that.basicInfo.deviceType = '终端设备'
        }
        that.basicInfo.state  = '';//状态
        that.basicInfo.position = '经度：'+scope.lat +'   ' + '维度：'+scope.lng;
        that.basicInfo.startTime = '';//开始时间
        that.basicInfo.updateTime = scope.updateTime;
        that.basicInfo.firmware = scope.firmwareVersion;
        that.basicInfo.desc = scope.description;
      
      },
    //详情内tab切换
    handleClick(tab, event) {
        console.log(tab, event);
    },
    //状态
    mangeState(scope){
        let that = this;
        console.log(scope);
      },
    //部署
    mangeBushu(scope){
        let that = this;
        console.log(scope);
      },
    //删除
    mangedelete (data) {
        let that = this
        this.$confirm('此操作将删除本设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           that.sureDeleteDevice(data)
        }).catch(() => {
           console.log('取消了删除')
       })
      },

    async sureDeleteDevice(scope){
        let that = this;
        let deluuID =  that.deluuid;
        let delId = that.delid;
        let delData = {
          'uuid':scope.uuid,
          'id':scope.id,
        }
        let delsj = await delDevice(delData);
        console.log(delsj)
        that.deleteDevicedialogVisible = false;
        if(delsj.status == '200'){
          that.loading = false;
          that.$notify({
            title: '成功',
            message: delsj.msg,
            type: 'success'
          });
          that.getData();
        }else{
          that.loading = false;
          that.$notify.error({
                title: '失败',
                message: delsj.msg,
            });
          that.getData();
          }
      },
    renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span class='groupdelete1'>{node.label}</span>
            <span class="groupdelete">
              <i  class="el-icon-close" size="mini"   on-click={ () => this.remove() }></i>
            </span>
          </span>);
    },
    async remove(){
      let that = this;
      that.deletedialogVisible = true;
    },
    //弹窗关闭事件
    handleClose(done) {
            done();
      },
    
    //提示信息
    tipMesg (res) {
        if(res.states == '200') {
        this.$notify({
            title: '成功',
            message: res.msg,
            type: 'success'
        });
              this.getData()
        }else {
            this.$notify.error({
            title: '错误',
            message: res.msg
        });
            this.getData()
       }
    },
    //设备编辑
    async mangeupdate(scope){
      let that = this;
      console.log(scope);
      that.updatedialogVisible = true;
      let groupData = await getGroup();
      that.updateNetwork.selectGroup = groupData.rows;
      that.updateNetwork.id = scope.id;//设备id 
      that.updateNetwork.mangeName = scope.name;//设备名字
      that.updateNetwork.radio = scope.type.toString();//设被类型 
      that.updateNetwork.value = scope.deviceGroup.name;//分组
      that.updateNetwork.groupid = scope.deviceGroup.id;//分组id
      that.updateNetwork.firmware = scope.firmwareVersion;//固件版本
      that.updateNetwork.jingdu = scope.lat;//经度
      that.updateNetwork.weidu = scope.lng;//维度
      that.updateNetwork.textarea = scope.description;//描述
      that.updateNetwork.hardware = scope.hardwareInfo;//硬件信息
      that.updateNetwork.uuid = scope.uuid;
      console.log(that.updateNetwork.groupid,that.updateNetwork.value)
      //还差一个容器版本
      that.getdatetime();
    },
    updatechangesel(key){
      let that = this;
      console.log(key);
      that.updateNetwork.groupid = key;
    },
    async sureupdate(updateNetwork){
        let that = this;
           that.$refs[updateNetwork].validate((valid) => {
           if (valid) {
            that.loading = true;
            that.updatedialogVisible = false;
            that.updateFun();
          } else {
                console.log('error submit!!');
                return false;
              }
          });
    },
    async updateFun(){
        let that = this;
        let deviceid = that.updateNetwork.id;//设备id
        let deviceName = that.updateNetwork.mangeName; //设备名称
        let deviceType = that.updateNetwork.radio;//设被类型 
        let deviceBanben = that.updateNetwork.firmware;//固件版本
        let jdPosition =  that.updateNetwork.jingdu;//经度
        let wdPostion = that.updateNetwork.weidu;//维度
        let description = that.updateNetwork.textarea;//描述
        let yingInfo = that.updateNetwork.hardware;//硬件信息
        let contentVr = that.updateNetwork.container//容器版本
        let fenGroup = that.updateNetwork.groupid;//分组
        let updateuuid =  that.updateNetwork.uuid;
        let nowdata =  that.nowTime//时间
        console.log(fenGroup);
        let updateData = {
        'id':deviceid,
        'uuid':updateuuid,
        'name':deviceName,
        'type':deviceType,
        'firmwareVersion':deviceBanben,
        'updataTime':nowdata,
        'lat':jdPosition,
        'lng':wdPostion,
        'description':description,
        'hardwareInfo':yingInfo,
        'containerVersion':contentVr,
        'deviceGroupId':fenGroup,
        }
        let param = {
          'param':JSON.stringify(updateData),
        }
        let updatesj = await updateDevice(param);
        console.log(updatesj)
        that.loading = false;
          if(updatesj.status == '200'){
            that.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
            that.getData();
          }else{
            that.$notify.error({
                  title: '失败',
                  message: '修改失败',
              });
            that.getData();
            }
    },
    //分组添加
    async groupAdd(){
      let that = this;
      that.dialogVisible = true;
      that.groupinput = '';
    },
    async sureGroup(){
      let that = this;
      let addGdata = that.groupinput;
      let addGroupdata = {
        'name':addGdata
      }
      let groupdata = await addGroup(addGroupdata);
      that.dialogVisible = false;
      if(groupdata.status == '200'){
          that.adddialogVisible = false;
          that.loading = false;
          that.$notify({
            title: '成功',
            message: '分组新增成功',
            type: 'success'
          });
          that.getTreeGroup();
        }else{
          that.loading = false;
          that.$notify.error({
                title: '失败',
                message: '分组新增失败',
            });
          that.getTreeGroup();
          }
    },
    //分组删除
    async sureDeleteGroup(){
        let that = this;
        let delId =  that.deleteGroupId;
        let delGroupData = {
          'id':delId
        }
        that.deletedialogVisible = false;
        let aaa = await deleteGroup(delGroupData);
        console.log(aaa)
        if(aaa.status == '200'){
          that.loading = false;
          that.$notify({
            title: '成功',
            message: aaa.msg,
            type: 'success'
          });
          that.getTreeGroup();
        }else{
          that.loading = false;
          that.$notify.error({
                title: '失败',
                message:  aaa.msg,
            });
          that.getTreeGroup();
          }
    },
    //模板导出
    modelDaochu:function(){
      console.log('模板导出')
      let that = this;
      that.$axios({
            method:'post',
            url:'/wlsbgl/deviceExcel/exportNull',       
            responseType:'blob',
        })
        .then((res) => {
            console.log(res.data)
            let blob = new Blob([res.data],{type: res.headers['content-type']});
            let downloadElement = document.createElement('a');
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = '设备管理模板.xlsx'; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
          })
        .catch((err) => {
            console.log(err)
            
        });   
    },
    //多选
    handleSelectionChange(val) {
        let that = this;
        console.log(val);
        var arr = []
        for (let i in val) {
            arr.push(val[i].uuid); //属性
        }
        that.multipleSelection = arr;
        console.log(that.multipleSelection) 
    },
    //定义一些消息提示框
    tipminerr (mesg = '错了哦，这是一条错误消息') {
        this.$message.error(mesg);
      },
    //excel导出
    excelDaochu:function(){
        console.log('excel导出')
        let that = this;
        if(that.multipleSelection.length == 0) {
           that.tipminerr('请选择需要导出的设备，最少选一条')
           return false
         }
         let excelData = that.multipleSelection;
         console.log(excelData);
         let excelstr = '';
         for(let i=0;i<excelData.length;i++){
             console.log(excelData[i])  
             excelstr = excelstr + excelData[i] + ','
         }
         console.log(excelstr)
         let postdata = {
           'all':0,
           'params':excelstr
         }
         console.log(postdata)
         that.$axios({
            method:'post',
            url:'/wlsbgl/deviceExcel/export',
            responseType:'blob',
            data: that.qs.stringify(postdata)  //将传递的参数变为字符形式
        })
        .then((res) => {
            console.log(res.data);
            let blob = new Blob([res.data],{type: res.headers['content-type']});
            let downloadElement = document.createElement('a');
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = '设备管理excel.xlsx'; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch((err) => {
            console.log(err)
        });
    },
    //excel导入
    excelDaocru(){
        this.filedialogVisible = true;
      },
    //excel导入  上传excel文件
    changefile (file) {
         console.log(file)
        let  reg = /^.*\.(?:xls|xlsx)$/i;//文件名可以带空格
        if (!reg.test(file.name)) {//校验不通过
            this.tipminerr('请上传excel格式的文件')
            this.fileform.filelist = []
            return false;
        }   
         this.fileform.file = file.raw
         this.fileform.filename = file.name
      },
      //关闭
    closechangefile(){
          let that = this;
          that.filedialogVisible = false;
          this.fileform.filelist = [];
          this.fileform.errlist = [];
      },
      // 上传表格
    submitUpload () {
            let that = this
            that.getdatetime();//获取时间
            if(that.fileform.name == "") {
              that.tipminerr('请上传表格文件')
              return;
            }
            let formData = new FormData();
            formData.append( 'file', that.fileform.file);
            formData.append( 'filename', that.fileform.filename);
            formData.append( 'time',  that.nowTime);
            let url = 'wlsbgl/deviceExcel/importExcel';
            let config = {
              headers:{'Content-Type':'multipart/form-data'}
            };
            this.$axios.post(url,formData, config).then(function (data) {
              console.log(data)
               let states = data.data.status;
               if (states == '200'){
                    that.$notify({
                      title: '成功',
                      message: '导入成功',
                      type: 'success'
                    });
               }else if(states == '400'){
                   that.$notify({
                      title: '部分成功',
                      message: '部分导入成功',
                      type: 'warning'
                    });
                    let str = data.data.msg; //这是一字符串
                    let arr = [];
                    let strs= new Array(); //定义一数组 
                    strs=str.split(","); //字符分割 
                    for (let i=0;i<strs.length -1 ;i++ ) { 
                      console.log(strs[i]);
                       arr.push(strs[i]);
                    } 
                    console.log(arr);
                   that.fileform.errlist = arr;
                   console.log( that.fileform.errlist)
               }else if(states == '500'){
                   that.$notify({
                      title: '失败',
                      message: '导入失败',
                      type: 'error'
                    });
               }
               that.getData()
            }).catch((err) => {
                console.log(err)
                that.$notify.error({
                  title: '错误',
                  message: '上传过程出错啦'
                });
            })
      },
  },
  data () {
    
    return {
       data5:[
        {
          id:0,
          name:'设备分组',
          children:[],
        },
      ],
        currentPage:1,
        devicePageSize:10,
        total:1,
        deviceType:-1,
        devState:-1,
        tableData: [],
        tableHeight:window.innerHeight - 100,
        fenye:true,
        vrnoclick:true,
        updatenoclick:true,
        activeName:'first',
        nowTime:'',
        terminalDevice:'',//详情基本信息名字
        basicInfo:{ //详情基本信息
          uuid:'',
          deviceNum:'',
          orderNum:'',
          deviceType:'',
          state:'',
          position:'',
          startTime:'',
          updateTime:'',
          firmware:'',
          desc:'',
        },
        data2: [{
          id: 2,
          label: '所有设备',
          type: -1,
          state: -1,
          num: 0,
          children: [{
            id: 0,
            label: '网关设备',
            type: 0,
            state: -1,
            num: 0,
            children: [{
              id: 3,
              label: '在线',
              type: 0,
              state: 1,
              num: 0,
            }, {
              id: 4,
              label: '离线',
              type: 0,
              state: 2,
              num: 0,
            }]
          },{
            id: 1,
            label: '终端设备',
            type: 1,
            state: -1,
            num: 0,
            children: [{
              id: 5,
              label: '在线',
              type: 1,
              state: 1,
              num: 0,
            }, {
              id: 6,
              label: '离线',
              type: 1,
              state: 2,
              num: 0,
            },{
              id: 7,
              label: '故障',
              type: 1,
              state: 3,
              num: 0,
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        groupProps:{
           children: 'children',
           label: 'name'
        },
        dialogVisible:false,
        groupinput:'',
        test:'',
        testdata:'',
        selsctInput:'',
        loading:true,
        multipleSelection: [],
        adddialogVisible:false,
        detailDialogVisible:false,
        deletedialogVisible:false,
        deleteGroupId:-1,
        addNetwork:{
          mangeName:'',
          radio: '1',
          value:'',
          selectGroup: [],
          jingdu:'',
          weidu:'',
          textarea:'',
          firmware:'',
          hardware:'',
          checked:false,
          container:"",
        },
        rules:{
           mangeName: [
                 { required: true, message: '请输入设备名称', trigger: 'blur' }
             ],
            value: [
                { required: true, message: '请选择设备分组', trigger: 'change'}
            ], 
             jingdu: [
                { required: true, message: '请输入经度', trigger: 'blur' }
            ],
            weidu: [
                { required: true, message: '请输入维度', trigger: 'blur' }
            ],
             textarea: [
                { required: true, message: '请输入对应的描述', trigger: 'blur' }
            ],
            firmware: [
                { required: true, message: '请输入固件版本', trigger: 'blur' }
            ],
            hardware: [
                { required: true, message: '请输入硬件信息', trigger: 'blur' }
            ],
        }, 
        deluuid:'',
        delid:'',
        deleteDevicedialogVisible:false,
        updatedialogVisible:false,
        updateNetwork:{
          groupid:'',
          uuid:'',
          id:'',
          mangeName:'',
          radio: '',
          value:'',
          selectGroup: [],
          jingdu:'',
          weidu:'',
          textarea:'',
          firmware:'',
          hardware:'',
          checked:false,
          container:"",
        },
        filedialogVisible:false,
         fileform: {  // 表格导入
          'file': '',
          'filename': '',
          'limit': 1,
          'filelist': [],
          'errlist': []
        },
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.contnet{
  height: 100%;
  padding-top: 10px;
  background: #efefef;
}
.app-container{
  overflow: hidden;
  background: #ffffff;
  // margin-top:25px;
}
  .tree{
    width: 15%;
    float: left;
    padding-left: 20px;
  }
  .body{
    height: 100%;
    width: 84%;
    float: left;
    padding: 20px 0 0 20px;
    border-left: 1px solid #E4E7ED;
   .header{
     width: 100%;
    .span1{
      float: right;
    }
   }
   .content{
     height: 80%;
     width: 100%;
     margin-top: 30px
   }
  }
  .addStyle{
    padding: 10px 40px;
    span{
      font-size: 20px
    }
  }
  .addStyle1{
    padding: 10px 40px;
    span{
    font-size: 20px
  }
}
.detailFooter{
  margin: auto;
  text-align: center
}
.detailname{
  font-size: 20px;
  font-weight: 600;
  padding: 10px 20px;
}
.basicInfomation{
    padding: 10px 20px;
    margin: 5px 5px;
}
.descInfo{
   padding: 2px 20px;
    font-size: 16px;
    font-weight: 600;
}
.descContent{
    display: inline-block;
    margin-left: 40px;
}
.groupdelete{
   display: inline-block;
    margin: 0 20px !important;
}
 .num-tag {
        color: #fff;
        background: #99a9bf;
        padding: 3px 10px;
        font-size: 12px;
        line-height: 12px;
        border-radius: 20px;
        text-align: center;
    }
  .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 18px;
  }
</style>
