<template>
  <div class="white-bg ">

    <!--        <el-card class="p-3" :body-style="{ padding: '0px' }" v-for="[]" :key="obj">-->
    <!--            <el-card class="p-3" :body-style="{ padding: '0px' }" v-for="(o, index) in 10" :key="o">-->

    <el-row class="m-2">

      <el-col :span="24" class="ml-3">

        <el-form :model="filterform">

          <label class="mr-2">內文</label>
          <el-input
              v-model="filterform.name"
              @change="handleFilterSubmit"
              size="mini"
              style="width: 20%"

          >

          </el-input>

          <label style="margin-left: 20px">分類</label>
          <el-select v-model="filterform.category"
                     class="ml-2 mr-2"
                     size="mini"
                     style="width: 20%"
                     @change="handleSourceSubmit"
          >
            <el-option key="" label="----" value=""/>
            <el-option
                :key="item.id"
                v-for="(item, index) in this.category"
                :label="item.name"
                :value="item.id"
            />

          </el-select>

          <label style="margin-left: 20px">來源</label>
          <el-select v-model="filterform.source"
                     class="ml-2 mr-2"
                     size="mini"
                     style="width: 20%"
                     @change="handleFilterSubmit"
          >
            <el-option key="" label="----" value=""/>
            <el-option
                :key="item.id"
                v-for="(item, index) in this.source"
                :label="item.name"
                :value="item.id"
            />

          </el-select>

        </el-form>
      </el-col>
    </el-row>

    <el-card class="p-3" shadow="never" :body-style="{ padding: '0px' }" v-for="(o) in obj_list" :key="o">
      <el-col :span="6">
        <el-image
            style="width: 150px; height: 100px"
            :src=o.thumbnail
            :fit="scale-down"
            lazy
        />
      </el-col>

      <el-col :span="18" class="pl-2">
        <h3><a :href="o.url">{{ o.name }}</a></h3>
        <p>{{ o.source }} {{ o.published_parsed }}</p>
        <span>{{ o.content }}</span>
      </el-col>

    </el-card>

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


  </div>
</template>

<script>
import {getNews, getNewsSelects} from '@/api/common'

export default {
  name: "rss",
  data() {
    return {
      obj_list: [],
      total: 0,
      pageSize: 10,
      page: 1,
      filterform: {
        name: '',
        category: '',
        source: ''
      },
      category: [],
      source: [],
    }
  },

  mounted() {


  },
  created() {
    this.getNewss(this.page, this.pageSize)
    this.getinit()
  },
  methods: {
    // 提交搜索
    handleFilterSubmit() {
        this.getNewss(this.page, this.pageSize, this.filterform)

    },

    // 提交搜索
    handleSourceSubmit() {
      this.filterform.source = ''

      if (this.filterform.category){
        getNewsSelects({category:this.filterform.category})
            .then((res) => {
              this.source = res
            })
      }else {
        this.source = ''
      }
      this.getNewss(this.page, this.pageSize, this.filterform)


    },

    // 分頁
    handleIndexChange(p) {
      this.page = p
      this.getNewss(this.page, this.pageSize, this.filterform)

    },
    handleSizeChange(size) {
      this.page = 1
      this.pageSize = size
      this.getNewss(this.page, this.pageSize, this.filterform)
    },
    getinit(){
      getNewsSelects('')
        .then((res) => {
          this.category = res
        })
    },
    // 請求News
    getNewss(p, size, params) {
      // if (p === '1') {
      //   p = 0
      // } else {
      //   p = p - 1
      // }
      // const page = p * this.pageSize

      getNews(p, size, params)
          .then((res) => {
            // console.log(res)
            this.obj_list = res.results
            this.total = res.count

          })

    },
  }

}
</script>

<style scoped>

</style>