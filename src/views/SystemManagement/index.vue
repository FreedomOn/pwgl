<template>
    <div class="app-container">
        <div class="body">
             <div class="content">
             <div class="rongqi">系统管理</div>
                <el-tabs :tab-position="tabPosition"   v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="用户列表" name="one">
                            <div class="header">
                                <span>
                                    <el-button type="primary" size='small' @click="addUser()">添加用户</el-button>
                                </span> 
                                  <span class="span1">
                                    <el-input v-model="userSelsctInput"  placeholder="请输入姓名快速搜索" style="width:400px"></el-input>
                                    <el-button type="primary" icon="el-icon-search"    @click="userSelect()">快速搜索</el-button>
                                 </span>
                            </div>
                            <el-table
                                :data="userTableData"
                                stripe
                                border
                                :height="tableHeight"
                                style="width: 100%;margin-top:10px"
                                v-loading="userloading"
                                element-loading-text="拼命加载中">
                                <el-table-column
                                prop="loginName"
                                label="用户名"
                                width="250">
                                </el-table-column>
                                <el-table-column
                                prop="roleUser.iotRole.name"
                                label="角色"
                                width="120">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="姓名"
                                width="150">
                                </el-table-column>
                                <el-table-column
                                prop="isStatus"
                                label="状态"
                                width="100">
                                </el-table-column>
                                <el-table-column
                                prop="createTime"
                                label="创建时间"
                                width="280">
                                </el-table-column>
                                <el-table-column
                                prop="lastLoginTime"
                                label="登录时间"
                                show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                fixed="right"
                                label="操作"
                                width="200"
                                >
                                <template slot-scope="scope">
                                    <el-button-group>
                                    <el-button @click="userDetail(scope.row)" type="text"  size="small">查看</el-button>
                                    <el-button @click="usedelete(scope.row)" type="text"  size="small">|删除</el-button>
                                    </el-button-group>
                                </template>
                                </el-table-column>
                            </el-table>
                             <div  class="pagination">
                                <el-pagination
                                background
                                @size-change="userhandleSizeChange"
                                @current-change="userhandleCurrentChange"
                                :current-page="usercurrentPage"
                                :page-sizes="[5, 10, 20, 50]"
                                :page-size="userPageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="usertotal">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="角色权限" name="two">
                            <div class="header">
                                <span>
                                    <el-button type="primary" size='small' @click="addrole()">添加角色</el-button>
                                </span> 
                                  <span class="span1">
                                    <el-input v-model="roleSelsctInput"  placeholder="请输入角色快速搜索" style="width:400px"></el-input>
                                    <el-button type="primary" icon="el-icon-search"    @click="roleSelect()">快速搜索</el-button>
                                 </span>
                            </div>
                            <el-table
                                :data="roleTableData"
                                stripe
                                border
                                :height="tableHeight"
                                style="width: 100%;margin-top: 10px"
                                v-loading="roleloading"
                                element-loading-text="拼命加载中">
                                <el-table-column
                                prop="name"
                                label="角色名"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                label="下属用户"
                                width="260">
                                <template slot-scope="scope">
                                    <span v-for="(item, index) in scope.row.roleUser" :key="index">
                                         {{item.iotUser.name}}
                                        <i v-show="scope.row.roleUser.length !== index+1">;</i>
                                    </span>             
                                </template>
                                </el-table-column>
                                <el-table-column
                                prop="isStatus"
                                label="状态"
                                width="150">
                                </el-table-column>
                                 <el-table-column
                                prop="createTime"
                                label="创建时间"
                                width="250">
                                </el-table-column>
                                <el-table-column
                                prop="updateTime"
                                label="更新时间"
                                show-overflow-tooltip>
                                </el-table-column>
                                 <el-table-column
                                fixed="right"
                                label="操作"
                                width="200"
                                >
                                <template slot-scope="scope">
                                    <el-button-group>
                                    <el-button @click="roleDetail(scope.row)" type="text"  size="small">查看</el-button>
                                    <el-button @click="roleDel(scope.row)" type="text"  size="small">|删除</el-button>
                                    </el-button-group>
                                </template>
                                </el-table-column>  
                            </el-table>
                             <div  class="pagination">
                                <el-pagination
                                background
                                @size-change="rolehandleSizeChange"
                                @current-change="rolehandleCurrentChange"
                                :current-page="rolecurrentPage"
                                :page-sizes="[5, 10, 20, 50]"
                                :page-size="rolePageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="roletotal">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="事件列表" name="three">
                            <div class="header">
                                <span>
                                     <el-date-picker
                                        v-model="eventDate"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                    <el-date-picker
                                        v-model="twoeventDate"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </span> 
                                  <span class="span1">
                                    <el-input v-model="eventselsctInput"  placeholder="请输入搜索内容" style="width:400px;height:30px;border-radius:30px"></el-input>
                                    <el-button type="primary" icon="el-icon-search"  @click="eventselect()">快速搜索</el-button>
                                 </span>
                            </div>
                            <el-table
                                :data="eventTableData"
                                stripe
                                border
                                :height="tableHeight"
                                style="width: 100%;margin-top: 10px"
                                v-loading="eventloading" 
                                element-loading-text="拼命加载中">
                                <el-table-column
                                prop="name"
                                label="事件编号"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="statesdata"
                                label="概要信息"
                                width="280">
                                </el-table-column>
                                <el-table-column
                                prop="version"
                                label="类型"
                                width="150">
                                </el-table-column>
                                <el-table-column
                                prop=""
                                label="设备编号"
                                width="160">
                                </el-table-column>
                                <el-table-column
                                prop="createTime"
                                label="操作人"
                                width="150">
                                </el-table-column>
                                <el-table-column
                                prop=""
                                label="操作事件"
                                show-overflow-tooltip>
                                </el-table-column>
                                 <el-table-column
                                fixed="right"
                                label="操作"
                                width="120"
                                >
                                <template slot-scope="scope">
                                    <el-button-group>
                                    <el-button @click="eventDetail(scope.row)" type="text"  size="small">查看</el-button>
                                    </el-button-group>
                                </template>
                                </el-table-column>
                            </el-table>
                             <div  class="pagination">
                                <el-pagination
                                background
                                @size-change="eventhandleSizeChange"
                                @current-change="eventhandleCurrentChange"
                                :current-page="eventcurrentPage"
                                :page-sizes="[5, 10, 20, 50]"
                                :page-size="eventPageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="eventtotal">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="系统日志" name="four">
                            <div class="header">
                                <span>
                                    <el-date-picker
                                        v-model="systemLogDate"
                                        type="daterange"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                    </el-date-picker>
                                </span> 
                                  <span class="span1">
                                    <el-input v-model="systemLogselsctInput"  placeholder="请输入搜索内容" style="width:400px;height:30px;border-radius:30px"></el-input>
                                    <el-button type="primary" icon="el-icon-search"  @click="systemLogselect()">快速搜索</el-button>
                                 </span>
                            </div>
                            <el-table
                                :data="systemLogTableData" 
                                stripe
                                border
                                :height="tableHeight"
                                style="width: 100%;margin-top: 10px"
                                v-loading="systemLogloading"
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
                                prop=""
                                label="创建人">
                                </el-table-column>
                                 <el-table-column
                                fixed="right"
                                label="操作"
                                width="200"
                                >
                                <template slot-scope="scope">
                                    <el-button @click="systemLogDetail(scope.row)" type="text"  size="small">查看</el-button>       
                                </template>
                                </el-table-column>
                            </el-table>
                             <div  class="pagination">
                                <el-pagination
                                background
                                @size-change="systemLoghandleSizeChange"
                                @current-change="systemLoghandleCurrentChange"
                                :current-page="systemLogcurrentPage"
                                :page-sizes="[5, 10, 20, 50]"
                                :page-size="systemLogPageSize" 
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="systemLogtotal">
                                </el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="系统设置" name="five">
                           <el-tabs v-model="sytemactiveName" style="height: 500px;" type="border-card" @tab-click="sytemhandleClick">
                                <el-tab-pane label="许可管路" name="a">
                                    <div class="sytembody">
                                        <div class="sytembodyleft">许可信息：</div>
                                        <div class="sytembodright">
                                            <el-input
                                                type="textarea"
                                                :rows="3"
                                                placeholder="请输入内容"
                                                v-model="textarea"
                                                style="width:500px">
                                            </el-input>
                                        </div>
                                    </div>
                                    <div class="sytembuttom">
                                        <el-button @click="updateLicense">更新许可</el-button>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="数据备份" name="b">数据备份</el-tab-pane>
                                <el-tab-pane label="证书管理" name="c">证书管理</el-tab-pane>
                            </el-tabs>
                        </el-tab-pane>
                </el-tabs>
             </div>
        </div> 
        <el-dialog
            title="添加用户"
            :visible.sync="adduserdialogVisible"
            width="60%"
            :before-close="handleClose">
                <div class="adduserbody">
                    <div class="adduserbodyleft">
                        <el-form :label-position="labelPosition" label-width="80px" :model="adduserform" :rules="rules" ref="adduserform">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="adduserform.username" style="width:400px"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="adduserform.name" style="width:400px"></el-input>
                            </el-form-item>
                            <el-form-item label="角色" prop="role">
                                <el-select v-model="adduserform.role" placeholder="请选择角色权限" style="width:400px">
                                   <el-option
                                    v-for="(item,index) in roleOption"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                  </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="adduserform.password" type="password" style="width:400px"></el-input>
                            </el-form-item>
                            <el-form-item label="邮件" prop="email">
                                <el-input v-model="adduserform.email" style="width:400px"></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="phone">
                                <el-input v-model="adduserform.phone" style="width:400px"></el-input>
                            </el-form-item>
                        </el-form>
                    </div> 
                    <div class="adduserbodyright">
                        <el-form>
                            <el-form-item label="头像上传:" prop="image">
                                <el-upload
                                    class="avatar-uploader"
                                    action="https://ode.com/posts/"
                                    :show-file-list="false"
                                    :auto-upload="false"
                                    :on-change ="updatainputUpload"
                                    >
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="adduserdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureAddUser('adduserform')">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="添加角色"
            :visible.sync="addroledialogVisible"
            width="60%"
            :before-close="handleClose">
                <div style="width: 600px;margin: auto;">
                    <div>
                        <span style="font-weight:400;font-size:20px">角色名</span>
                        <el-input v-model="roleinput" placeholder="请输入角色名" style="width:400px"></el-input>
                    </div>
                    <div style="margin-top: 20px;">
                        <el-transfer v-model="rolevalue" 
                        :titles="['未分配权限', '已有权限']"
                        :button-texts="['- - ', ' - -']"
                        @change="rolehandleChange"
                        :format="{
                            noChecked: '${total}',
                            hasChecked: '${checked}/${total}'
                        }"
                        :data="roledata">
                        </el-transfer>
                    </div>
                </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addroledialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureaddRole">确 定</el-button>
            </span>
        </el-dialog>
         <el-dialog
            title="删除角色"
            :visible.sync="deleteUserdialogVisible"
            width="50%"
            :before-close="handleClose">
                <i class="el-icon-warning"></i> 删除角色后不可恢复，确定删除吗？
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteUserdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureDeleteUser()">确 定</el-button>
            </span>
        </el-dialog>
         <el-dialog
            title="用户信息详情"
            :visible.sync="seeUserdialogVisible"
            width="60%"
            :before-close="handleClose">
                 <el-form :inline="true" :model="userInfo">
                    <el-row>
                        <el-col :span="12">
                        <el-form-item label="姓名:">
                                {{userInfo.name}}
                        </el-form-item> 
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="状态:">
                                {{userInfo.isStatus}}
                        </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                        <el-form-item label="创建时间:">
                                {{userInfo.createTime}}
                        </el-form-item> 
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="创建用户:">
                                {{userInfo.createUser}}
                        </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                        <el-form-item label="更新时间:">
                                {{userInfo.updateTime}}
                        </el-form-item> 
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="更新用户:">
                                {{userInfo.updateUser}}
                        </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                        <el-form-item label="电子邮件:">
                                {{userInfo.email}}
                        </el-form-item> 
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="手机:">
                                {{userInfo.mobile}}
                        </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                        <el-form-item label="电话:">
                                {{userInfo.phone}}
                        </el-form-item> 
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="上次登录时间:">
                                {{userInfo.lastLoginTime}}
                        </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                        <el-form-item label="上次登录IP:">
                                {{userInfo.lastLoginIp}}
                        </el-form-item> 
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="登录次数:">
                                {{userInfo.loginNum}}
                        </el-form-item> 
                        </el-col>
                    </el-row>
                 </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="seeUserdialogVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import  {selectUser,addUser,delUser,selectRole}  from '@/api/systemManagement'
