<!--
 * @Description: 工单列表
 * @Author: charles
 * @Date: 2021-12-14 22:07:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 20:04:06
-->
<template>
  <div>   
    <el-table size="small" :data="workorderData.list" border>
      <el-table-column label="序号" type="index" :index="1" align="center"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="slot">
          <ul style="display:flex">
            <li style="height:200px; overflow:hidden" v-for="p in slot.row.end_photos" :key="p">
              <img style="width:100%" :src="p" alt="">
            </li>
          </ul>
        </template>    
      </el-table-column>
      <el-table-column label="工程名称" prop="engineer_name" min-width="200" align="center"></el-table-column>
      <el-table-column label="设备名称" prop="device_name" width="150" align="center"></el-table-column>
      <el-table-column label="维修工" prop="account_name" width="120" align="center">
        <template slot-scope="scope">
          <span style="font-size: small" v-if="scope.row.account_name == 'null'">无</span>
          <span style="font-size: small" v-else>{{scope.row.account_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="问题描述" prop="bill_why" width="200" align="center"></el-table-column>
      <el-table-column label="完成记录" prop="finish_note" width="130" align="center"></el-table-column>
      <el-table-column label="下单时间" prop="create_time" width="150" align="center"></el-table-column>
      <el-table-column label="状态" prop="status" align="center">
        <template slot-scope="scope">
          <el-tag type="success" size="mini" v-if="scope.row.status == '已完成'">{{scope.row.status}}</el-tag>
          <el-tag type="warning" size="mini" v-else-if="scope.row.status == '进行中'">{{scope.row.status}}</el-tag>
          <el-tag type="danger" size="mini" v-else>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="工单类型" prop="type" width="100" align="center">
        <template slot-scope="scope">
          <el-tag type="success" size="mini" v-if="scope.row.type == '安装'">{{scope.row.type}}</el-tag>
          <el-tag type="danger" size="mini" v-else-if="scope.row.type == '拆机'">{{scope.row.type}}</el-tag>
          <el-tag type="info" size="mini" v-else>{{scope.row.type}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toDetailsHandler(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="toCancelHandler(scope.row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      hide-on-single-page
      :total="+workorderData.total"
      :current-page="+workorderData.page"
      :page-size="+workorderData.pageSize"
      @current-change="pageChangeHandler"
    ></el-pagination>
    
  </div>
</template>

<script>
import {get,postJSON} from '@/utils/request'
export default {
  data(){
    return {
      params:{
        page:1,
        pageSize:10
      },
      title:"",
      visible:false,
      form:{},
      workorderData:{list:[]}
    }
  },
  mounted() {
    this.loadWorkorders();
  },
  methods:{
    //工单详情
    toDetailsHandler(row){
      this.$router.push({
        path:'/am/order/Details',
        query:row
      })
    },
    // 取消工单
    toCancelHandler(row){
      let url = "/workorder/cancelOrder"
        get(url,{id:row.id}).then(resp =>{
        this.$message({type:"success",message:resp.message});
        this.loadWorkorders();          
      })
    },
    queryHandler(){
      this.params.page = 1;
      this.loadWorkorders();
    },
    
    // 加载工单数据
    loadWorkorders(){
      let url = "/workorder/pageQuery";
      get(url,this.params).then(resp => {
        this.workorderData = resp.data;
      })
    },
    pageChangeHandler(page){
      this.params.page = page;
      this.loadWorkorders();
    }
  }
}
</script>