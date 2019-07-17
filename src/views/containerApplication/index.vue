<template>
    <div class="app-container">
        <div class="body">
             <div class="content">
             <div class="rongqi">容器应用</div>
                <el-tabs :tab-position="tabPosition"  v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="部署管理" name="one">
                            <div class="header">
                                  <span class="span1">
                                    <el-input v-model="selsctInput"  placeholder="请输入搜索内容" style="width:400px"></el-input>
                                    <el-button type="primary" icon="el-icon-search"   @click="deploySelect()">快速搜索</el-button>
                                 </span>
                            </div>
                            <el-table
                                :data="deployTableData"
                                stripe
                                border
                                :height="tableHeight"
                                style="width: 100%;margin-top:10px"
                                v-loading="deployloading"
                                element-loading-text="拼命加载中">
                                <el-table-column
                                prop="device.name"
                                label="容器名称"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="statesdata"
                                label="所属设备"
                                width="140">
                                </el-table-column>
                                <el-table-column
                                prop="device.hostGroup.version"
                                label="容器版本"
                                width="150">
                                </el-table-column>
                                <el-table-column
                                prop="devstate"
                                label="状态"
                                width="140">
                                </el-table-column>
                                <el-table-column
                                prop="appNum"
                                label="应用数量"
                                width="140">
                                </el-table-column>
                                <el-table-column
                                prop="lastUpTime"
                                label="启动时间">
                                </el-table-column>
                                <el-table-column
                                fixed="right"
                                label="操作"
                                width="280"
                                >
                                <template slot-scope="scope">
                                    <el-button-group>
                                    <el-button @click="deployDetail(scope.row)" type="info" icon="el-icon-info" size="small">查看</el-button>
                                    <el-button @click="deployReload(scope.row)" type="danger"    icon="el-icon-refresh" size="small">重启</el-button>
                                    <el-button @click="applicationDeployment(scope.row)" type="primary" icon="el-icon-setting" size="small">应用部署</el-button>
                                    <!-- <el-button @click="mangedelete(scope.row)" type="text"  size="small">|删除</el-button>
                                    <el-button @click="mangeupdate(scope.row)" type="text"  size="small">|编辑</el-button> -->
                                    </el-button-group>
                                </template>
                                </el-table-column>
                            </el-table>
                             <div>
                                <el-pagination
                                background
                                @size-change="bushuhandleSizeChange"
                                @current-change="bushuhandleCurrentChange"
                                :current-page="bushucurrentPage"
                                :page-sizes="[5, 10, 20, 50]"
                                :page-size="bushuPageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="bushutotal">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="应用管理" name="two">
                            <div class="header">
                                <span>
                                    <el-button type="primary" size='small' @click="addApply()">应用添加</el-button>
                                </span> 
                                  <span class="span1">
                                    <el-input v-model="applyselsctInput"  placeholder="请输入搜索内容" style="width:400px"></el-input>
                                    <el-button type="primary" icon="el-icon-search"    @click="applyselect()">快速搜索</el-button>
                                 </span>
                            </div>
                            <el-table
                                :data="applyTableData"
                                stripe
                                border
                                :height="tableHeight"
                                style="width: 100%;margin-top: 10px"
                                v-loading="applyloading"
                                element-loading-text="拼命加载中">
                                <el-table-column
                                prop="name"
                                label="应用名称"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop=""
                                label="类型"
                                width="130">
                                </el-table-column>
                                <el-table-column
                                label="镜像信息"
                                width="180">
                                <template slot-scope="scope">
                                    <span v-for="(item, index) in scope.row.appImage" :key="index">
                                         {{item.iotImage.name}}
                                        <i v-show="scope.row.appImage.length !== index+1">;</i>
                                    </span>             
                                </template>
                                </el-table-column>
                                <el-table-column
                                prop=""
                                label="状态"
                                width="130">
                                </el-table-column>
                                 <el-table-column
                                prop="createTime"
                                label="创建时间"
                                width="220">
                                </el-table-column>
                                <el-table-column
                                prop=""
                                label="更新时间">
                                </el-table-column>
                                 <el-table-column
                                fixed="right"
                                label="操作"
                                width="200"
                                >
                                <template slot-scope="scope">
                                    <el-button-group>
                                    <el-button @click="applyDetail(scope.row)" type="primary" icon="el-icon-info" size="small">查看</el-button>
                                    <el-button @click="applyDel(scope.row)" type="danger"  icon="el-icon-delete" size="small">删除</el-button>
                                    </el-button-group>
                                </template>
                                </el-table-column> 
                            </el-table>
                             <div>
                                <el-pagination
                                background
                                @size-change="applyhandleSizeChange"
                                @current-change="applyhandleCurrentChange"
                                :current-page="applycurrentPage"
                                :page-sizes="[5, 10, 20, 50]"
                                :page-size="applyPageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="applytotal">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="镜像信息" name="three">
                            <div class="header">
                                <span>
                                    <el-button type="primary" size='small' @click="mirroringUoload()">镜像上传</el-button>
                                </span> 
                                  <span class="span1">
                                    <el-input v-model="mirroringselsctInput"  placeholder="请输入搜索内容" style="width:400px;height:30px;border-radius:30px"></el-input>
                                    <el-button type="primary" icon="el-icon-search"  @click="mirroringselect()">快速搜索</el-button>
                                 </span>
                            </div>
                            <el-table
                                :data="mirroringTableData"
                                stripe
                                border
                                :height="tableHeight"
                                style="width: 100%;margin-top: 10px"
                                v-loading="mirroringloading"
                                element-loading-text="拼命加载中">
                                <el-table-column
                                prop="name"
                                label="镜像名称"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="statesdata"
                                label="类型"
                                width="150">
                                </el-table-column>
                                <el-table-column
                                prop="version"
                                label="版本"
                                width="140">
                                </el-table-column>
                                <el-table-column
                                prop=""
                                label="状态"
                                width="160">
                                </el-table-column>
                                <el-table-column
                                prop="createTime"
                                label="创建时间"
                                width="200">
                                </el-table-column>
                                <el-table-column
                                prop="iotUser.name"
                                label="创建人">
                                </el-table-column>
                                 <el-table-column
                                fixed="right"
                                label="操作"
                                width="200"
                                >
                                <template slot-scope="scope">
                                    <el-button-group>
                                    <el-button @click="mirroringDetail(scope.row)" type="primary"  icon="el-icon-info"  size="small">查看</el-button>
                                    <el-button @click="mirroringDel(scope.row)" type="danger" icon="el-icon-delete"  size="small">删除</el-button>                             
                                    </el-button-group>
                                </template>
                                </el-table-column>
                            </el-table>
                             <div>
                                <el-pagination
                                background
                                @size-change="mirhandleSizeChange"
                                @current-change="mirhandleCurrentChange"
                                :current-page="mircurrentPage"
                                :page-sizes="[5, 10, 20, 50]"
                                :page-size="mirPageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="mirtotal">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                </el-tabs>
             </div>
        </div> 
        <!-- 部署应用 -->
        <el-dialog title="应用部署" :visible.sync="deployDlgVisible" width="80%" :before-close="handleClose">
            <el-form :inline="true" :model="deployForm" ref="deployForm" :rules="rules" label-width="120px">
                <div class="addStyle">
                <el-row>
                    <el-col :span="12">
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="设备名称" prop='deviceName'>
                            <el-input v-model="deployForm.deviceName" style="width:300px"></el-input>
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="容器版本" prop='appVersion'>
                            <el-input v-model="deployForm.appVersion" style="width:300px"></el-input>
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="启动时间" prop='lastUpTime'>
                            <el-input v-model="deployForm.lastUpTime" style="width:300px"></el-input>
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="关闭时间" prop='id'>
                            <el-input v-model="deployForm.lastStopTime" style="width:300px"></el-input>
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="状态" prop='id'>
                            <el-input v-model="deployForm.id" style="width:300px"></el-input>
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="应用" prop='id'>
                                <el-select v-model="selectApp" placeholder="请选择">
                                <el-option
                                    v-for="(item,index) in appList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                                </el-select>
                            <el-button type="success" round icon="el-icon-circle-plus-outline" @click="addApp()">添加应用</el-button>
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    
                    </el-col>
                    <el-col :span="12">
                    <el-row justify="space-around">
                        <el-col :span="8" v-for="(item,index) in appSelectList" :key="index">
                        <el-card :body-style="{ padding: '0px',height:'235px' }">
                            <div class="appimage" >
                                <img src="/static/images/app.png" class="appimage_image">
                            </div>
                            <div style="padding: 8px;">
                            <span>{{item.name}}</span>
                            <span>[{{item.version}}]</span>
                            <div class="bottom clearfix">
                                <time class="time clearfix">{{item.createTime}}</time>
                                <el-tooltip class="item" effect="dark" content="是否启动？" placement="left">
                                    <el-button @click="deployItem(scope.row)" circle icon="el-icon-caret-right"></el-button> 
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
                                    <el-button @click="deployItem(scope.row)" circle icon="el-icon-remove-outline"></el-button>
                                </el-tooltip>
                               <el-tooltip class="item" effect="dark" content="是否删除" placement="right">
                                 <el-button @click="removeApp(item)" circle icon="el-icon-delete"></el-button>
                                </el-tooltip>       
                            </div>
                            </div>
                        </el-card>
                        </el-col>
                    </el-row>
                    </el-col>
                </el-row>
            </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deployDlgVisible = false">关闭</el-button>
            </span>
            </el-dialog>
        <!-- 应用 -->
        <el-dialog
            title="应用添加"
            :visible.sync="applyDialogVisible"
            width="50%"
            :before-close="handleClose">
                <el-form :label-position="labelPosition" label-width="80px" :model="applyform" :rules="rules" ref="applyform">
                    <el-form-item label="应用名称"  prop="name">
                        <el-input v-model="applyform.name" placeholder="请输入应用名称" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="版本"  prop="versions">
                        <el-input v-model="applyform.versions" placeholder="请输入版本" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="textarea">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入描述内容" style="width:400px"
                            v-model="applyform.textarea">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="选择镜像">
                         <el-select v-model="selectvalue" multiple placeholder="请选择" filterable  @change="nowmirr" style="width:400px">
                            <el-option
                            v-for="item in cities"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                        <!-- <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="(city,index) in cities" :key="index" :label="city">{{city.name}}</el-checkbox>
                        </el-checkbox-group> -->
                    </el-form-item>
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="applyDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="applySure('applyform')">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 镜像 -->
        <el-dialog
            title="镜像上传"
            :visible.sync="mirroringDialogVisible"
            width="50%"
            :before-close="handleClose">
                <el-form :label-position="labelPosition" label-width="80px" :model="mirroringform" :rules="rules" ref="mirroringform">
                    <el-form-item label="镜像名称"  prop="name">
                        <el-input v-model="mirroringform.name" placeholder="请输入镜像名称" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="版本"  prop="versions">
                        <el-input v-model="mirroringform.versions" placeholder="请输入版本" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-radio v-model="mirroringform.radio" label="0">网关设备</el-radio>
                        <el-radio v-model="mirroringform.radio" label="1">终端设备</el-radio>
                    </el-form-item>
                    <el-form-item label="描述" prop="textarea">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入描述内容" style="width:400px"
                            v-model="mirroringform.textarea">
                        </el-input>
                    </el-form-item>
                     <el-form-item label="文件" prop="file" >
                        <el-input v-model="mirroringform.file" style="width:400px" disabled ></el-input>
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-change="handleChange"
                            :auto-upload="false"
                            :show-file-list='false'
                            style="display: inline-block"
                            >
                            <el-button slot="trigger" size="small" type="primary" >选择</el-button>
                        </el-upload>
                    </el-form-item>    
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="mirroringDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="mirroringSure('mirroringform')">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="删除镜像"
            :visible.sync="deleteDevicedialogVisible"
            width="50%"
            :before-close="handleClose">
                <i class="el-icon-warning"></i> 删除镜像后不可恢复，确定删除吗？
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDevicedialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureDeleteDevice">确 定</el-button>
            </span>
        </el-dialog>
         <el-dialog
            title="删除应用"
            :visible.sync="deleteApplydialogVisible"
            width="50%"
            :before-close="handleClose">
                <i class="el-icon-warning"></i> 删除应用后不可恢复，确定删除吗？
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteApplydialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureDeleteApply()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { selectDeploy,selectMirring,applyAdd,applySelectapply,delDevice,delApplyDevice,addNewApply} from '@/api/containerApplication'
export default {
  data() {
      return {
        checkAll: false,
        checkedCities: [],
        cities: [],
        tabPosition: 'left',
        selsctInput:'',
        applyselsctInput:'',
        mirroringselsctInput:'',
        tableHeight:window.innerHeight -10,
        activeName:'one',
        mircurrentPage:1,
        mirPageSize:10,
        applycurrentPage:1,
        applyPageSize:10,
        bushucurrentPage:1,
        bushuPageSize:10,
        deployDlgVisible:false,
        deployForm:{
            id:"",
            deviceName:"",
            hostVersion:"",
            lastUpTime:"",
            lastStopTime:"",
            app:"",
        },
        selectApp:"",
        appSelectList:[],
        appList:[],
        mirtotal:1,
        applytotal:1,
        bushutotal:1,
        applyAdd:false,//应用添加按钮
        ImageUpload:false,//镜像上传按钮
        deployTableData: [],
        applyTableData:[],
        mirroringTableData:[],
        mirroringDialogVisible:false,
        labelPosition: 'right',
        mirroringform: {
          name: '',
          versions: '',
          radio:'0',
          textarea:'',
          file:'',
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          versions: [
            { required: true, message: '请输入对应的版本', trigger: 'blur' }
          ],
          textarea: [
            { required: true, message: '请输入描述信息', trigger: 'blur' }
          ],
          file: [
            {required: true, message: '请选择对应文件', trigger: 'blur' }
          ],
        },
        mirroringloading:true,//镜像信息加载
        applyloading:true,//应用管理加载
        deployloading:true,//部署应用
        mirroringfile:'',
        nowTime:'',
        applyDialogVisible:false,
        selectvalue:[],
        applyform:{
          name: '',
          versions: '',
          textarea:'',
        },
        idArr:[],
        deleteDevicedialogVisible:false,
        delid:'',
        deleteApplydialogVisible:false,
        applyDelid:'',
      };
    },
    mounted(){
        let that = this;
        that.getdatetime();//获取时间
        that.getAllContail();
        that.getApplyData();
        that.getMirroringData();
        that.getbushuData();
        let activetab = localStorage.getItem('activetab');
        if(!activetab){
             this.activeName = 'one'
        }else{
             this.activeName = activetab;
        }
    },
    methods: {
        //点击左侧导航事件
        handleClick(tab, event) {
            let that = this;
            console.log(tab.paneName);
            console.log(event);
            localStorage.setItem('activetab', tab.paneName);
            if(tab.paneName == 'two'){
                //点击进入到应用管理触发事件
                console.log('应用管理')
                that.getAllContail();
                that.getApplyData();
            }else if(tab.paneName == 'three'){
                console.log('镜像信息')
                 that.getMirroringData();//获取镜像信息数据
            }else if(tab.paneName == 'one'){
                console.log('部署管理')
                that.getbushuData();
            }
        },
        handleClose(done) {
            done();
        },
        //镜像分页
        mirhandleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            let that = this;
            that.mirPageSize = val;
        },
        mirhandleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            let that = this;
            that.mircurrentPage = val;
            that.mirroringloading = true;
            that.getMirroringData();
        },
        //应用分页
        applyhandleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            let that = this;
            that.applyPageSize = val;
        },
        applyhandleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            let that = this;
            that.applycurrentPage = val;
            that.applyloading = true;
            that.getApplyData();
        },
        //部署分页
        bushuhandleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            let that = this;
            that.bushuPageSize = val;
        },
        bushuhandleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            let that = this;
            that.bushucurrentPage = val;
            that.deployloading = true;
            that.getbushuData();
        },
        //获取所有部署数据 以及查询数据
        async getbushuData(){
            let that = this;
            let currentNum = that.bushucurrentPage;
            let everyNum = that.bushuPageSize;   
            let selcontent =  that.selsctInput;
            let deploySelectData = {
                'pageSize':currentNum,
                'pageNum':everyNum,
                'name':selcontent == undefined ? "":selcontent,
            }
            let deploydata = await selectDeploy(deploySelectData) 
            console.log(deploydata)
            that.deployloading = false;
            if(deploydata.status == '200'){
            let arr = deploydata.rows;
            let newArr = [];
            arr.forEach(element =>{
                let i = element.device.type;
                let j = element.device.statusId;
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
            this.deployTableData = newArr;
            this.bushutotal = deploydata.total;
            }
        },
        //部署容器快速搜索
        async deploySelect(){
           let that = this;
           that.getbushuData();
        },
        //部署详情
        deployDetail(scope){
            console.log(scope);
        },
        //部署管理重启
        deployReload(scope){
            console.log(scope);
        },
        //部署管理 应用部署
        applicationDeployment(scope){
            console.log(scope);
            let that = this;
            that.deployDlgVisible = true;
        },
        async addApp(){
            let that = this;
            that.selectApp == ""
            if(that.selectApp == ""){
                this.$message.error('请先选择一个应用')
                return false
            }
            let findFlag = false
            that.appSelectList.forEach((v)=>{
                if(v.id == that.selectApp) {
                    findFlag = true
                    this.$message.warning('该应用已添加')
                }
            })
            if(!findFlag){
                let addNewApplyData = ""
                let addAppData = ""
                that.appList.forEach((v)=>{
                    if(v.id == that.selectApp) {
                    addAppData = v;
                    that.appSelectList.push(v)
                    addNewApplyData = {
                        'hostId':that.deployForm.id,
                        'appId':that.selectApp,
                    }
                    }
                })
                if(addNewApplyData != ""){
                let addRs = await addNewApply(addNewApplyData);
                console.log(addRs)
                if(addRs.status == 200){
                    addAppData["containerId"] = addRs.data.data
                    that.$notify.success({
                    title: '成功',
                    message: '新增成功',
                    });
                }
                else{
                    that.$notify.error({
                        title: '失败',
                        message: '新增失败',
                    });
                }
                }
            }
        },
        //获取所有容器和id
        getAllContail(){
             this.$axios({
                    method:'post',
                    url:'wlsbgl/app/getImage',
                })
                .then((res) => {
                    console.log(res.data);
                    this.cities = res.data;
                })
                .catch((err) => {
                    console.log(err)
                });
        },
        //获取所有应用
        async getApplyData(){
            let that = this;
            let currentNum = that.applycurrentPage;
            let everyNum = that.applyPageSize;   
            let applySelectData = {
                'pageSize':currentNum,
                'pageNum':everyNum,
            }
            let applydata = await applySelectapply(applySelectData) 
            console.log(applydata)
            that.applyloading = false;
            if(applydata.status == '200'){     
                // let arr = applydata.rows;
                // let newArr = [];
                // arr.forEach(element =>{
                // let i = element.typeId;
                // if (i == 0) {
                //     element.statesdata = "网关设备"
                //     }else if(i==1){
                //     element.statesdata = "终端设备"
                //     }
                //     newArr.push(element)
                // })
                that.applyTableData = applydata.rows;
                that.appList = applydata.rows;
                console.log(that.appList)
                that.applytotal = applydata.total;
            }
        },
        //应用快速搜索
        async applyselect(){
            let that = this;
            console.log(11)
            that.applyloading = true;
            let currentNum = that.applycurrentPage;
            let everyNum = that.applyPageSize;
            let applyname = that.applyselsctInput;
            let applySelectData = {
                'pageSize':currentNum,
                'pageNum':everyNum,
                'name':applyname
            }
            let applydata = await applySelectapply(applySelectData)
             if(applydata.status == '200'){  
                   that.applyloading = false;
                   that.applyTableData = applydata.rows
                   that.applytotal = applydata.total;
            }

        },
        //应用添加
        addApply(){
            let that = this;
            that.applyDialogVisible = true;
            that.applyform.name  = '';
            that.applyform.versions = '';
            that.applyform.textarea = '';
            that.checkedCities = [];
            that.selectvalue = [];
        },
        //应用添加选择镜像
        nowmirr(value){
            console.log(value)
            let that = this;
            console.log(value.join(','))
            that.idArr = value.join(',');
        },
        // handleCheckedCitiesChange(value) {
        //     let that = this;
        //     console.log(value)
        //     let idList = [];
        //     for(let i =0;i<value.length;i++){
        //         idList.push(value[i].id)
        //     }
        //     that.idArr = idList.join(',');
        //     console.log( that.idArr)
        //    },
        //应用添加确定
        applySure(applyform){
            this.$refs[applyform].validate((valid) => {
                if (valid) {
                   console.log('成功');
                   let that = this;
                   that.applyDialogVisible = false;
                   that.applyadd();
                  
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        async applyadd(){
            let that = this;
            let applyname = that.applyform.name;
            let applyversions = that.applyform.versions;
            let applydesc = that.applyform.textarea;
            let user =  JSON.parse(localStorage.getItem('user'));
            let userid = user.id;  
            let username = user.name;
            let time = that.nowTime;
            let idlist = that.idArr;
            let applyAddData = {
                'name':applyname, 
                'description':applydesc,
                'version':applyversions,
                'createUserId':userid,
                'createTime':time,
                'createUser':username,
                'imageId':idlist,
            }
            let applyAddsj = await applyAdd(applyAddData)
            console.log(applyAddsj)
            if(applyAddsj.status == '200'){
                 that.$notify({
                    title: '成功',
                    message: '新增成功',
                    type: 'success'
                });
                 that.getApplyData()
            }else{
                that.$notify.error({
                    title: '失败',
                    message: '新增失败',
                });
                 that.getApplyData()
            }
        },
        //应用查看详情
        applyDetail(scope){
            console.log(scope);
            let that = this;
        },
        //应用删除
         applyDel (data) {
            let that = this
            this.$confirm('此操作将删除一条应用, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            that.sureDeleteApply(data)
            }).catch(() => {
            console.log('取消了删除')
        })
        },
        async sureDeleteApply(scope){
            let that = this;
            let delId = that.applyDelid;
            let delData = {
             'id':scope.id,
            }
            let delsj = await delApplyDevice(delData);
            console.log(delsj)
            that.deleteApplydialogVisible = false;
            if(delsj.status == '200'){
            that.loading = false;
            that.$notify({
                title: '成功',
                message: delsj.msg,
                type: 'success'
            });
            that.getApplyData();
            }else{
            that.loading = false;
            that.$notify.error({
                    title: '失败',
                    message: delsj.msg,
                });
            that.getApplyData();
            }
        },
        //获取所有镜像信息数据
        async getMirroringData(){
            let that = this;
            let currentNum = that.mircurrentPage;
            let everyNum = that.mirPageSize;
            let selectData = {
                'pageSize':currentNum,
                'pageNum':everyNum,
                'name':'',
            }
            let mirdata = await selectMirring(selectData) 
            console.log(mirdata)
            that.mirroringloading = false;
            if(mirdata.status == '200'){     
                let arr = mirdata.rows;
                let newArr = [];
                arr.forEach(element =>{
                let i = element.typeId;
                if (i == 0) {
                    element.statesdata = "网关设备"
                    }else if(i==1){
                    element.statesdata = "终端设备"
                    }
                    newArr.push(element)
                })
                that.mirroringTableData = newArr;
                that.mirtotal = mirdata.total;
            }
        },
        //镜像快速搜索
        async mirroringselect(){
            let that = this;
            let currentNum = that.mircurrentPage;
            let everyNum = that.mirPageSize;
            let imgselname = that.mirroringselsctInput;
            let selectData = {
                'pageSize':currentNum,
                'pageNum':everyNum,
                'name':imgselname,
            }
            let mirdata = await selectMirring(selectData) 
            console.log(mirdata)
            if(mirdata.status == '200'){     
                let arr = mirdata.rows;
                let newArr = [];
                arr.forEach(element =>{
                let i = element.typeId;
                if (i == 0) {
                    element.statesdata = "网关设备"
                    }else if(i==1){
                    element.statesdata = "终端设备"
                    }
                    newArr.push(element)
                })
                that.mirroringTableData = newArr;
                that.mirtotal = mirdata.total;
            }
        },
        //镜像上传按钮
        mirroringUoload(){
            let that = this;
            that.mirroringDialogVisible = true;
            that.mirroringform.name = '';
            that.mirroringform.textarea = '';
            that.mirroringform.radio ='';
            that.mirroringform.versions ='';
            that.mirroringfile = '';
        },
        //镜像上传选择文件
        handleChange(file) {
            console.log(file)
            let that = this;
            that.mirroringform.file = file.name;
            that.mirroringfile = file.raw;
        },
        //镜像上传确定
        mirroringSure(mirroringform){
            this.$refs[mirroringform].validate((valid) => {
                if (valid) {
                   console.log('成功');
                   let that = this;
                   that.mirroringDialogVisible = false;
                   that.addMirroring();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        async addMirroring(){
            let that = this;
            let imageName = that.mirroringform.name;
            let imagedesc = that.mirroringform.textarea;
            let imageType = that.mirroringform.radio;
            let imageVersion = that.mirroringform.versions;
            let imageFile = that.mirroringfile;
            let user =  JSON.parse(localStorage.getItem('user'));
            let userid = user.id;
            let username = user.name;
            let time = that.nowTime;
            console.log(time,imageFile)
            let formData = new FormData();
            formData.append( 'name', imageName);
            formData.append( 'description', imagedesc);
            formData.append( 'typeId', imageType);
            formData.append( 'version', imageVersion);
            formData.append( 'createTime', time);
            formData.append( 'createUserId', userid);
            formData.append( 'createUser', username);
            formData.append('file', that.mirroringfile);
            let url = 'wlsbgl/image/addImage';
            let config = {
              headers:{'Content-Type':'multipart/form-data'}
            };
            this.$axios.post(url,formData, config).then(function (res) {
                console.log(res.data);
                if(res.data.status == '200'){
                    that.mirroringDialogVisible = false;
                    that.mirroringloading = false;
                        that.$notify({
                            title: '成功',
                            message: '新增成功',
                            type: 'success'
                        });
                    that.getMirroringData();
                    }else{
                    that.mirroringloading = false;
                    that.$notify.error({
                            title: '失败',
                            message: '新增失败',
                        });
                    that.getMirroringData();
               }         
            }).catch((err) => {
                console.log(err)
                that.$notify.error({
                  title: '错误',
                  message: '文件上传过程或新增失败'
                });
            })
        },
        //查看
        mirroringDetail:function(scope){
            console.log(scope)
        },
        //删除
        mirroringDel (data) {
            let that = this
            this.$confirm('此操作将删除一条镜像信息, 是否继续?', '提示', {
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
            let delId = that.delid;
            let delData = {
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
            that.getMirroringData();
            }else{
            that.loading = false;
            that.$notify.error({
                    title: '失败',
                    message: delsj.msg,
                });
            that.getMirroringData();
            }
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
    }
}
</script>  

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container{
  overflow: hidden;
  background: #efefef;  
}
.body{
    padding: 20px;
    background: white;
}
.rongqi{
    margin: 10px
}
.header{
     width: 100%;
     .span{
         float: left;
     }
     .span1{
         float: right;
     }
}
.appimage{
    width: 80%;
    margin: auto;
    height: 131px;
    // padding-left: 25px;
    .appimage_image{
        width: 100%;
         height: 131px;
    }
}
</style>
