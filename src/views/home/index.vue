<template>
  <div class="dashboard-container">
    <div class="dashboard-bg" style="padding:20px">
       <div class="dashboard-text">欢迎您:{{name}}  
            <span style="margin-left:30px;">岗位：{{uer_type}}</span>
            <span style="margin-left:30px;"> 单位：{{user_orgname}}</span>
        </div>
    </div>
    <div class="dashboard-bg">
      <ve-histogram :data="chartData"></ve-histogram>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  name: 'dashboard',
  mounted() {
    
  },
  methods: {
    
  },
  data () {
    return {
      chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
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

</style>
