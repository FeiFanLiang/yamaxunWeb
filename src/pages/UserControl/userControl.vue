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
    <Table border :columns="columns12" :data="userList">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row,index)">编辑</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
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
        </Form>
      </template>
      <template v-else>
      <Form :model="editUser" ref="editForm" :rules="validRules">
          <Form-Item label="用户名">
            <Input v-model="newUser.username" type="text" placeholder="用户名" disabled></Input>
          </Form-Item>
          <Form-Item label="密码" prop="password">
            <Input v-model="newUser.password" type="text" placeholder="密码"></Input>
          </Form-Item>
          <Form-Item label="品牌名称" prop="brand">
            <Input v-model="newUser.brand" type="text" placeholder="品牌"></Input>
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
				modelShow:false,
        addUser:true,
        newUser:{
          username:"",
          password:'',
          brand:''
        },
        editUser:{
          username:'',
          password:"",
          brand:"",
          auth:true
        },
          validRules: {
            username:[
              {required:true,message:"请输入用户名",trigger:'blur'}
            ],
            password:[
              {required:true,message:'请输入密码',trigger:'blur'}
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
            slot: "username"
          },
          {
            title: "品牌名称",
            key: "brand"
          },
          {
            title: "创建时间",
            key: "creatTime"
          },
          {
            title: "Action",
            slot: "action",
            width: 150,
            align: "center"
          }
        ],
        // data6: [
        //     {
        //         name: 'John Brown',
        //         age: 18,
        //         address: 'New York No. 1 Lake Park'
        //     },
        //     {
        //         name: 'Jim Green',
        //         age: 24,
        //         address: 'London No. 1 Lake Park'
        //     },
        //     {
        //         name: 'Joe Black',
        //         age: 30,
        //         address: 'Sydney No. 1 Lake Park'
        //     },
        //     {
        //         name: 'Jon Snow',
        //         age: 26,
        //         address: 'Ottawa No. 2 Lake Park'
        //     }
        // ]
        userList: []
      };
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo
      })
    },
    mounted() {
      this.getSubUser();
    },
    methods: {
      async add(){
        this.addUser = true;
        this.modelShow = true;
        
        
      },
      async del(){
        
      },
     
      edit(row,index) {
        debugger
        this.editUser = row
        this.addUser = false
        this.modelShow = true
      },
      remove(row,index) {
        const params = {
          username:row.username
        }
        userApi.deletUserFromAuth(params).then((res) => {
          this.data6.splice(index, 1);
          this.$Message.success('删除成功')
        })
      },
      getSubUser() {
        userApi.getSubUser().then(data => {
          this.userList = data;
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
        this.$refs[name].validate((valid) => {
          if(valid){
            userApi.updateUserFromAuth(form).then((res) => {
              this.$Message.success('操作成功')
            })
          }else{

          }
        })
      }
    }
  };
</script>
<style lang="less">
</style>

