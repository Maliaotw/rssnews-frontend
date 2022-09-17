<template>
  <div class="app-container">
    <el-row>


      <el-col :span="24">

        <el-form :model="filterform">


          <label style="margin-left: 20px">分類</label>
          <el-select v-model="filterform.category"
                     class="ml-2 mr-2"
                     size="mini"
                     style="width: 20%"
                     @change="handleFilterSubmit"
          >
            <el-option key="" label="----" value=""/>
            <el-option
                :key="item.id"
                v-for="(item, index) in this.category"
                :label="item.name"
                :value="item.id"
            />

          </el-select>

          <label style="margin-left: 20px"> 訂閱</label>
          <el-select v-model="filterform.subscription"
                     class="ml-2 mr-2"
                     size="mini"
                     style="width: 20%"
                     @change="handleFilterSubmit"
          >
            <el-option key="" label="----" value=""/>
            <el-option
                :key="item.id"
                v-for="(item, index) in this.subscription"
                :label="item.name"
                :value="item.id"
            />

          </el-select>



          <label style="margin-left: 20px">啟用</label>
          <el-select v-model="filterform.enable"
                     class="ml-2 mr-2"
                     size="mini"
                     style="width: 20%"
                     @change="handleFilterSubmit"
          >
            <el-option key="" label="----" value=""/>
            <el-option
                :key="item.id"
                v-for="(item, index) in this.enable"
                :label="item.name"
                :value="item.id"
            />

          </el-select>

        </el-form>
      </el-col>

      <el-col :span="24" class="mt-3">


        <!--                <el-button size="small" type="info" @click="dialogVisible = true">ADD</el-button>-->
        <el-button class="ml-2" @click="add" type="info" size="mini">ADD</el-button>
        <el-button class="ml-2" @click="dialogFormBatchEditVisible=true" type="info" size="mini">批量編輯</el-button>
        <el-button class="ml-2" @click="batch_delete" type="info" size="mini">批量刪除</el-button>

      </el-col>

    </el-row>



    <el-table
        :data="tableData"
        ref="mytable"
        size="small"
        @select="selectChange"
        @select-all="selectGateAll"
    >

      <el-table-column
          type="selection"

          tooltip-effect="dark"

      >
      </el-table-column>


      <el-table-column label="分類  ">
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>


      <el-table-column label="來源名稱">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.url" placement="bottom-start">
            <span>{{ scope.row.name }}</span>
          </el-tooltip>
        </template>
      </el-table-column>


      <el-table-column
          label="是否訂閱"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.is_subscription }}</span>
        </template>
      </el-table-column>

      <el-table-column
          label="啟用狀態"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.enable }}</span>
        </template>
      </el-table-column>


      <el-table-column
          label="功能"
          width="150"
      >
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
        :title=this.dialogTitle
        width="40%"
        :visible.sync="dialogFormVisible"
        @close="form={}"
    >

      <el-form :model="form" ref="form">

        <el-form-item label="分類" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择" :style="{width:'100%'}">
            <el-option
                v-for="item in this.category"
                :key="item.id"
                :label="item.name"
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

      <div>
        <span>測試結果</span>
        <span >{{this.testlog}}</span>
      </div>

      <div slot="footer" class="dialog-footer center">
        <!-- <el-button @click="dialogFormVisible=false">取 消</el-button>-->
        <el-button type="info" @click=checkSources(form.url)>測試來源</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>

      </div>
    </el-dialog>

    <el-dialog
        title="批量編輯"
        width="40%"
        :visible.sync="dialogFormBatchEditVisible"
        @close="batchform={}"
    >

      <el-form :model="batchform" ref="batchform">

        <el-form-item label="字段" :label-width="formLabelWidth">
          <el-select v-model="batchform.field" placeholder="请选择" :style="{width:'100%'}">
            <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="狀態" :label-width="formLabelWidth">
          <el-select v-model="batchform.to" placeholder="请选择" :style="{width:'100%'}">
            <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer center">
        <!-- <el-button @click="dialogFormVisible=false">取 消</el-button>-->
        <el-button type="primary" @click="submitBatchEditForm('batchform')">确 定</el-button>

      </div>
    </el-dialog>




  </div>
