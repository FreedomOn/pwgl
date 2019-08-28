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
                                highlight-current-row
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
                                prop="device.lastUpTime"
                                label="启动时间">
                                </el-table-column>
                                <el-table-column
                                fixed="right"
                                label="操作"
                                width="340"
                                >
                                <template slot-scope="scope">
                                    <el-button-group>
                                    <el-button @click="deployDetail(scope.row)" type="info" icon="el-icon-info" size="small" >查看</el-button>
                                    <el-button @click="startDeploy(scope.row)" type="primary" icon="el-icon-caret-right" size="small"  v-if="scope.row.device.statusId === 1">启动</el-button>
                                    <el-button @click="stopDeploy(scope.row)" type="primary" icon="el-icon-success" size="small"  v-if="scope.row.device.statusId === 0">停止</el-button>
                                    <el-button @click="deployReload(scope.row)" type="danger"    icon="el-icon-refresh" size="small" :disabled="scope.row.device.statusId ===1">重启</el-button>
                                    <el-button @click="applicationDeployment(scope.row)" type="primary" icon="el-icon-setting" size="small">应用部署</el-button>
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
                                <!-- <el-table-column
                                prop=""
                                label="状态"
                                width="130">
                                </el-table-column> -->
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
                                width="250"
                                >
                                <template slot-scope="scope">
                                    <el-button-group>
                                    <el-button @click="applyDetail(scope.row)" type="info" icon="el-icon-info" size="small">查看</el-button>
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
                                    <el-button @click="mirroringDetail(scope.row)" type="info"  icon="el-icon-info"  size="small">查看</el-button>
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
        <el-dialog title="应用部署" :visible.sync="deployDlgVisible" width="85%" :before-close="handleClose">
            <el-form :inline="true" :model="deployForm" ref="deployForm" :rules="rules" label-width="120px">
                <div class="addStyle">
                <el-row>
                    <el-col :span="12">
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="设备名称:" prop='deviceName'>
                                <span>
                                    {{deployForm.deviceName}}
                                </span>
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="容器版本：" prop='appVersion'>
                                <span>
                                    {{deployForm.appVersion}}
                                </span>
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="启动时间：" prop='lastUpTime'>
                                <span>
                                    {{deployForm.lastUpTime}}
                                </span>
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="关闭时间：" prop='id'>
                             <span>
                                 {{deployForm.lastStopTime}}
                             </span>
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="状态：" prop='id'>
                                <span>
                                    {{deployForm.id}}
                                </span>
                            </el-form-item> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="添加应用：" prop='id'>
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
                        <el-col :span="8" v-for="(item,index) in appSelectList" :key="index" :offset="1">
                        <el-card :body-style="{ padding: '0px',height:'235px' }">
                            <div class="appimage" >
                                <img src="/static/images/app.png" class="appimage_image">
                            </div>
                            <div style="padding: 8px;margin: 2px 2px;">
                            <span>{{item.app.name}}</span>
                            <span>[{{item.app.version}}]</span>
                            <div class="bottom clearfix">
                                <time class="time clearfix">{{item.createTime}}</time>
                                <el-tooltip class="item" effect="dark" content="是否启动？" placement="left" v-if="item.status === 1">
                                    <el-button @click="deployItem(item)" circle  icon='el-icon-caret-right'></el-button> 
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="是否停止？" placement="left" v-if="item.status === 0">
                                    <el-button @click="stopItem(item)" circle  icon='el-icon-circle-check'></el-button> 
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="是否重启？" placement="bottom" >
                                    <el-button @click="refresh(item)" circle icon="el-icon-refresh" :disabled="item.status === 1"></el-button>
                                </el-tooltip>
                               <el-tooltip class="item" effect="dark" content="是否删除？" placement="right">
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
                <el-button @click="arrange()"  type="primary">编排</el-button>
                <el-button @click="deployDlgVisible = false">关闭</el-button>
            </span>
            </el-dialog>
        <!-- 布署管理详情 -->
        <el-dialog title="布署管理详情：" :visible.sync="deplyDialogFormVisible" width="40%">
            <el-form :model="deployDetailForm">
                <el-row>
                    <el-col :span=12>
                            <el-form-item label="容器名称:" >
                            {{deployDetailForm.name}}
                        </el-form-item>
                    </el-col>
                        <el-col :span=12>
                            <el-form-item label="所属设备:" >
                            {{deployDetailForm.device}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span=12>
                            <el-form-item label="容器版本:" >
                            {{deployDetailForm.version}}
                        </el-form-item>
                    </el-col>
                        <el-col :span=12>
                            <el-form-item label="设备状态:" >
                            {{deployDetailForm.status}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span=12>
                            <el-form-item label="应用数量:" >
                            {{deployDetailForm.num}}
                        </el-form-item>
                    </el-col>
                        <el-col :span=12>
                            <el-form-item label="启动时间:" >
                            {{deployDetailForm.startTime}}
                        </el-form-item> 
                    </el-col>
                </el-row>
                    <el-row>
                    <el-col :span=12>
                        <el-form-item label="停止时间:" >
                            {{deployDetailForm.stopTime}}
                        </el-form-item>
                    </el-col>
                </el-row>                 
            </el-form>
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
        <!-- 应用管理详情 -->
        <el-dialog title="应用管理详情：" :visible.sync="applyDialogFormVisible" width="40%">
                <el-form :model="applyDetailForm">
                    <el-row>
                        <el-col :span=12>
                             <el-form-item label="应用名称:" >
                                {{applyDetailForm.name}}
                            </el-form-item>
                        </el-col>
                         <el-col :span=12>
                             <el-form-item label="类型:" >
                                {{applyDetailForm.type}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span=12>
                             <el-form-item label="镜像信息:" >
                                {{applyDetailForm.info}}
                            </el-form-item>
                        </el-col>
                         <!-- <el-col :span=12>
                             <el-form-item label="状态:" >
                                {{applyDetailForm.status}}
                            </el-form-item>
                        </el-col> -->
                    </el-row>
                    <el-row>
                        <el-col :span=12>
                             <el-form-item label="创建时间:" >
                                {{applyDetailForm.createTime}}
                            </el-form-item>
                        </el-col>
                         <el-col :span=12>
                             <el-form-item label="更新时间:" >
                                {{applyDetailForm.updateTime}} 
                            </el-form-item> 
                        </el-col>
                    </el-row>             
                </el-form>
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
        <el-dialog title="镜像信息详情：" :visible.sync="mirroingDialogFormVisible" width="40%">
            <el-form :model="mirrDetailForm">
                <el-row>
                    <el-col :span=12>
                            <el-form-item label="镜像名称:" >
                            {{mirrDetailForm.name}}
                        </el-form-item>
                    </el-col>
                        <el-col :span=12>
                            <el-form-item label="类型:" >
                            {{mirrDetailForm.type}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span=12>
                            <el-form-item label="版本:" >
                            {{mirrDetailForm.version}}
                        </el-form-item>
                    </el-col>
                        <el-col :span=12>
                            <el-form-item label="状态:" >
                            {{mirrDetailForm.status}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span=12>
                            <el-form-item label="创建时间:" >
                            {{mirrDetailForm.createTime}}
                        </el-form-item>
                    </el-col>
                        <el-col :span=12>
                            <el-form-item label="创建人:" > 
                            {{mirrDetailForm.createPeople}} 
                        </el-form-item> 
                    </el-col>
                </el-row>             
            </el-form>
        </el-dialog>
        <!-- 编排页面 -->
        <el-dialog
            title="请对应用进行编排:"
            :visible.sync="arrangeDialogVisible"
            width="85%"
           
            :before-close="handleClose">
            <!-- <div style="height:400px;position:relative" ref="box">
                <el-row>
                    <el-col :span="8" v-for="(item,index) in arrangeTableData" :key="index" :offset="1" class="isActive">
                        <div @click="getLine(item)" :class="item.show==true?'active':'hhhh'" :ref='item.name' >{{item.app.name}}[{{item.app.version}}]
                              <i></i>
                        </div>

                      
                    </el-col>
                 </el-row>
                 <canvas id="myCanvas" ref="myCanvas"></canvas>
            </div> -->
            <el-table
                :data="arrangeTableData"
                style="width: 100%"
                height="250px">
                <el-table-column
                    prop="app.name"
                    label="应用名称"
                    width="220"
                    >
                </el-table-column>
                <el-table-column
                    prop="app.version"
                    label="应用版本"
                    width="220">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间"
                        width="220">
                    </el-table-column>
                <el-table-column
                    width="220"
                    label="移动"
                    fixed="right">
                    <template slot-scope="scope"> 
                        <el-tooltip class="item" effect="dark" content="上移" placement="top-start" >
                        <el-button size="mini" type="success" icon="el-icon-caret-top"  @click="upAPP(scope.row)" :disabled="scope.$index == 0"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="下移" placement="top-start">
                        <el-button size="mini" type="success" icon="el-icon-caret-bottom" @click="downAPP(scope.row)" :disabled="scope.$index == (arrangeTableData.length-1)"></el-button>
                        </el-tooltip>
                         <el-tooltip class="item" effect="dark" content="是否设置为独立应用？" placement="top-start">
                        <el-button size="mini" type="success"  @click="duliAPP(scope.row)" >设为独立</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!--  -->
            <div style="margin-top:30px;font-weight:600">独立应用：</div>
             <el-table
                :data="independentTableData"
                style="width: 100%"
                height="250px">
                <el-table-column
                    prop="app.name"
                    label="应用名称"
                    width="220"
                    >
                </el-table-column>
                <el-table-column
                    prop="app.version"
                    label="应用版本"
                    width="220">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间"
                        width="220">
                    </el-table-column>
                <el-table-column
                    width="120"
                    label="操作"
                    fixed="right">
                    <template slot-scope="scope"> 
                        <el-tooltip class="item" effect="dark" content="点击在上面表格进行移动编排" placement="top-start" >
                        <el-button size="mini" type="success"   @click="arrangeAPP(scope.row)">进行编排</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button  @click="arrangeDialogVisible = false">关闭</el-button>
                <!-- <el-button @click="arrangeDialogVisible = false">取 消</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { selectDeploy,selectMirring,applyAdd,applySelectapply,delDevice,delApplyDevice,addNewApply,arrangeYes,arrangeNo,arrangeChange,arrangeUp,arrangeDown} from '@/api/containerApplication'
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
        deplyDialogFormVisible:false,
        arrangeDialogVisible:false,
        deployDetailForm:{
            name:'',
            device:'',
            version:'',
            status:'',
            num:'',
            startTime:'',
            stopTime:'',
        },
        deployForm:{
            id:"",
            deviceName:"",
            hostVersion:"",
            lastUpTime:"",
            lastStopTime:"",
            app:"",
        },
        selectApp:"",
        appID:'',
        appStatus:'',
        appSelectList:[],
        appList:[],
        applyDetailForm:{
            name:'',
            type:'',
            info:'', 
            status:'', 
            createTime:'', 
            updateTime:'',
        },
        mirtotal:1,
        applytotal:1,
        bushutotal:1,
        qiaowei:'',
        applyAdd:false,//应用添加按钮
        applyDialogFormVisible:false,
        ImageUpload:false,//镜像上传按钮
        deployTableData: [],
        applyTableData:[],
        mirroringTableData:[],
        mirroringDialogVisible:false,
        mirroingDialogFormVisible:false,
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
        mirrDetailForm:{
            name:'', 
            type:'', 
            version:'', 
            status:'',
            createTime:'', 
            createPeople:'',
        },
        idArr:[],
        deleteDevicedialogVisible:false,
        delid:'',
        deleteApplydialogVisible:false,
        applyDelid:'',
        arrangeOption:[],
        arrangeTableData:[],
        independentTableData:[],
        lineItems:[],
        line:[],
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
            let that = this;
            that.deplyDialogFormVisible = true;
            that.deployDetailForm.name = scope.device.name;
            that.deployDetailForm.device = scope.statesdata;
            that.deployDetailForm.version = scope.device.hostGroup.version;
            that.deployDetailForm.status = scope.devstate;
            that.deployDetailForm.num = scope.appNum;
            that.deployDetailForm.startTime = scope.device.lastUpTime;
            that.deployDetailForm.stopTime = scope.device.lastHeardTime;
        },
        //按钮启动
        startDeploy(data){
            let that = this;
            that.$confirm('此操作将启动设备, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            that.fncStartDeploy(data)
            }).catch(() => {
            console.log('取消了删除')
           })
        }, 
        fncStartDeploy(scope){
            let that = this;
            console.log(scope)
            that.appID = scope.device.id;
            let startID = {
                'id': that.appID ,
                'status':0
            }
            that.$axios({
                method:'post',
                url:'/wlsbgl/device/updateDeviceStatus',
                data:that.qs.stringify(startID)
            })
            .then((res)=>{
                console.log(res.data)
                that.getbushuData();
                if(res.data.status  == '200'){
                    that.$notify({
                        title: '成功',
                        message: res.data.msg,
                        type: 'success'
                    });
                    }else{
                    that.$notify.error({
                        title: '失败',
                        message: res.data.msg,
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        //按钮停止
        stopDeploy(data){
            let that = this;
            that.$confirm('此操作将停止设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                that.fncStopDeploy(data)
                }).catch(() => {
                console.log('取消了删除')
           })
        },
        fncStopDeploy(scope){
            let that = this;
            console.log(scope)
            that.appID = scope.device.id;
            let startID = {
                'id': that.appID ,
                'status':1
            }
            that.$axios({
                method:'post',
                url:'/wlsbgl/device/updateDeviceStatus',
                data:that.qs.stringify(startID)
            })
            .then((res)=>{
                console.log(res.data)
                that.getbushuData();
                if(res.data.status  == '200'){
                    that.$notify({
                        title: '成功',
                        message: res.data.msg,
                        type: 'success'
                    });
                    }else{
                    that.$notify.error({
                        title: '失败',
                        message: res.data.msg,
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        //部署管理重启
        deployReload(data){
            let that = this;
            that.$confirm('此操作将重启设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                that.fncReployDeploy(data)
                }).catch(() => {
                console.log('取消了删除')
           })
        },
        fncReployDeploy(scope){
            let that = this;
            console.log(scope)
            that.appID = scope.device.id;
            let startID = {
                'id': that.appID ,
                'status':2
            }
            that.$axios({
                method:'post',
                url:'/wlsbgl/device/updateDeviceStatus',
                data:that.qs.stringify(startID)
            })
            .then((res)=>{
                console.log(res.data)
                that.getbushuData();
                if(res.data.status  == '200'){
                    that.$notify({
                        title: '成功',
                        message: res.data.msg,
                        type: 'success'
                    });
                    }else{
                    that.$notify.error({
                        title: '失败',
                        message: res.data.msg,
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        //部署管理 应用部署
        applicationDeployment(scope){
            console.log(scope);
            let that = this;
            that.deployDlgVisible = true;
            that.selectApp = '';
            that.qiaowei = scope.id; 
            that.getYiAddApp();
            that.deployForm.deviceName = scope.device.name;
            that.deployForm.appVersion = scope.device.hostGroup.version;
            that.deployForm.lastUpTime = scope.device.lastUpTime;
            that.deployForm.lastStopTime = scope.device.lastHeardTime;
            that.deployForm.id = scope.devstate;
        },
        //获取已经添加的app
        getYiAddApp(){
            let that = this;
            let hostID = {
                'hostId':that.qiaowei
            }
            that.$axios({
                method:'post',
                url:'/wlsbgl/container/containerApp',
                data:that.qs.stringify(hostID)
            })
            .then((res)=>{
                console.log(res.data)
                that.appSelectList = res.data;
                // that.arrangeTableData = res.data;
                // let arr = res.data;
                // let newArr = [];
                // arr.forEach(element =>{
                // element.show = false;
                // element.name = 'line'+element.id;
                // newArr.push(element)
                // })
                // console.log(newArr)
                // that.arrangeTableData = newArr;
                //  console.log(  that.arrangeTableData,' that.arrangeTableData')
            })
            .catch((err)=>{
                console.log(err);
            })
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
                console.log('判断appSelectList')
                console.log(v)
                if(v.appId == that.selectApp) {
                    findFlag = true
                    this.$message.warning('该应用已添加')
                }
            })
            if(!findFlag){
                // let addNewApplyData = ""
                // let addAppData = ""
                // that.appList.forEach((v)=>{
                //     console.log('判断appSelectList')
                //     console.log(v)
                //     if(v.id == that.selectApp) {
                //     addAppData = v;
                //     that.appSelectList.push(v)
                    
                //     }
                // })
                let addNewApplyData = {
                        'hostId':that.qiaowei,
                        'appId':that.selectApp,
                    }
                if(addNewApplyData != ""){
                    let addRs = await addNewApply(addNewApplyData);
                    console.log(addRs)
                    if(addRs.status == '200'){
                        that.getYiAddApp();
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
        //启动app\
        deployItem (data) {
            let that = this
            this.$confirm('此操作将启动应用, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            that.fncDeployItem(data)
            }).catch(() => {
            console.log('取消了删除')
        })
        },
        fncDeployItem(scope){
            let that = this;
            console.log(scope)
            that.appID = scope.id;
            let startID = {
                'id': that.appID ,
                'status':0,
                'hostId':scope.hostId
            }
            that.$axios({
                method:'post',
                url:'/wlsbgl/container/updateContainer',
                data:that.qs.stringify(startID)
            })
            .then((res)=>{
                console.log(res.data)
                that.getYiAddApp();
                if(res.data.status  == '200'){
                    that.$notify({
                        title: '成功',
                        message: res.data.msg,
                        type: 'success'
                    });
                    }else{
                    that.$notify.error({
                        title: '失败',
                        message: res.data.msg,
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        //停止app
        stopItem (data) {
            let that = this
            this.$confirm('此操作将关闭应用, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            that.funStopItem(data)
            }).catch(() => {
            console.log('取消了删除')
        })
        },
        funStopItem(scope){
            let that = this;
            console.log(scope)
            that.appID = scope.id;
            let startID = {
                'id': that.appID ,
                'status':1,
                'hostId':scope.hostId
            }
            that.$axios({
                method:'post',
                url:'/wlsbgl/container/updateContainer',
                data:that.qs.stringify(startID)
            })
            .then((res)=>{
                console.log(res.data)
                that.getYiAddApp();
                if(res.data.status  == '200'){
                    that.$notify({
                        title: '成功',
                        message: res.data.msg,
                        type: 'success'
                    });
                    }else{
                    that.$notify.error({
                        title: '失败',
                        message: res.data.msg,
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        //重启app
         refresh (data) {
            let that = this
            this.$confirm('此操作将重启应用, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            that.funRefresh(data)
            }).catch(() => {
            console.log('取消了删除')
        })
        },
        funRefresh(scope){
            let that = this;
            console.log(scope)
            that.appID = scope.id;
            let startID = {
                'id': that.appID ,
                'status':2,
                'hostId':scope.hostId
            }
            that.$axios({
                method:'post',
                url:'/wlsbgl/container/updateContainer',
                data:that.qs.stringify(startID)
            })
            .then((res)=>{
                console.log(res.data)
                that.getYiAddApp();
                if(res.data.status  == '200'){
                    that.$notify({
                        title: '成功',
                        message: res.data.msg,
                        type: 'success'
                    });
                    }else{
                    that.$notify.error({
                        title: '失败',
                        message: res.data.msg,
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        //删除app
        removeApp(data) {
            let that = this
            this.$confirm('此操作将删除应用, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            that.funDelApp(data)
            }).catch(() => {
            console.log('取消了删除')
        })
        },
        funDelApp(scope){
            let that = this;
            console.log(scope)
            that.appID = scope.id;
            let startID = {
                'id': that.appID,
                'usability':scope.usability,
                'arrange':scope.arrange
            }
            that.$axios({
                method:'post',
                url:'/wlsbgl/container/deleteContainer',
                data:that.qs.stringify(startID)
            })
            .then((res)=>{
                console.log(res.data)
                that.getYiAddApp();
                if(res.data.status  == '200'){
                    that.$notify({
                        title: '成功',
                        message: res.data.msg,
                        type: 'success'
                    });
                    }else{
                    that.$notify.error({
                        title: '失败',
                        message: res.data.msg,
                    });
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        //编排
        async arrange(){
            let that = this;
            that.arrangeDialogVisible = true;
            let yesData = {
                'hostId':that.qiaowei
            }
            let arrangeyes = await arrangeYes(yesData);
            console.log(arrangeyes)
            that.arrangeTableData= arrangeyes;
            let noData = {
                'hostId':that.qiaowei
            }
            let arrangeno = await arrangeNo(noData);
            console.log(arrangeno)
            that.independentTableData = arrangeno;
        },
        //将独立应用 转换成可进行编排的应用
        async arrangeAPP(scope){
            let that = this;
            console.log(scope);
            let changeData = {
                'id':scope.id,
                'hostId': scope.hostId,
                'arrange':scope.arrange,
                'usability':0
            }
            let arrangenodata = await arrangeChange(changeData)
            console.log(arrangenodata)
            if(arrangenodata.status == 200){
                that.arrange();
            }
        },
        //将可编排的应用转换为独立应用
        async duliAPP(scope){
            let that = this;
            console.log(scope);
            let changeData = {
                'id':scope.id,
                'hostId': scope.hostId,
                'arrange':scope.arrange,
                'usability':1
            }
            let arrangeyesdata = await arrangeChange(changeData)
            console.log(arrangeyesdata)
            if(arrangeyesdata.status == 200){
                that.arrange();
            }
        },
        //移动
        async upAPP(scope){
            console.log(scope);
            let that = this;
            let upData= {
                'id':scope.id,
                'hostId': scope.hostId,
                'arrange':scope.arrange,
                'appId':scope.appId
            }
            let lookupdata = await arrangeUp(upData);
            console.log(lookupdata)
            if(lookupdata.status == 200){
                that.arrange();
            }
        }, 
        async downAPP(scope){
            console.log(scope);
            let that = this;
            let downData= {
                'id':scope.id,
                'hostId': scope.hostId,
                'arrange':scope.arrange,
                'appId':scope.appId
            }
            let lookdowndata = await arrangeDown(downData);
            console.log(lookdowndata)
            if(lookdowndata.status == 200){ 
                that.arrange();
            }

        },
        getLine(item){
            console.log(item.show,'showshow')
            item.show = !item.show;
             console.log(item.show,'sss',this.arrangeTableData)
             let jj = this.arrangeTableData;
             this.arrangeTableData= []
             this.arrangeTableData = jj
            //以item。name作为唯一标识
            this.lineItems.push(item.id);
            console.log(this.lineItems,' this.lineItems')
            if(this.lineItems.length==2){
                //数组集满两个，就push line数组画线，如果点击后取消，则清空数组，不push
                if(this.lineItems[0] == this.lineItems[1]){
                    this.lineItems=[]
                    return;
                }
            this.line.push(this.lineItems)
            //push 入line数组，就清空
            console.log(this.line,'line')
            this.lineItems=[]
            this.drawLine()
            }
        },
        drawLine(){
            let c=this.$refs.myCanvas;
            c.width = this.$refs.box.clientWidth;
            c.height = this.$refs.box.clientHeight;
            let ctx=c.getContext("2d");
            let boxx = this.$refs.box;
            let _x = boxx.offsetLeft;
            let _y = boxx.offsetTop;
            //带有坐标的画线数组
            let lineArr=[];
            //数组去重
            let result=[]
                let obj={}
                for(let i of this.line){
                if(!obj[i]){
                    result.push(i) 
                    obj[i] = 1
                }
                }
                console.log(result,'去重后的数组')
                for(let j=0;j<result.length;j++){
                console.log(result[j][0])
                let a ='line'+result[j][0];
                let b = 'line'+result[j][1];
                let dom_l = this.$refs[a][0];
                console.log(dom_l)
                let dom_r = this.$refs[b][0];
                lineArr[j] = {};
                lineArr[j].left = {};
                lineArr[j].right = {};
                lineArr[j].left.x = Math.abs(dom_l.offsetLeft - _x);
                lineArr[j].left.y = Math.abs(dom_l.offsetTop - _y);
                lineArr[j].right.x = Math.abs(dom_r.offsetLeft - _x);
                lineArr[j].right.y = Math.abs(dom_r.offsetTop - _y);
            }
            console.log(lineArr,'llll');
            ctx.clearRect(0,0,c.clientWidth,c.clientHeight);
            for(let i=0;i<lineArr.length;i++){
                ctx.beginPath();
                ctx.lineCap="round";
                ctx.strokeStyle = "red";
                ctx.lineWidth = "1";
                ctx.moveTo(lineArr[i].left.x+15,lineArr[i].left.y+15);
                ctx.lineTo(lineArr[i].right.x+15,lineArr[i].right.y+15);
                ctx.stroke();
                this.arrangeTableData.map(el=>{
                    el.show = false;
                })
            }
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
            that.applyDialogFormVisible = true;
            that.applyDetailForm.name = scope.name
            let imgInfo = scope.appImage;
            let arr = []
            for(let i=0;i<imgInfo.length;i++){
                arr.push(imgInfo[i].iotImage.name)
            }
            that.applyDetailForm.info = arr.join(';')
            that.applyDetailForm.type = scope.typeId;//类型 问题：返回的是什么 字符串还是数字 数字对应代表的是什么
            that.applyDetailForm.status = scope.statusId;//状态
            that.applyDetailForm.createTime = scope.createTime;
            that.applyDetailForm.updateTime = scope.updateTime;
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
            let that = this;
            that.mirroingDialogFormVisible = true;
            that.mirrDetailForm.name = scope.name;
            that.mirrDetailForm.type = scope.statesdata;
            that.mirrDetailForm.version = scope.version;
            // that.mirrDetailForm.status = scope.name;  //状态  目前不确定
            that.mirrDetailForm.createTime = scope.createTime;
            that.mirrDetailForm.createPeople = scope.iotUser.name;
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
.isActive{
    i{
        display: inline-block;
        width: 10px;
        height: 10px;
        border: 1px solid #000;
    }
    .active i{
        background-color: #000;
    }
}
  #myCanvas{
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
            top:0;
            left: 0;
            z-index: 100000;
        }
</style>
