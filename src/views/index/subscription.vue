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
        <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                :default-expanded-keys="[1]"
                :default-checked-keys="checkedlist"
                :props="defaultProps"
                class="mt-2"
                @check="handleCheckChange"
        />


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


    export default {
        name: "subscription",
        data() {
            return {
                data: [],
                checkedlist: [],
                defaultProps: {
                    children: 'children',
                    label: 'label',
                },
                dialogFormVisible: false,
                form: {
                    name: '',
                },
                formLabelWidth: '100px',

            };
        },
        mounted() {


        },
        created() {
          this.getSources()
        },
        methods: {
          getSources() {
              getSource()
                  .then((res) => {
                    // console.log(res)
                    this.data = res.category
                    this.checkedlist = res.sub

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