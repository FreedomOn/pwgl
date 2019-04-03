<template>
  <div class="contnet">
    <div class="app-container">
    <div class="tree">
      <el-tree 
        :data="data2"
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        @node-click="handleNodeClick"
        :props="defaultProps">
      </el-tree>
      <el-tree
        :data="data5"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        @node-click="grouphandleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <!-- <span>
            <el-button
              type="text"
              size="mini"
              @click="() => append(data)">
              添加分组
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)">
              删除
            </el-button>
          </span> -->
        </span>
      </el-tree>
    </div>
    <div class="body">
      <div class="header">
         <span>
          <el-button type="primary" size='small' @click="facilityAdd()">设备添加</el-button>
          <el-button type="primary" size='small'>批量操作</el-button>
        </span> 
        <span class="span1">
          <el-input v-model="selsctInput"  placeholder="请输入搜索内容" style="width:400px"></el-input>
          <el-button type="primary" icon="el-icon-search"  size='small' @click="select()">快速搜索</el-button>
        </span>
      </div>
      <div class="content">
         <el-table
          :data="tableData"
          stripe
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          height="420px"
          @selection-change="handleSelectionChange"
          v-loading="loading"
          element-loading-text="拼命加载中">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="date"
            label="设备名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="date"
            label="类型"
            width="120"
           >
          </el-table-column>
           <el-table-column
            prop="date"
            label="版本"
             width="120"
            >
          </el-table-column>
           <el-table-column
            prop="date"
            label="状态"
             width="120"
            >
          </el-table-column>
           <el-table-column
            prop="date"
             width="120"
            label="更新时间"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            label="型号">
          </el-table-column>
            <el-table-column
            prop="name"
            label="分组">
          </el-table-column>
          <el-table-column
          fixed="right"
          label="操作"
          width="300"
          >
          <template slot-scope="scope">
            <el-button @click="mangeDetail(scope.row)" type="primary" plain size="small">详情</el-button>
            <el-button @click="mangeUpdata(scope.row)" type="primary" plain size="small">状态</el-button>
            <el-button @click="mangeDelete(scope.row)" type="primary" plain  size="small">部署</el-button>
          </template>
          </el-table-column>
        </el-table>



      </div>
    </div>
    
    <el-dialog
      title="请输入分组名称"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input v-model="groupinput" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureGroup">确 定</el-button>
      </span>
    </el-dialog>
     <el-dialog
      title="添加网络设备"
      :visible.sync="adddialogVisible"
      width="60%"
      :before-close="handleClose">
      <el-form :inline="true" :model="addNetwork" ref="addNetwork" >
        <div class="addStyle">
          <span>基本信息：</span>
           <el-row>
              <el-col :span="12">
                  <el-form-item label="设备类型" prop='addNetwork'>
                  <el-input v-model="addNetwork.mangeState" clearable placeholder="请输入..."></el-input>
                  </el-form-item> 
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                <el-form-item label="设备类型" prop='addNetwork'>
                      <el-radio v-model="addNetwork.radio" label="1">网关设备</el-radio>
                      <el-radio v-model="addNetwork.radio" label="2">终端设备</el-radio>
                  </el-form-item> 
              </el-col>
          </el-row>
           <el-row>
              <el-col :span="12">
                <el-form-item label="分组" prop='addNetwork'>
                    <el-select v-model="addNetwork.value" placeholder="请选择">
                    <el-option
                      v-for="item in addNetwork.selectGroup"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item> 
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                  <el-form-item label="经度" prop='addNetwork'>
                  <el-input v-model="addNetwork.jingdu" clearable placeholder="请输入..."></el-input>
                  </el-form-item> 
              </el-col>
              <el-col :span="12">
                  <el-form-item label="维度" prop='addNetwork'>
                  <el-input v-model="addNetwork.weidu" clearable placeholder="请输入..."></el-input>
                  </el-form-item> 
              </el-col>
          </el-row>
           <el-row>
              <el-col :span="12">
                <el-form-item label="描述" prop='addNetwork'>
                      <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      style="width:550px"
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
                  <el-form-item label="固件版本" prop='addNetwork'>
                  <el-input v-model="addNetwork.firmware" clearable placeholder="请输入..."></el-input>
                  </el-form-item> 
              </el-col>
               <el-col :span="12">
                  <el-form-item label="硬件信息" prop='addNetwork'>
                  <el-input v-model="addNetwork.hardware" clearable placeholder="请输入..."></el-input>
                  </el-form-item> 
              </el-col>
          </el-row>
           <el-row>
              <el-col :span="12">
                  <el-form-item  prop='addNetwork'>
                    <el-checkbox v-model="addNetwork.checked">容器支持</el-checkbox>
                  </el-form-item> 
              </el-col>
          </el-row>
            <el-row>
              <el-col :span="12">
                  <el-form-item label="容器版本" prop='addNetwork'>
                  <el-input v-model="addNetwork.container" clearable placeholder="请输入..."></el-input>
                  </el-form-item> 
              </el-col>
          </el-row>
         </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

