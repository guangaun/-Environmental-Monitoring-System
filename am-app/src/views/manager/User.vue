<!--
 * @Description: 我的tab
 * @Author: charles
 * @Date: 2021-12-14 20:42:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-22 15:13:22
-->

<template>
  <div class="user">
    <div class="header">
      <div class="photo">
        <van-uploader 
      multiple 
      :max-count="1" 
      result-type="file"
      :after-read="afterRead" >
      <!--默认头像-->
       <img :src="info.user_face" alt="" v-if="info.user_face"/>
           <img src="../../assets/mxc.jpg" alt="" v-else>
      </van-uploader>
      </div>
      <div class="name">{{info.name}}</div>
    </div>
    <van-cell-group>
      <van-cell title="用户名" :value="userInfo.username" />
      <van-cell title="姓名" :value="userInfo.realname" />
      <van-cell title="性别"   :value="userInfo.gender=='male'?'男':'女'"/>
      <van-cell title="电话号码"  :value="userInfo.telephone"/>
      <van-cell title="出生日期"  :value="userInfo.birth | datefmt2('YYYY-MM-DD')"/>
    </van-cell-group>
    <van-cell title="所有订单" is-link to="/manager/order" />
    <div class="btn" @click="logoutHandler"> 退出登录 </div>
    <div class="btn" @click="logoutHandler"> 切换账号 </div>
  </div>
</template>
<script>
import {patch, get} from '../../http/axios';
import {Toast}from 'vant';
import axios from 'axios'
import {mapState, mapActions} from 'vuex'
export default {
  data() {
    return {
      userInfo:{},
    }
    },
    created(){
      this.getUserInfo()
  },
  methods:{
    getUserInfo(){
    get("/user/getInfo").then(res =>{
      if(res && res.status==200 && res.data){
        this.userInfo = res.data
      }
    })
  },
    ...mapActions('user',['logout','getInfo']),
    logoutHandler(){
      this.logout().then(()=>{
        this.$router.push({path:'/login'})
      });
    },
    // 上传图片
    afterRead(file){
      file.status = "uploading";
      file.message = "上传中...";
      // 将文件上传至服务器测试
      let url = "http://121.199.29.84:8001/file/upload";
      let params = new FormData();
      params.append("file", file.file);
      axios.post(url, params, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(response => {
        //更新用户头像
        file.status = "success";
        //新头像地址
        let user_face = 'http://121.199.29.84:8888/group1/'+response.data.data.id;
        let params={
          id:this.info.id+"",
          user_face
        }
        let url="/user/updateUserFace"
        patch(url,params).then(resp =>{
          Toast.success(resp.message)
          //刷新用户信息
          this.getInfo();
        })
      })
      .catch(error => {
        file.status = "failed";
        file.message = "上传失败!";
        Toast("图片上传失败!:" + error + " 请返回重新上传!");
      });
    }
  },
  computed:{
    ...mapState("user",["info"])
  },
}
</script>

<style scoped>
.header {
  padding-top: 46px;
  text-align: center;
  background: #1659a0;
  margin-bottom: 2em;
}

.header .photo {
  margin: 0 auto;
  width: 20em;
  height: 20em;
  border-radius: 100%;
  box-sizing: border-box;
  overflow:hidden;
  padding: 1em;
}
.header .name {
  line-height: 3em;
  font-size: 300px;
  color: #ffffff;

}
.header .photo img {
 width: 200px;
 height: 200px;
 border-radius: 50%;
}

.btn {
  width: 90%;
  margin: 1em auto;
  line-height: 3em;
  text-align: center;
  border: 1px solid #16408f;
  border-radius: 1.5em;
  background: #4580c0;
  color: rgb(36, 95, 75);
}

</style>