</template>

<script>
import {
  updateUserProfileSource,editCategory, addCategory, getSource,
  checkSource, getNewsSelects, getSourceSelects,detailCategory, sourceBatchDelete, sourceBatchEnable,SourceBatchEdit
} from '@/api/common'
import store from "@/store";


export default {
  name: "SourceUser",
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
      dialogTitle:'增加',
      dialogFormVisible: false,
      dialogFormBatchEditVisible: false,
      form: {
        name: '',
      },
      batchform: {},
      formLabelWidth: '100px',
      filterform: {},
      category :[],
      enable:[],
      subscription:[],
      select_list:[],
      testlog: "",
      options1: [
        {
          value: 'enable',
          label: '啟用'
        },
        {
          value: 'subscription',
          label: '訂閱'
        }
      ],
      options2: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 0,
          label: '否'
        }
      ],
    };
  },
  mounted() {


  },
  created() {
    this.getSources(this.page, this.pageSize)
    this.getinit()
  },
  methods: {
    // 增加
    add() {
      this.dialogTitle = '增加';
      this.form = {};
      this.dialogFormVisible = true;
    },

    //batch_enable
    batch_enable(){
      console.log('批量啟用')
      // this.$refs.mytable.rowKey()
      sourceBatchEnable({"ids":this.select_list})
          .then((res) => {
            this.$notify.success(res.message)
            this.$refs.mytable.clearSelection()
            this.getSources(this.page, this.pageSize, this.filterform)
          })


    },

    //batch_delete
    batch_delete(){

      this.getSources(this.page, this.pageSize, this.filterform)
    },

    // 編輯
    handleEdit(index, row) {
      this.dialogTitle = '編輯';
      detailCategory(row.id)
          .then((res) => {
            this.form = res;
          })

      this.dialogFormVisible = true;
    },

    // 提交搜索
    handleFilterSubmit() {
      this.getSources(this.page, this.pageSize, this.filterform)

    },

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
    checkSources(url){
      // console.log(url)
      checkSource(url)
        .then((res)=>{
           this.testlog = res.result
        })

    },
    submitForm(formName) {
      if (this.dialogTitle === '編輯') {
        this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log('submit')
          // console.log(this.form)
          editCategory(this.form.id,this.form)
              .then((res) => {
                console.log('成功');
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success'
                });
              })
          this.getSources(this.page, this.pageSize, this.filterform)

          } else {
            console.log('error submit!!');
            return false;
          }
        });

        this.iconFormVisible = false;
        return;
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log('submit')
          // console.log(this.form)
          addCategory(this.form)
              .then((res) => {
                console.log('成功');
                this.$notify({
                  title: '成功',
                  message: '新增成功',
                  type: 'success'
                });
              })
          this.getSources(this.page, this.pageSize, this.filterform)

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitBatchEditForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit')
          this.batchform.ids = this.select_list

          SourceBatchEdit(this.batchform)
              .then((res) => {
                this.$notify.success(res.message)
                this.$refs.mytable.clearSelection()
                this.getSources(this.page, this.pageSize, this.filterform)
                this.dialogFormBatchEditVisible = false;
              })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getinit(){
      getSourceSelects('')
          .then((res) => {
            this.category = res.category
            this.enable = res.enable
            this.subscription = res.subscription
          })
    },
    selectChange(row){
      var select_list = []
      row.filter(function(item){
        select_list.push(item.id)
      })
      this.select_list = select_list
      //console.log(`this.select_list, ${this.select_list}`)
    },
    selectGateAll(){

    }

  }
}
</script>

<style scoped>

</style>