let id=1000
export default {
  name: 'dashboard',
  mounted() {
    
  },
  methods: {
     handleNodeClick(data) {
        console.log(data);
      },
      grouphandleNodeClick(data) {
        console.log(data);
      },
    //设备添加
      facilityAdd:function(){
        let that = this;
        that.adddialogVisible = true;
      },
      sureAdd:function(){

      },
      append(data) {
        let that = this;
        that.groupinput = '';
        this.dialogVisible = true;
        that.testdata = data;
       
      },
      sureGroup:function(){
            let that = this;
            let test = that.groupinput
            that.test = test;
            that.dialogVisible = false;
            let data = that.testdata
            const newChild = { id: id++, label: that.test, children: [] };
            if (!data.children) {
              this.$set(data, 'children', []);
            }
          data.children.push(newChild);
            },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    
  },
  data () {
    const data = [
      {
        id:22,
        label:'设备分组',
        children:[{
          id: 1,
          label: '分组1',
          // children: [{
          //   id: 4,
          //   label: '分组1-1',
          //   children: [{
          //     id: 9,
          //     label: '分组 1-1-1'
          //   }, {
          //     id: 10,
          //     label: '分组 1-1-2'
          //   }]
          // }]
        }]
      },
     ]
    return {
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
        data2: [{
          id: 1,
          label: '所有设备',
          children: [{
            id: 4,
            label: '网管设备',
            children: [{
              id: 9,
              label: '在线'
            }, {
              id: 10,
              label: '离线'
            }]
          },{
            id: 2,
            label: '终端设备',
            children: [{
              id: 5,
              label: '在线'
            }, {
              id: 6,
              label: '离线'
            },{
              id: 7,
              label: '故障'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        data5: JSON.parse(JSON.stringify(data)),
        dialogVisible:false,
        groupinput:'',
        test:'',
        testdata:'',
        selsctInput:'',
        loading:false,
        multipleSelection: [],
        adddialogVisible:false,
        addNetwork:{
          mangeName:'',
          radio: '1',
          selectGroup: [{
            value: '选项1',
            label: '东区'
          }, {
            value: '选项2',
            label: '西区'
          }],
          jingdu:'',
          weidu:'',
          textarea:'',
          firmware:'',
          hardware:'',
          checked:false,
          container:"",
        },
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.contnet{
  padding-top: 10px;
  background: #efefef;
}
.app-container{
  overflow: hidden;
  background: #ffffff;
  // margin-top:25px;
 
  
}


  .tree{
    width: 20%;
    float: left;
    padding-left: 20px;
  }
  .body{
    width: 78%;
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
     width: 100%;
     margin-top: 30px
   }
  }
.addStyle{
  border: 1px solid black;
  border-bottom: none;
  padding: 10px 40px;
  span{
    font-size: 20px
  }
}
.addStyle1{
    border: 1px solid black;
    margin: 20px,20px;
    padding: 10px 40px;
    span{
    font-size: 20px
  }
}

</style>
<style>
.el-input .el-input__inner{
    height: 32px;
    line-height: 32px;
  }
</style>
