<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" size="small" @click="toAdd">新增</el-button>
    <!-- <el-button type="danger" size="small" @click="batchDelete">批量删除</el-button> -->
    <!-- /按钮 -->
    <!-- 表格 -->
    <el-table :data="categories" size="mini" @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column type="index" :index="1" label="序号" width="55" />
      <el-table-column prop="name" label="名称" width="100"/>
      <el-table-column prop="no" label="排序号" width="85" align="center"/>
      <el-table-column prop="parentId" label="父栏目" width="100"/>
      <el-table-column prop="description" label="描述" />
      <el-table-column fixed="right" label="操作" align="center" width="100" >
        <template slot-scope="scope">
          <a type="text" size="small" @click.prevent="toEdit(scope.row)">编辑</a>
          <a type="text" size="small" @click.prevent="toDelete(scope.row.id)">删除</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible">
      <el-form ref="category_form" :model="form" :rules="rules">
        <el-form-item label="栏目名称" label-width="80px" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="父栏目" label-width="80px">
          <el-select v-model="form.parentId" clearable placeholder="请选择父栏目">
            <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="序号" label-width="80px">
          <el-input v-model="form.no" autocomplete="off" />
        </el-form-item>
        <el-form-item label="栏目介绍" label-width="80px">
          <el-input v-model="form.description" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>
<script>
import request from '@/utils/request'
import qs from 'querystring'
export default {
  // 数据
  data() {
    return {
      visible: false,
      loading:false,
      form: {},
      title: '新增栏目',
      categories: [],
      ids: [],
      rules: {
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'change' }
        ]
      }
    }
  },
  // 生命周期
  created() {
    this.reloadData()
  },
  // 方法
  methods: {
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id)
    },
    reloadData() {
      this.loading = true;
      const url = '/category/findAll'
      request.get(url).then(response => {
        this.categories = response.data
        this.loading = false;
      })
    },
    toAdd() {
      this.form = {}
      this.visible = true
    },
    toEdit(record) {
      // 将要编辑的数据绑定表单中
      this.form = record
      this.visible = true
    },
    batchDelete() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const url = '/category/batchDelete'
          request.request({
            url,
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({ ids: this.ids })
          })
            .then(response => {
              this.$message({ type: 'success', message: response.message })
              // 重载数据
              this.reloadData()
            })
        })
    },
    toDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const url = '/category/deleteById'
        request.get(url, { params: { id }})
          .then(response => {
            this.$message({
              type: 'success',
              message: response.message
            })
            // 重载数据
            this.reloadData()
          })
      })
    },
    submitForm() {
      this.$refs['category_form'].validate((valid) => {
        if (valid) {
          // 交互
          request.request({
            url: '/category/saveOrUpdate',
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(this.form)
          })
            .then(response => {
            // 提示成功
              this.$message({
                message: response.message,
                type: 'success'
              })
              // 关闭模态
              this.visible = false
              // 重载数据
              this.reloadData()
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