export default {
  data() {
      return {
        checkAll: false,
        checkedCities: [],
        cities: [],
        tabPosition: 'left',
        labelPosition: 'right',
        activeName:'one',
        tableHeight:window.innerHeight -100,
        //用户列表
        userSelsctInput:'',//用户快速搜索,
        userTableData:[],
        userloading:true,
        usertotal:1,
        userDelid:'',
        usercurrentPage:1,
        userPageSize:10,
        adduserdialogVisible:false,
        deleteUserdialogVisible:false,
        seeUserdialogVisible:false,
        labelPosition: 'right',
        imageUrl:'',
        updataimagefile:'',
        updataimagefileName:'',
        roleOption:[],
        userInfo:{
            name:'',
            isStatus:'',
            createTime:'',
            createUser:'',
            updateTime:'',
            updateUser:'',
            email:'',
            mobile:'',
            phone:'',
            lastLoginTime:'',
            lastLoginIp:'',
            loginNum:'',
        },
        adduserform:{
            username:'',
            name:'',
            role:'',
            password:'',
            email:'',
            phone:'',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          role: [
            { required: true, message: '请选择角色权限', trigger: 'change' }
          ],
          password: [
            {  required: true, message: '请输入密码', trigger: 'blur' }
          ],
          email: [
            {  required: true, message: '请输入邮件', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          phone: [
            {  required: true, message: '请输入手机号', trigger: 'blur' }
          ],
        },
        //角色权限
        rolecurrentPage:1,
        rolePageSize:10, 
        roletotal:1,
        roleSelsctInput:'',
        roleTableData:[],
        roleloading:true,
        addroledialogVisible:false,
        roledata: [],
        rolevalue: [],
        roleinput:'',
        //事件列表
        eventDate:'',
        twoeventDate:'',
        eventTableData:[],
        eventloading:true,
        eventselsctInput:'',
        eventcurrentPage:1,
        eventPageSize:10,
        eventtotal:1,
        //系统日志
        systemLogDate:'',
        systemLogselsctInput:'',
        systemLogTableData:[],
        systemLogloading:true,
        systemLogPageSize:10,
        systemLogcurrentPage:1,
        systemLogtotal:1,
        //系统设置
        sytemactiveName:'a',
        textarea:'',
      };
    },
    mounted(){
        let that = this;
        that.getdatetime();//获取时间
        that.getuserList();//获取用户列表
    },
    methods: {
        //点击左侧导航事件
        handleClick(tab, event) {
            let that = this;
            console.log(tab.paneName);
            console.log(event)
            if(tab.paneName == 'one'){
                console.log('用户列表')
                that.getuserList();
            }else if(tab.paneName == 'two'){
                console.log('角色权限')
                that.getallRole();
            }else if(tab.paneName == 'three'){ 
                console.log('事件列表')
                that.getAllEcent();
            }else if(tab.paneName == 'four'){ 
                console.log('系统日志')
                that.getAllSystemLog();
            }else if(tab.paneName == 'five'){ 
                console.log('系统设置')
            }
        },
        //关闭弹窗事件
        handleClose(done) {
            done();
        },
        //用户列表分页
        userhandleSizeChange(val) {
            let that = this;
            that.userPageSize = val;
        },
        userhandleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            let that = this;
            that.usercurrentPage = val;
            that.userloading = true;
            that.getuserList();
        },
        //角色分页
        rolehandleSizeChange(val) {
            let that = this;
            that.rolePageSize = val;
        },
        rolehandleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            let that = this;
            that.rolecurrentPage = val;
            that.roleloading = true;
            that.getallRole();
        },
        //事件信息分页
        eventhandleSizeChange(val) {
            let that = this;
            that.eventPageSize = val;
        },
        eventhandleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            let that = this;
            that.eventcurrentPage = val;
            that.eventloading = true;
            that.getAllEcent();
        },
        //系统日志分页
        systemLoghandleSizeChange(val) {
            let that = this;
            that.systemLogPageSize = val;
        },
        systemLoghandleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            let that = this;
            that.systemLogcurrentPage = val;
            that.systemLogloading = true;
            that.getAllSystemLog();
        },
        //用户列表//获取所有用户列表
        async getuserList(){
            let that = this; 
            let selectData = {
                'pageSize':that.usercurrentPage,
                'pageNum':that.userPageSize,
                'name':'',
            }
            let userdata = await selectUser(selectData) 
            console.log(userdata)
            that.userloading = false;
            if(userdata.status == '200'){ 
                let arr =userdata.rows;
                let newArr = [];
                arr.forEach(element => {
                    let i = element.status;
                    if(i == 1){
                        element.isStatus = '可用'
                    }
                    newArr.push(element)
                });
                  
                that.userTableData = newArr;
                that.usertotal = userdata.total;
            }
        },
        //获取角色与角色id
        getUserAndId(){
           this.$axios({
                    method:'post',
                    url:'wlsbgl/role/getAllRoleName',
                })
                .then((res) => {
                    console.log(res.data);
                    this.roleOption = res.data;
                    let arr = [];
                    for(let i =0;i<res.data.length;i++){
                       arr.push({
                           key:res.data[i].id,
                           label:res.data[i].name,
                       })
                    }
                    console.log(arr)
                    this.roledata = arr;
                })
                .catch((err) => {
                    console.log(err)
                });
        },
        //添加用户
        addUser:function(){
            let that = this;
            that.adduserdialogVisible = true;
            that.getUserAndId();
            that.adduserform.username = '';
            that.adduserform.name = '';
            that.adduserform.role = '';
            that.adduserform.password = '';
            that.adduserform.email = '';
            that.adduserform.phone = '';
        },
        updatainputUpload (file, fileList) {
            const isJPG = file.raw.type === 'image/jpeg' || 'image/png';
            const isLt2M = file.raw.size / 1024 / 1024 < 2;
            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            return false
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            return false
            }
            // return isJPG && isLt2M;
            this.updataimagefile = file.raw
            this.updataimagefileName = file.name
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(this.updataimagefile,this.updataimagefileName)
        },
        sureAddUser(adduserform){
            let that = this;
            that.$refs[adduserform].validate((valid) => {
                if (valid) {
                   that.addUserFun();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        async addUserFun(){
             let that = this;
             let addData = {
                'name':that.adduserform.name,
                'LoginName':that.adduserform.username,
                'roleId':that.adduserform.role,
                'password':that.adduserform.password,
                'email':that.adduserform.email,
                'mobile':that.adduserform.phone,
                'createTime':that.nowTime
            }
            let adduserdata = await addUser(addData) 
            console.log(adduserdata);
            if(adduserdata.status == '200'){
            that.adduserdialogVisible = false;
            that.userloading = false;
            that.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success'
            });
            that.getuserList();
            }else{
            that.userloading = false;
            that.$notify.error({
                    title: '失败',
                    message: '新增失败',
                });
            that.getuserList();
            }
        },
        //点击用户快速搜索
        async userSelect(){
            let that = this; 
            let selectData = {
                'pageSize':that.usercurrentPage,
                'pageNum':that.userPageSize,
                'name':that.userSelsctInput,
            }
            let userdata = await selectUser(selectData) 
            console.log(userdata)
            that.userloading = true;   
            if(userdata.status == '200'){  
                that.userloading = false;   
                let arr =userdata.rows;
                let newArr = [];
                arr.forEach(element => {
                    let i = element.status;
                    if(i == 1){
                        element.isStatus = '可用'
                    }
                    newArr.push(element)
                });
                that.userTableData = newArr;
                that.usertotal = userdata.total;
                that.$notify({
                    title: '成功',
                    message: '查询成功',
                    type: 'success'
                });
            }else{
                that.userloading = false;  
                that.$notify.error({
                    title: '错误',
                    message: '查询失败'
                });
            }
        },
        //用户查看
        userDetail:function(scope){
            console.log(scope)
            let that = this;
            that.seeUserdialogVisible = true;
            that.userInfo.name = scope.name;
            that.userInfo.isStatus = scope.isStatus;
            that.userInfo.createTime = scope.createTime;
            that.userInfo.createUser = scope.createUser;
            that.userInfo.updateTime = scope.updateTime;
            that.userInfo.updateUser = scope.updateUser;
            that.userInfo.email = scope.email;
            that.userInfo.phone = scope.phone;
            that.userInfo.mobile = scope.mobile;
            that.userInfo.lastLoginTime = scope.lastLoginTime;
            that.userInfo.lastLoginIp = scope.lastLoginIp;
            that.userInfo.loginNum = scope.loginNum;
        },
        //用户删除
        usedelete(scope){
            console.log(scope);
            let that = this;
            that.userDelid = scope.id;
            that.deleteUserdialogVisible = true;
        },
        async sureDeleteUser(){
            let that = this;
            let delData = {
                'id':that.userDelid
            };
            let delsj = await delUser(delData);
            console.log(delsj)
            that.deleteUserdialogVisible = false;
            if(delsj.status == '200'){
            that.userloading = false;
            that.$notify({
                title: '成功',
                message: delsj.msg,
                type: 'success'
            });
            that.getuserList();
            }else{
            that.userloading = false;
            that.$notify.error({
                    title: '失败',
                    message: delsj.msg,
                });
            that.getuserList();
            }
        },
        //角色权限//获取所有角色
        async getallRole(){
            let that = this; 
            let selectRoleData = { 
                'pageSize':that.rolecurrentPage,
                'pageNum':that.rolePageSize,
                'name':'',   
            }
            let roledata = await selectRole(selectRoleData) 
            console.log(roledata)
            that.roleloading = false;
            if(roledata.status == '200'){ 
                let arr =roledata.rows;
                let newArr = [];
                arr.forEach(element => {
                    let i = element.status;
                    if(i == 1){
                        element.isStatus = '可用'
                    }
                    newArr.push(element)
                });
                  
                that.roleTableData =newArr;
                that.roletotal = roledata.total;
            }
        },
        //角色添加
        addrole(){
            let that = this;
            that.addroledialogVisible = true;
            that.getUserAndId();
            that.rolevalue = [];
        },
        rolehandleChange(value, direction, movedKeys) {
            console.log(value, direction, movedKeys);
        },
        sureaddRole(){

        },
        //角色搜索
        async roleSelect(){
            let that = this; 
            let selectData = {
                'pageSize':that.rolecurrentPage,
                'pageNum':that.rolePageSize,
                'name':that.roleSelsctInput, 
            }
            let roledata = await selectRole(selectData) 
            console.log(roledata)
            that.roleloading = true;   
            if(roledata.status == '200'){  
                that.roleloading = false;   
                let arr =roledata.rows;
                let newArr = [];
                arr.forEach(element => {
                    let i = element.status;
                    if(i == 1){
                        element.isStatus = '可用'
                    }
                    newArr.push(element)
                });
                that.roleTableData =newArr;
                that.roletotal = roledata.total;
                that.$notify({
                    title: '成功',
                    message: '查询成功',
                    type: 'success'
                });
            }else{
                that.roleloading = false;  
                that.$notify.error({
                    title: '错误',
                    message: '查询失败'
                });
            }
        },
        //角色查看
        roleDetail(scope){

        },
        //角色删除
        roleDel(scope){

        },
        //事件信息//获取所有信息事件
        getAllEcent(){

        },
        //事件搜索
        eventselect(){

        },
        //事件查看详情
        eventDetail(scope){

        },
        //系统日志//获取所有系统日志
        getAllSystemLog(){

        },
        //系统日志搜索
        systemLogselect(){

        },
        //系统日志详情
        systemLogDetail(scope){

        },
        //系统设置 导航
        sytemhandleClick(tab, event) {
            console.log(tab, event);
        },
        //更新许可
        updateLicense(){
            let that = this;
            console.log('更新许可')
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
.el-input .el-input__inner{
    height: 32px;
    line-height: 32px;
  }
.sytembody{
    overflow: hidden;
    .sytembodyleft{
        float: left;
        margin-left: 150px;
        margin-top: 50px;
    }
    .sytembodright{
         margin-top: 50px;
    }
}
.sytembuttom{
    margin-left: 633px;
    margin-top: 10px;
}
.adduserbody{
    overflow: hidden;
    .adduserbodyleft{
        float: left;
    }
    .adduserbodyright{
        float: right;
    }
}  
// 上传图片
.avatar-uploader {
    
    width: 270px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    // border: 1px dashed #333;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #333;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
