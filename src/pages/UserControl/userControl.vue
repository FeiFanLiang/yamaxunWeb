<template>
  <section>
    <Row>
      <Col :span="4">
      <span>您的用户等级为 {{userInfo.roleLabel}} </span>
      <span>最多添加{{userInfo.creatLimit}}个用户 当前添加{{userInfo.creatNumber}}</span>
      </Col>
    </Row>
    <br>
    <Row :gutter="12">
      <Col :span="1">
      <Button type="success" size="small" @click="add">添加用户</Button>
      </Col>
      <Col :span="1">
      <Button type="error" size="small" @click="del">批量删除</Button>
      </Col>
    </Row>
    <br>
    <Table border :columns="columns12" :data="userList" on-selection-change="seleChange">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row,index)">编辑</Button>
        <Button type="info" size="small" @click="merListFromAuth(row,index)">查看发布</Button>
        <Button type="error" size="small" @click="remove(row,index)">删除</Button>
      </template>
    </Table>
		<Modal
			v-model="modalShow"
			:title="addUser?'添加用户':'修改用户'"
			:loading="loading"
			@on-ok="submit"
			>
      <template v-if="addUser">
        <Form :model="newUser" ref="newForm" :rules="validRules">
          <Form-Item label="用户名" prop="username">
            <Input v-model="newUser.username" type="text" placeholder="用户名"></Input>
          </Form-Item>
          <Form-Item label="密码" prop="password">
            <Input v-model="newUser.password" type="text" placeholder="密码"></Input>
          </Form-Item>
          <Form-Item label="品牌名称" prop="brand">
            <Input v-model="newUser.brand" type="text" placeholder="品牌"></Input>
          </Form-Item>
          <Form-Item label="用户等级" prop="role">
            <Select v-model="newUser.role">
              <Option v-for="(item,index) of currentUserCreatRole" :label="item.label" :value="item.value" :key="index"></Option>
            </Select>
          </Form-Item>
        </Form>
      </template>
      <template v-else>
      <Form :model="editUser" ref="editForm" :rules="validRules">
          <Form-Item label="用户名">
            <Input v-model="editUser.username" type="text" placeholder="用户名" disabled></Input>
          </Form-Item>
          <Form-Item label="密码" prop="password">
            <Input v-model="editUser.password" type="text" placeholder="密码"></Input>
          </Form-Item>
          <Form-Item label="品牌名称" prop="brand">
            <Input v-model="editUser.brand" type="text" placeholder="品牌"></Input>
          </Form-Item>
          <Form-Item label="用户等级" prop="role">
            <Select v-model="editUser.role">
              <Option v-for="(item,index) of roleOptions" :label="item.label" :value="item.value" :key="index"></Option>
            </Select>
          </Form-Item>
        </Form>
      </template>
			<Form>
        
      </Form>
		</Modal>
		
  </section>
</template>
<script>

  import { mapGetters, mapState } from "vuex";
  import { userApi } from "@/api";
  export default {
    data() {
      return {
        loading:false,
				modalShow:false,
        addUser:true,
        roleOptions:[
          {label:'二级代理商',value:1},
          {label:'一级代理商',value:2},
          {label:'商户',value:0}
        ],
        selecUsers:[],
        newUser:{
          username:"",
          password:'',
          brand:'',
          role:''
        },
        editUser:{
          username:'',
          password:"",
          brand:"",
          role:'',
          auth:true
        },
          validRules: {
            username:[
              {required:true,message:"请输入用户名",trigger:'blur'},
              {
            type: "string",
            min: 6,
            max: 12,
            message: "请输入6-12位数用户名",
            trigger: "blur"
          }
            ],
            password:[
              {required:true,message:'请输入密码',trigger:'blur'},
              {
            type: "string",
            min: 6,
            max: 12,
            message: "请输入6-12位数密码",
            trigger: "blur"
          }
            ],
         
          brand: [
            {
              required: true,
              message: "请输入品牌名称",
              trigger: "blur"
            },
            {
              type: "string",
              min: 1
            }
          ],
          role:[
            {
              required:true,
              type:'number',
              trigger:'change'
            }
          ]
        },
        columns12: [
          {
            type: "selection",
            width: 60,
            alight: "center"
          },
          {
            title: "用户名",
            key: "username"
          },
          {
            title: "品牌名称",
            key: "brand"
          },
          {
            title:'用户权限',
            key:'roleLabel'
          },
          {
            title: "创建时间",
            key: "formatCreatTime"
          },
          
          {
            title: "操作",
            slot: "action",
            width: 250,
            align: "center"
          }
        ],
        userList: []
      };
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo
      }),
      currentUserCreatRole(){
        return this.roleOptions.filter(el => el.value < this.userInfo.role)
      }
    },
    mounted() {
      this.getSubUser();
    },
    methods: {
      merListFromAuth(row){
        this.$router.push({
          name:'我的商品',
          query:{
            user:row.username,
            auth:true
          }
        })
      },
      seleChange(val){
        this.selecUsers = val
      },
      async add(){
        this.addUser = true;
        this.modalShow = true;
      },
      async del(){
        const PromiseArr = this.selecUsers.map(el => {
          const params = {
            username:el.username
          }
          return userApi.deletUserFromAuth(params)
        })
        await Promise.all(PromiseArr)
        this.$Message.success('删除成功')
        this.getSubUser()
      },
     
      edit(row,index) {
        for(let i in row){
          if(i && this.editUser[i] !== undefined){
            this.editUser[i] = row[i]
          }
        }
        console.log(this.editUser)
        this.addUser = false
        this.modalShow = true
      },
      remove(row,index) {
        const params = {
          username:row.username
        }
        userApi.deletUserFromAuth(params).then((res) => {
          this.userList.splice(index,1)
          this.$Message.success('删除成功')
        })
      },
      getSubUser() {
        userApi.getSubUser().then(res => {
          if(res.data.length){
            this.userList = res.data.map(el => {
              if(el.role == 0){
                el.roleLabel = '商家'
            }
            if(el.role == 1){
                el.roleLabel = '二级代理'
            }
            if(el.role == 2){
                el.roleLabel = '一级代理'
            }
            if(el.role == 10){
                el.roleLabel = '超级管理员'
            }
            el.formatCreatTime = new Date(el.creatTime).toLocaleString()
            return el
            })
          }
         console.log(this.userList)
        });
      },
      async submit(){
        let name,form
        if(this.addUser){
          name = 'newForm'
          form = this.newUser
        } else{
          name = 'editForm'
          form = this.editUser
        }
        this.$refs[name].validate( async (valid) => {
          let res
          this.loading = true
          if(!valid){
            this.$Message.error('信息填写错误')
            this.loading = false
            this.modalShow = false
            return
          }
          if(valid && !this.addUser){
           res = await userApi.updateUserFromAuth(form)
          }
          if(valid && this.addUser){
           res = await userApi.creatNewUserFromAuth(form)
          }
          
          if(res.code == 1){
            this.getSubUser()
            this.loading = false
            this.modalShow = false
            this.$Message.success('操作成功')
          }else{
            this.loading = false
            this.modalShow = false
            this.$Message.error(res.data)
          }
          
        })
      }
    }
  };
</script>
<style lang="less">
</style>

