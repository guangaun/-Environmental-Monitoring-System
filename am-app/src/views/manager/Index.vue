<!--
 * @Description: 首页tab
 * @Author: charles
 * @Date: 2021-12-14 20:42:55
 * @LastEditors: charles
 * @LastEditTime: 2021-12-14 21:18:25
-->
<template>
  <!-- 后台管理总页面 -->
  <div class="manager">
    <!-- 用于接受管理页面，首页，订单页，我的页面 -->
    <router-view></router-view>
    <van-tabbar route active-color="#1659a0">
      <van-tabbar-item icon="home-o" to="/manager/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/manager/order">订单</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/manager/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  computed:{
    ...mapState('user',['info'])
  },
  methods:{
    
  }
}
</script>