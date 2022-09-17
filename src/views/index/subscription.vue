<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <span class="h2">訂閱列表</span>
        <!--                <el-button size="small" type="info" @click="dialogVisible = true">ADD</el-button>-->
        <el-button class="ml-2" @click="dialogFormVisible = true" type="info">ADD</el-button>

      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>


    <el-table :data="tableData" size="small">

      <el-table-column label="分類  ">
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>

      <el-table-column label="來源名稱">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>


      <el-table-column label="是否訂閱">
        <template slot-scope="scope">
          <span>{{ scope.row.is_subscription }}</span>
        </template>
      </el-table-column>

      <el-table-column label="啟用狀態">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>


      <el-table-column label="功能" v-if="username">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete
          </el-button>
        </template>
      </el-table-column>


    </el-table>


    <el-pagination
        :page-sizes="[5,10,20,50,100]"
        :page-size="pageSize"
        :pager-count="7"
        layout="total,sizes,prev, pager, next"
        :total="total"
        @current-change="handleIndexChange"
        @size-change="handleSizeChange"
        style="float: right;margin-top: 20px"
        class="pb-5"
    >
    </el-pagination>


    <el-dialog
        title="新增來源"
        width="60%"
        :visible.sync="dialogFormVisible"
        @close="form={}"
    >

      <el-form :model="form" ref="form">

        <el-form-item label="分類" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择" :style="{width:'100%'}">
            <el-option
                v-for="item in data"
                :key="item.id"
                :label="item.label"
                :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="名稱" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>




        <el-form-item label="URL" :label-width="formLabelWidth">
          <el-input v-model="form.url"></el-input>
        </el-form-item>

      </el-form>


      <div slot="footer" class="dialog-footer center">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        <!--                   <el-button type="primary" @click="submitForm('form')">提交</el-button>-->
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {updateUserProfileSource, addCategory, getSource} from '@/api/common'
import store from "@/store";


export default {
  name: "subscription",
  data() {
    return {
      data: [],
      total: 0,
      pageSize: 10,
      page: 1,
      checkedlist: [],
      tableData: [],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      dialogFormVisible: false,
      form: {
        name: '',
      },
      formLabelWidth: '100px',
      filterform: {},
      username: ""
    };
  },
  mounted() {


  },
  created() {
    this.getSources(this.page, this.pageSize)
    this.username = store.getters.username
  },
  methods: {
    // 分頁
    handleIndexChange(p) {
      this.page = p
      this.getSources(this.page, this.pageSize, this.filterform)

    },
    handleSizeChange(size) {
      this.page = 1
      this.pageSize = size
      this.getSources(this.page, this.pageSize, this.filterform)
    },
    getSources(p, size, params) {
      getSource(p, size, params)
          .then((res) => {
            this.tableData = res.results
            this.total = res.count
          })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log('submit')
          // console.log(this.form)
          addCategory(this.form)
              .then((res) => {
                console.log('成功');
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success'
                });
              })
          this.getSources()

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    add(log) {
      return log
    },
    handleCheckChange(data, obj) {
      console.log(obj.checkedKeys)
      updateUserProfileSource({"checkedKeys": obj.checkedKeys})
          .then((res) => {
            console.log(res)
            this.$notify({
              title: '成功',
              message: '訂閱成功',
              type: 'success'
            });

          })
      // console.log(obj)

      // this.$emit('input', checkedKeys)
    }

  }
}
</script>

<style scoped>

</style>