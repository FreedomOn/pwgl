<template>
    <div class="app-container">
       <el-tabs :tab-position="tabPosition"   v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="容器宿主机" name="one">
                 <div class="header">
                        <span class="span1">
                        <el-input v-model="selsctInput"  placeholder="请输入宿主机名称进行搜索" style="width:400px"></el-input>
                        <el-button type="primary" icon="el-icon-search"   @click="deploySelect()">快速搜索</el-button>
                        </span>
                </div>
                <el-table
                    :data="infoTableData"
                    stripe
                    border
                    :height="tableHeight"
                    style="width: 100%;margin-top:10px"
                    v-loading="deployloading"
                    element-loading-text="拼命加载中">
                    <el-table-column
                    prop="device.name"
                    label="宿主机关联设备"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="appNum"
                    label="部署应用数量"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    prop="appRunNum"
                    label="运行中应用数量"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    prop="statusCpu"
                    label="cpu占用状态"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    prop="statusMemory"
                    label="内存占用状态"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    prop="statusDisk"
                    label="硬盘占用状态"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    prop="updateTime"
                    label="更新时间">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="180"
                    >
                    <template slot-scope="scope">
                        <el-button-group>
                        <el-button @click="detailSzj(scope.row)" type="info" icon="el-icon-info" size="small" >查看</el-button>
                        <el-button @click="updateSzj(scope.row)" type="primary" icon="el-icon-edit" size="small">修改</el-button>
                        </el-button-group>
                    </template> 
                    </el-table-column> 
                </el-table>
                    <div>
                    <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20, 50]"
                    :page-size="PageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="传感器" name="two">
                 <div class="header">
                    <span>
                        <el-button type="primary"  @click="addSensor()">新增传感器</el-button>
                    </span> 
                        <span class="span1">
                        <el-input v-model="sensorSelectInput"  placeholder="请输入传感器名字快速搜索" style="width:400px"></el-input>
                        <el-button type="primary" icon="el-icon-search"    @click="sensorSelect()">快速搜索</el-button>
                        </span>
                </div>
                <el-table
                    :data="sensorTableData"
                    stripe
                    border
                    :height="tableHeight"
                    style="width: 100%;margin-top:10px"
                    v-loading="sensorloading"
                    element-loading-text="拼命加载中">
                    <el-table-column
                    prop="name"
                    label="名字"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="sensorType.name"
                    label="类型"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="version"
                    label="版本"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="sensorType.device.name"
                    label="关联设备"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="configInfo"
                    label="配置信息"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="intervals"
                    label="采集周期"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="200"
                    >
                    <template slot-scope="scope">
                        <el-button-group>
                        <el-button @click="sensorDetail(scope.row)" type="primary"  icon="el-icon-edit"  size="small">修改</el-button>
                        <el-button @click="sensorDelete(scope.row)" type="danger"  icon="el-icon-delete"  size="small">删除</el-button>
                        </el-button-group>
                    </template>
                    </el-table-column>
                </el-table>
                    <div  class="pagination"> 
                    <el-pagination
                    background
                    @size-change="sensorhandleSizeChange"
                    @current-change="sensorhandleCurrentChange" 
                    :current-page="sensorcurrentPage"
                    :page-sizes="[5, 10, 20, 50]"
                    :page-size="sensorPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="sensortotal">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="通讯信息" name="three">
                 <div class="header">
                    <span>
                        <el-button type="primary"  @click="addInformation()">新增通讯信息</el-button>
                    </span> 
                        <span class="span1">
                        <el-input v-model="informationSelectInput"  placeholder="请输入通讯信息名称快速搜索" style="width:400px"></el-input>
                        <el-button type="primary" icon="el-icon-search"    @click="informationSelect()">快速搜索</el-button>
                        </span>
                </div>
                <el-table
                    :data="informationTableData"
                    stripe
                    border
                    :height="tableHeight"
                    style="width: 100%;margin-top:10px"
                    v-loading="informationloading"
                    element-loading-text="拼命加载中">  
                    <el-table-column
                    prop="name"
                    label="通讯信息名称"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="deviceComm.device.name"
                    label="关联设备名称"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="infostate"
                    label="通讯类型"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="通讯地址"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="port"
                    label="通讯端口"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="connString"
                    label="连接字符串"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="260"
                    >
                    <template slot-scope="scope">
                        <el-button-group>
                        <el-button @click="informationDetail(scope.row)" type="info"  icon="el-icon-info"  size="small">详情</el-button>
                        <el-button @click="informationUpdate(scope.row)" type="primary"  icon="el-icon-edit"  size="small">修改</el-button>
                        <el-button @click="informationDelete(scope.row)" type="danger"  icon="el-icon-delete"  size="small">删除</el-button>
                        </el-button-group>
                    </template>
                    </el-table-column>
                </el-table>
                    <div  class="pagination"> 
                    <el-pagination
                    background
                    @size-change="informationhandleSizeChange" 
                    @current-change="informationhandleCurrentChange" 
                    :current-page="informationcurrentPage"
                    :page-sizes="[5, 10, 20, 50]"
                    :page-size="informationPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="informationtotal">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
         <!-- 修改宿主机 -->
         <el-dialog
            title="修改宿主机"
            :visible.sync="szjUpdateDialogVisible"
            width="40%"
            :before-close="handleClose">
            <el-form :label-position="labelPosition" label-width="120px" :model="szjUpdateForm">
                <el-form-item label="cpu占用状态:" prop="statusCpu">
                    <el-input v-model="szjUpdateForm.statusCpu" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="内存占用状态:"  prop="statusMemory">
                    <el-input v-model="szjUpdateForm.statusMemory"  style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="硬盘占用状态:"  prop="statusDisk">
                    <el-input v-model="szjUpdateForm.statusDisk"  style="width:300px"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="szjUpdateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureSzj">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 查看宿主机 -->
        <el-dialog 
            title="容器宿主机详情：" :visible.sync="roleDetailDialog" width="40%">
            <el-form :model="roleDetailForm">
                <el-row>
                    <el-col :span=12>
                            <el-form-item label="部署应用数量:" >
                            {{roleDetailForm.appNum}}
                        </el-form-item>
                    </el-col>
                        <el-col :span=12>
                            <el-form-item label="运行中应用数量:" >
                            {{roleDetailForm.appRunNum}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span=12>
                            <el-form-item label="设备名字:" >
                            {{roleDetailForm.name}}
                        </el-form-item>
                    </el-col>
                        <el-col :span=12>
                            <el-form-item label="cpu占用状态:" >
                            {{roleDetailForm.statusCpu}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span=12>
                            <el-form-item label="内存占用状态:" >
                            {{roleDetailForm.statusMemory}} 
                        </el-form-item>
                    </el-col>
                      <el-col :span=12>
                            <el-form-item label="硬盘占用状态:" >
                            {{roleDetailForm.statusDisk}} 
                        </el-form-item>
                    </el-col>
                </el-row>   
                  <el-row>
                    <el-col :span=12>
                            <el-form-item label="更新时间:" >
                            {{roleDetailForm.statusMemory}} 
                        </el-form-item>
                    </el-col>
                </el-row>          
            </el-form>
        </el-dialog>
        <!-- 新增传感器 -->
         <el-dialog
            title="新增传感器"
            :visible.sync="addSensorDialogVisible"
            width="40%"
            :before-close="handleClose">
            <el-form :label-position="labelPosition" label-width="120px" :model="addSensorForm">
                <el-form-item label=" 设备名称:" prop="deviceName">
                    <el-select v-model="addSensorForm.deviceName" placeholder="请选择" style="width:300px" @change="deviceChange">
                        <el-option
                        v-for="item in deviceOptions" 
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option> 
                    </el-select>
                </el-form-item>
                <el-form-item label=" 传感器类型:" prop="name" >
                    <el-select v-model="addSensorForm.name" placeholder="请选择" style="width:300px"  @change="sensorChange">
                        <el-option
                        v-for="item in sensorOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label=" 传感器名字:" prop="sensorName">
                    <el-input v-model="addSensorForm.sensorName" style="width:300px" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label=" 版本:" prop="version">
                    <el-input v-model="addSensorForm.version" style="width:300px" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="配置信息:"  prop="configInfo">
                    <el-input v-model="addSensorForm.configInfo"  style="width:300px" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="采集周期:"  prop="interval">
                    <el-input v-model="addSensorForm.interval"  style="width:300px" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addSensorDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureAddSensor">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改传感器 -->
         <el-dialog
            title="修改传感器"
            :visible.sync="updateSensorDialogVisible"
            width="40%"
            :before-close="handleClose">
            <el-form :label-position="labelPosition" label-width="120px" :model="updateSensorForm">
                <el-form-item label=" 设备名称:" prop="deviceName">
                    <el-select v-model="updateSensorForm.deviceName" placeholder="请选择" style="width:300px" @change="updatedeviceChange">
                        <el-option
                        v-for="item in updatedeviceOptions" 
                        :key="item.id"
                        :label="item.name"   
                        :value="item.id"> 
                        </el-option> 
                    </el-select>
                </el-form-item>
                <el-form-item label=" 传感器类型:" prop="name" >
                    <el-select v-model="updateSensorForm.name" placeholder="请选择" style="width:300px"  @change="updatesensorChange">
                        <el-option
                        v-for="item in updatesensorOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label=" 传感器名字:" prop="sensorName">
                    <el-input v-model="updateSensorForm.sensorName" style="width:300px" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label=" 版本:" prop="version">
                    <el-input v-model="updateSensorForm.version" style="width:300px" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="配置信息:"  prop="configInfo">
                    <el-input v-model="updateSensorForm.configInfo"  style="width:300px" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="采集周期:"  prop="interval">
                    <el-input v-model="updateSensorForm.interval"  style="width:300px" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateSensorDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureUpdateSensor">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 通讯信息详情 -->
         <el-dialog title="通讯信息详情：" :visible.sync="infoDialogFormVisible" width="60%">
            <el-form :model="infoDetailForm">
                <el-row>
                    <el-col :span=12>
                            <el-form-item label="通讯信息名称:" >
                            {{infoDetailForm.name}}
                        </el-form-item>
                    </el-col>
                        <el-col :span=12>
                            <el-form-item label="通讯信息名称:" >
                            {{infoDetailForm.deviceName}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span=12>
                            <el-form-item label="通讯类型:" >
                            {{infoDetailForm.type}}
                        </el-form-item>
                    </el-col>
                        <el-col :span=12>
                            <el-form-item label="通讯地址:" >
                            {{infoDetailForm.address}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span=12>
                            <el-form-item label="通讯端口:" >
                            {{infoDetailForm.port}}
                        </el-form-item>
                    </el-col>
                        <el-col :span=12>
                            <el-form-item label="通讯协议ID:" >
                            {{infoDetailForm.protocolId}}
                        </el-form-item> 
                    </el-col>
                </el-row>
                    <el-row>
                    <el-col :span=12>
                        <el-form-item label="连接字符串:" >
                            {{infoDetailForm.connString}}
                        </el-form-item>
                    </el-col>
                     <el-col :span=12>
                        <el-form-item label="扩展信息1:" >
                            {{infoDetailForm.ext1}}
                        </el-form-item>
                    </el-col>
                </el-row>    
                <el-row>
                    <el-col :span=12>
                        <el-form-item label="扩展信息2:" >
                            {{infoDetailForm.ext2}}
                        </el-form-item>
                    </el-col>
                     <el-col :span=12>
                        <el-form-item label="服务器地址:" >
                            {{infoDetailForm.server}}
                        </el-form-item>
                    </el-col>
                </el-row>        
                <el-row>
                    <el-col :span=12>
                        <el-form-item label="服务器端口:" >
                            {{infoDetailForm.serverPort}}
                        </el-form-item>
                    </el-col>
                </el-row>        
            </el-form>
        </el-dialog>
        <!-- 新增通讯信息 -->
         <el-dialog
            title="新增通讯信息"
            :visible.sync="addIndoDialogVisible"
            width="60%"
            :before-close="handleClose">
            <el-form :inline="true" :model="addinfoForm" ref="addinfoForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="通讯信息名称" prop='name'>
                        <el-input v-model="addinfoForm.name" clearable placeholder="请输入" style="width:270px"></el-input>
                        </el-form-item> 
                    </el-col>
                    <el-form-item label=" 设备名称:" prop="deviceName" >
                        <el-select v-model="addinfoForm.deviceName" placeholder="请选择" style="width:300px" @change="infodeviceChange">
                            <el-option
                            v-for="item in arrdeviceOptions" 
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option> 
                        </el-select>
                     </el-form-item>
                </el-row>   
                 <el-row>
                     <el-col :span="12">
                        <el-form-item label="通讯类型" prop='type'>
                            <el-radio v-model="addinfoForm.type" label="0">网关设备</el-radio>
                            <el-radio v-model="addinfoForm.type" label="1">终端设备</el-radio>
                        </el-form-item> 
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="通讯地址" prop='address, '>
                        <el-input v-model="addinfoForm.address" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item> 
                    </el-col>    
                </el-row>    
                <el-row>
                     <el-col :span="12"> 
                        <el-form-item label="通讯端口" prop='port'>
                        <el-input v-model="addinfoForm.port" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item> 
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="通讯协议ID" prop='protocolId, '>
                        <el-input v-model="addinfoForm.protocolId" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item> 
                    </el-col>               
                </el-row>  
                <el-row>
                    <el-col :span="12"> 
                        <el-form-item label="连接字符串" prop='connString'>
                        <el-input v-model="addinfoForm.connString" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item> 
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="扩展信息1" prop='ext1, '>
                        <el-input v-model="addinfoForm.ext1" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item>
                    </el-col>     
                </el-row> 
                <el-row>
                    <el-col :span="12"> 
                        <el-form-item label="扩展信息2" prop='ext2'>
                        <el-input v-model="addinfoForm.ext2" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item> 
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="服务器地址" prop='server, '>
                        <el-input v-model="addinfoForm.server" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item> 
                    </el-col>
                </el-row> 
                <el-row>
                    <el-col :span="12"> 
                        <el-form-item label="服务器端口" prop='serverPort'>
                        <el-input v-model="addinfoForm.serverPort" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item> 
                    </el-col>
                </el-row> 
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addIndoDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureinfoAdd()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改通讯信息 -->
         <el-dialog
            title="修改通讯信息"
            :visible.sync="updateIndoDialogVisible"
            width="60%"
            :before-close="handleClose">
            <el-form :inline="true" :model="updateinfoForm" ref="updateinfoForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="通讯信息名称" prop='name'>
                        <el-input v-model="updateinfoForm.name" clearable placeholder="请输入" style="width:270px"></el-input>
                        </el-form-item> 
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label=" 设备名称:" prop="deviceName">
                            <el-select v-model="updateinfoForm.deviceName" placeholder="请选择" style="width:300px" @change="updateinfodeviceChange">
                                <el-option
                                v-for="item in updatearrdeviceOptions" 
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
                        <el-form-item label="通讯类型" prop='type'>
                            <el-radio v-model="updateinfoForm.type" label="0">网关设备</el-radio>
                            <el-radio v-model="updateinfoForm.type" label="1">终端设备</el-radio>
                        </el-form-item> 
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="通讯地址" prop='address, '>
                        <el-input v-model="updateinfoForm.address" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item> 
                    </el-col>

                </el-row>    
                <el-row>
                    <el-col :span="12"> 
                        <el-form-item label="通讯端口" prop='port'>
                        <el-input v-model="updateinfoForm.port" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item> 
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="通讯协议ID" prop='protocolId, '>
                        <el-input v-model="updateinfoForm.protocolId" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item> 
                    </el-col>
                </el-row>  
                <el-row>
                    <el-col :span="12"> 
                        <el-form-item label="连接字符串" prop='connString'>
                        <el-input v-model="updateinfoForm.connString" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item> 
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="扩展信息1" prop='ext1, '>
                        <el-input v-model="updateinfoForm.ext1" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row>
                    <el-col :span="12"> 
                        <el-form-item label="扩展信息2" prop='ext2'>
                        <el-input v-model="updateinfoForm.ext2" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item> 
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="服务器地址" prop='server, '>
                        <el-input v-model="updateinfoForm.server" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item> 
                    </el-col>
                </el-row> 
                  <el-row>
                    <el-col :span="12"> 
                        <el-form-item label="服务器端口" prop='serverPort'>
                        <el-input v-model="updateinfoForm.serverPort" clearable placeholder="请输入" style="width:300px"></el-input>
                        </el-form-item> 
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateIndoDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureinfoUpdate()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import {getAllData,upateSzjData,getSensorData,addSensor,getAllDevice,getAllSensorType,updateSensor,deleteSensor,getinformationData,deleteinformation,addinformation,updateinformation} from '@/api/peizhi'
export default {
    data () {
        return{
            tabPosition: 'left',
            activeName:'one',
            infoTableData:[],
            currentPage:1,
            PageSize:10,
            total:0,
            deployloading:true,
            selsctInput:'',
            tableHeight:window.innerHeight -10,
            szjUpdateDialogVisible:false,
            labelPosition: 'right',
            szjUpdateForm: {
                statusCpu: '',
                statusMemory: '',
                statusDisk: '',
                id:'',
            },
            roleDetailDialog:false,
            roleDetailForm:{
                appNum:'',
                appRunNum:'',
                name:'',
                statusCpu:'',
                statusMemory:'',
                statusDisk:'',
                statusMemory:'',
            },
            // 传感器
            sensorTableData:[],
            sensorloading:true,
            sensorcurrentPage:1, 
            sensorPageSize:10, 
            sensortotal:0,
            sensorSelectInput:'',
            addSensorDialogVisible:false,
            addSensorForm:{
                deviceID:'',
                sensorName:'',
                sensorID:'',
                deviceName:'', 
                name:'', 
                version:'', 
                configInfo:'', 
                interval:''
            },
            deviceOptions:[], 
            sensorOptions:[],
            updateSensorDialogVisible:false,
            updateSensorForm:{
                id:'',
                deviceID:'',
                sensorName:'',
                sensorID:'',
                deviceName:'', 
                name:'', 
                version:'', 
                configInfo:'', 
                interval:''
            },
            updatedeviceOptions:[], 
            updatesensorOptions:[],
            // 通讯信息
            informationSelectInput:'',
            informationTableData:[],
            informationloading:true,
            informationcurrentPage:1, 
            informationPageSize:10, 
            informationtotal:0,
            infoDialogFormVisible:false,
            infoDetailForm:{
                name:'',
                deviceName:'',
                type:'',
                address:'',
                port:'',
                protocolId:'',
                connString:'',
                ext1:'',
                ext2:'',
                server:'',
                serverPort:'',
            },
            addinfoForm:{
                name:'',
                deviceName:'',
                deviceNameid:'',
                type:'',
                address:'',
                port:'',
                protocolId:'',
                connString:'',
                ext1:'',
                ext2:'',
                server:'',
                serverPort:'',
            },
            arrdeviceOptions:[],
            updatearrdeviceOptions:[],
            addIndoDialogVisible:false,
            updateinfoForm:{
                id:'',
                name:'',
                deviceName:'',
                deviceNameid:'',
                type:'',
                address:'',
                port:'',
                protocolId:'',
                connString:'',
                ext1:'',
                ext2:'',
                server:'',
                serverPort:'',
            },
            updateIndoDialogVisible:false,
        
        }
    },
    mounted(){
        this.getconfigData();
        this.getsensorData();
        this.getinformationData();
        let sysactivetab = localStorage.getItem('configtab');
        if(!sysactivetab){
             this.activeName = 'one'
        }else{
             this.activeName = sysactivetab;
        }
    },
    methods: {
        handleClose(done) {
            done();
        },
        //点击左侧导航事件
        handleClick(tab, event) {
            let that = this;
            console.log(tab.paneName);
            localStorage.setItem('configtab', tab.paneName);
            console.log(event)
            if(tab.paneName == 'one'){
                console.log('配置信息')
                that.getconfigData();
            }else if(tab.paneName == 'two'){
                 that.getsensorData();  
            }else if(tab.paneName == 'three'){ 
               that.getinformationData();
            }
        },
        //fenye
        handleSizeChange(val) {
            let that = this;
            that.PageSize = val;
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            let that = this;
            that.currentPage = val;
            that.deployloading = true;deployloading
            that.getconfigData();
        },
        //传感器分页
        sensorhandleSizeChange(val){
            let that = this;
            that.sensorPageSize = val;
        },
        sensorhandleCurrentChange(val){
            console.log(`当前页: ${val}`);
            let that = this;
            that.sensorcurrentPage = val;
            that.sensorloading = true;
            that.getsensorData();
        },
        //通讯信息分页
        informationhandleSizeChange(val){
            let that = this;
            that.informationPageSize = val;
        },
        informationhandleCurrentChange(val){
            console.log(`当前页: ${val}`);
            let that = this;
            that.informationcurrentPage = val;
            that.informationloading = true;
            that.getinformationData();
        },
        //获取所有数据
        async getconfigData(){
             let that = this;
             let allData = {
                'pageSize':that.sensorcurrentPage, //页数
                'pageNum':that.sensorPageSize,//数量
                'name':'',
            }
            let newdata = await getAllData(allData) ;
            console.log(newdata)
            if(newdata.status == '200'){ 
                that.deployloading = false;   
                that.infoTableData = newdata.rows;
                that.total = newdata.total;
            }
        },
        //搜索
        async deploySelect(){
            let that = this;
            let allData = {
                'pageSize':that.currentPage, //页数
                'pageNum':that.PageSize,//数量
                'name':that.selsctInput,
            }
            let newdata = await getAllData(allData) ;
            console.log(newdata)
            if(newdata.status == '200'){ 
                that.deployloading = false;   
                that.infoTableData = newdata.rows;
                that.total = newdata.total;
                 that.$notify({
                    title: '成功',
                    message: '查询成功',
                    type: 'success'
                });
            }else{
                that.$notify.error({
                    title: '失败',
                    message: '查询失败',
                });
            }
        },
        //查看
        detailSzj(scope){
            let that = this;
            console.log(scope);
            that.roleDetailDialog = true;
            that.roleDetailForm.appNum = scope.appNum;
            that.roleDetailForm.appRunNum = scope.appRunNum;
            that.roleDetailForm.name = scope.device.name;
            that.roleDetailForm.statusCpu = scope.statusCpu;
            that.roleDetailForm.statusMemory = scope.statusMemory;
            that.roleDetailForm.statusDisk = scope.statusDisk;
            that.roleDetailForm.statusMemory = scope.statusMemory;
        },
        //修改
        updateSzj(scope){
            let that = this;
            console.log(scope);
            that.szjUpdateDialogVisible = true;
            that.szjUpdateForm.statusCpu = scope.statusCpu;
            that.szjUpdateForm.statusMemory = scope.statusMemory; 
            that.szjUpdateForm.statusDisk = scope.statusDisk;
            that.szjUpdateForm.id = scope.id;
        },
        async sureSzj(){
            let that = this;
            let updateData = {
                'id':that.szjUpdateForm.id,
                'statusCpu':that.szjUpdateForm.statusCpu,
                'statusMemory':that.szjUpdateForm.statusMemory,
                'statusDisk':that.szjUpdateForm.statusDisk,   
            }
            let resData = await upateSzjData(updateData);
            console.log(resData);
            if(resData.status == '200'){
                that.szjUpdateDialogVisible = false;
                that.$notify({
                    title: '成功',
                    message: resData.msg,
                    type: 'success'
                });
                 that.getconfigData()
            }else{
                that.$notify.error({
                    title: '失败',
                    message: resData.msg,
                });
                 that.getconfigData()
            }

        },
        //获取传感器数据
        async getsensorData(){
             let that = this;
             let sensorData = {
                'pageSize':that.currentPage, //页数
                'pageNum':that.PageSize,//数量
                'name':'',
            }
            let newdata = await getSensorData(sensorData) ;
            console.log(newdata)
            if(newdata.status == '200'){ 
                that.sensorloading = false;   
                that.sensorTableData = newdata.rows;
                that.sensortotal = newdata.total;
            }
 
        },
        //快速搜索
        async sensorSelect(){
            let that = this;
            let sensorData = {
                'pageSize':that.currentPage, //页数
                'pageNum':that.PageSize,//数量
                'name':that.sensorSelectInput,
            }
            let newdata = await getSensorData(sensorData) ;
            console.log(newdata)
            if(newdata.status == '200'){ 
                that.sensorloading = false;   
                that.sensorTableData = newdata.rows;
                that.sensortotal = newdata.total;
                 that.$notify({
                    title: '成功',
                    message: '查询成功',
                    type: 'success'
                });
            }else{
                that.$notify.error({
                    title: '失败',
                    message: '查询失败',
                });
            }
        },
        //新增传感器
        async addSensor(){
            let that = this;
            let devicedata = await getAllDevice();
            let sensorTypedata = await getAllSensorType();
            console.log(devicedata)
            console.log(sensorTypedata);
            that.addSensorDialogVisible = true;
            that.deviceOptions = devicedata;
            that.sensorOptions = sensorTypedata;
            that.addSensorForm.deviceName = '';
            that.addSensorForm.name = '';
            that.addSensorForm.sensorName ='';
            that.addSensorForm.version = '';
            that.addSensorForm.configInfo = '';
            that.addSensorForm.interval = '';   
        },
        deviceChange(val){
            let that = this;
            console.log(val);
            that.addSensorForm.deviceID = val;
        },
        sensorChange(val){
            let that = this;
           that.addSensorForm.sensorID = val;
        },
        updatedeviceChange(val){
            let that = this;
            that.updateSensorForm.deviceName = val;
        }, 
        updatesensorChange(val){
            let that = this;
            that.updateSensorForm.sensorID = val;
        },
        async sureAddSensor(){
            let that = this;
            let sensorData = {
                'device_id':that.addSensorForm.deviceID,
                'name':that.addSensorForm.sensorName,
                'sensor_type_id':that.addSensorForm.sensorID,
                'version':that.addSensorForm.version,
                'config_info':that.addSensorForm.configInfo,
                'interval':that.addSensorForm.interval,
            }
            let addData = await addSensor(sensorData);
            console.log(addData)
            if(addData.status == '200'){
                that.addSensorDialogVisible = false;
                that.$notify({
                    title: '成功',
                    message: addData.msg,
                    type: 'success'
                });
                 that.getsensorData()
            }else{
                that.addSensorDialogVisible = false;
                that.$notify.error({
                    title: '失败',
                    message: addData.msg,
                });
                 that.getsensorData()
            }

        },
        // 修改传感器
        async sensorDetail(scope){
            let that = this;
            console.log(scope);
            let devicedata = await getAllDevice();
            let sensorTypedata = await getAllSensorType();
            that.updatedeviceOptions = devicedata;
            that.updatesensorOptions = sensorTypedata;
            that.updateSensorDialogVisible = true;
            that.updateSensorForm.deviceName = scope.deviceId;
            that.updateSensorForm.name = scope.sensorTypeId;
            that.updateSensorForm.sensorName =scope.name;
            that.updateSensorForm.version = scope.version;
            that.updateSensorForm.configInfo = scope.configInfo;
            that.updateSensorForm.interval = scope.intervals;  
            that.updateSensorForm.id = scope.id;
        }, 
        async sureUpdateSensor(){
            let that = this;
            let updateSensoData = {
                'id':that.updateSensorForm.id,
                'deviceId':that.updateSensorForm.deviceName,
                'name':that.updateSensorForm.sensorName,
                'sensorTypeId':that.updateSensorForm.sensorID,
                'version':that.updateSensorForm.version,
                'configInfo':that.updateSensorForm.configInfo,
                'interval':that.updateSensorForm.interval,
            }
            let updateData = await updateSensor(updateSensoData);
            console.log(updateData)
            if(updateData.status == '200'){
                that.updateSensorDialogVisible = false;
                that.$notify({
                    title: '成功',
                    message: updateData.msg,
                    type: 'success'
                });
                 that.getsensorData()
            }else{
                that.updateSensorDialogVisible = false;
                that.$notify.error({
                    title: '失败',
                    message: updateData.msg,
                });
                 that.getsensorData()
            }
        },
        //删除传感器
        sensorDelete (data) {
            let that = this
            this.$confirm('此操作将删除此传感器, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            that.sureDeleteSensor(data);
            }).catch(() => {
            console.log('取消了删除')
            })
        },
        async sureDeleteSensor(scope){ 
            let that = this;
            let deleteSensoData = {
            'id':scope.id,
            }
            let delsj = await deleteSensor(deleteSensoData);
            console.log(delsj)
            if(delsj.status == '200'){
            that.$notify({
                title: '成功',
                message: delsj.msg,
                type: 'success'
            });
            that.getsensorData();
            }else{
            that.loading = false;
            that.$notify.error({
                    title: '失败',
                    message: delsj.msg,
                });
            that.getsensorData();
            }
        },
        //获取所有通讯信息
        async getinformationData(){
             let that = this;
             let informationData = {
                'pageSize':that.informationcurrentPage, //页数
                'pageNum':that.informationPageSize,//数量
                'name':'',
            }
            let newdata = await getinformationData(informationData) ;
            console.log(newdata)
            if(newdata.status == '200'){ 
                that.informationloading = false;   
                // that.informationTableData = newdata.rows;
                // that.informationtotal = newdata.total;
                let arr = newdata.rows;
                let newArr = [];
                arr.forEach(element =>{
                    let i = element.type;
                    if(i == 0){
                        element.infostate = '网关设备'
                    }else if(i == 1){
                        element.infostate = '终端设备'
                    }
                    newArr.push(element)
                    })
                that.informationTableData =newArr;
                that.informationtotal = newdata.total;
            }
        },
        //通讯快速查询
        async informationSelect(){
             let that = this;
             let informationData = {
                'pageSize':that.informationcurrentPage, //页数
                'pageNum':that.informationPageSize,//数量
                'name':that.informationSelectInput,
            }
            let newdata = await getinformationData(informationData) ;
            console.log(newdata)
            if(newdata.status == '200'){ 
                that.informationloading = false;   
                // that.informationTableData = newdata.rows;
                // that.informationtotal = newdata.total;
                let arr = newdata.rows;
                let newArr = [];
                arr.forEach(element =>{
                    let i = element.type;
                    if(i == 1){
                        element.infostate = '网关设备'
                    }else if(i == 2){
                        element.infostate = '终端设备'
                    }
                    newArr.push(element)
                    })
                that.informationTableData =newArr;
                that.informationtotal = newdata.total;
            }
        },
        //通讯新增
        async addInformation(){
            let that = this;
            that.addIndoDialogVisible = true;
            let devicedata = await getAllDevice();
            that.arrdeviceOptions = devicedata;
            that.addinfoForm.name = '';
            that.addinfoForm.deviceName = '';
            that.addinfoForm.type = '';
            that.addinfoForm.address = '';
            that.addinfoForm.port = '';
            that.addinfoForm.protocolId = '';
            that.addinfoForm.connString = '';
            that.addinfoForm.ext1 = '';
            that.addinfoForm.ext2 = '';
            that.addinfoForm.server = '';
            that.addinfoForm.serverPort = '';
        },
        infodeviceChange(val){
            let that = this;
            that.addinfoForm.deviceNameid = val;
            console.log(that.addinfoForm.deviceNameid)
        },
        async sureinfoAdd(){
            let that = this;
            let addinformationdata = {
                'name':that.addinfoForm.name,
                'device_id':that.addinfoForm.deviceNameid,
                'type':that.addinfoForm.type,
                'address':that.addinfoForm.address,
                'port':that.addinfoForm.port,
                'protocolId':that.addinfoForm.protocolId,
                'connString':that.addinfoForm.connString,
                'ext1':that.addinfoForm.ext1,
                'ext2':that.addinfoForm.ext2,
                'server':that.addinfoForm.server,
                'serverPort':that.addinfoForm.serverPort,
            } 
            let addinfodata = await addinformation(addinformationdata)
            console.log(addinfodata);
            if(addinfodata.status == '200'){
                that.addIndoDialogVisible = false;
                that.$notify({
                    title: '成功',
                    message: addinfodata.msg,
                    type: 'success'
                });
                 that.getinformationData()
            }else{
                that.addIndoDialogVisible = false;
                that.$notify.error({
                    title: '失败',
                    message: addinfodata.msg,
                });
                 that.getinformationData()
            }
        },
        //通讯详情
        informationDetail(scope){
            let that = this;
            console.log(scope);
            that.infoDialogFormVisible = true;
            that.infoDetailForm.name = scope.name;
            that.infoDetailForm.deviceName = scope.deviceComm.device.name;
            that.infoDetailForm.type = scope.infostate;
            that.infoDetailForm.address = scope.address;
            that.infoDetailForm.port = scope.port;
            that.infoDetailForm.protocolId = scope.protocolId;
            that.infoDetailForm.connString = scope.connString;
            that.infoDetailForm.ext1 = scope.ext1;
            that.infoDetailForm.ext2 = scope.ext2;
            that.infoDetailForm.server = scope.server;
            that.infoDetailForm.serverPort = scope.serverPort;
        },
        //通讯修改
        async informationUpdate(scope){
            let that = this;
            console.log(scope);
            that.updateIndoDialogVisible = true;
            let devicedata = await getAllDevice();
            that.updatearrdeviceOptions = devicedata;
            that.updateinfoForm.name = scope.name;
            that.updateinfoForm.deviceName = scope.deviceComm.device.id;
            that.updateinfoForm.type = scope.type.toString();
            that.updateinfoForm.address = scope.address;
            that.updateinfoForm.port = scope.port;
            that.updateinfoForm.protocolId = scope.protocolId;
            that.updateinfoForm.connString = scope.connString;
            that.updateinfoForm.ext1 = scope.ext1;
            that.updateinfoForm.ext2 = scope.ext2;
            that.updateinfoForm.server = scope.server;
            that.updateinfoForm.serverPort = scope.serverPort;
            that.updateinfoForm.id = scope.id;
        },
        updateinfodeviceChange(val){
            let that = this;
            that.updateinfoForm.deviceNameid = val;
        },
        async sureinfoUpdate(){
            let that = this;
            let updateinformationdata = {
                'id':that.updateinfoForm.id,
                'name':that.updateinfoForm.name,
                'device_id':that.updateinfoForm.deviceNameid,
                'type':that.updateinfoForm.type,
                'address':that.updateinfoForm.address,
                'port':that.updateinfoForm.port,
                'protocolId':that.updateinfoForm.protocolId,
                'connString':that.updateinfoForm.connString,
                'ext1':that.updateinfoForm.ext1,
                'ext2':that.updateinfoForm.ext2,
                'server':that.updateinfoForm.server,
                'serverPort':that.updateinfoForm.serverPort,
            }
            let updateinfodata = await updateinformation(updateinformationdata);
            console.log(updateinfodata);
            if(updateinfodata.status == '200'){
                that.updateIndoDialogVisible = false;
                that.$notify({
                    title: '成功',
                    message: updateinfodata.msg,
                    type: 'success'
                });
                 that.getinformationData()
            }else{
                that.updateIndoDialogVisible = false;
                that.$notify.error({
                    title: '失败',
                    message: updateinfodata.msg,
                });
                 that.getinformationData()
            }
        },
        //通讯删除
        informationDelete (data) {
            let that = this
            this.$confirm('此操作将删除本条通讯信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            that.sureDeleteinformation(data);
            }).catch(() => {
            console.log('取消了删除')
            })
        },
        async sureDeleteinformation(scope){ 
            let that = this;
            let deleteinformationdata = {
            'id':scope.id,
            }
            let delsj = await deleteinformation(deleteinformationdata);
            console.log(delsj)
            if(delsj.status == '200'){
            that.$notify({
                title: '成功',
                message: delsj.msg,
                type: 'success'
            });
            that.getinformationData();
            }else{
            that.loading = false;
            that.$notify.error({
                    title: '失败',
                    message: delsj.msg,
                });
            that.getinformationData();
            }
        },
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
     width: 100%;
     .span{
         float: left;
     }
     .span1{
         float: right;
     }
}
</style>
