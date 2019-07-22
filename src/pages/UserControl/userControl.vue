<template>
  <section>
    <Row>
      <Col :span="4">
      <span>您的用户等级为 {{userInfo.role}}</span>
      <span>最多添加{{userInfo.creatLimit}}个用户,当前添加{{userInfo.creatNumber}}</span>
      </Col>
    </Row>
    <br>
    <Row :gutter="12">
      <Col :span="1">
      <Button type="success" size="small">添加用户</Button>
      </Col>
      <Col :span="1">
      <Button type="error" size="small">批量删除</Button>
      </Col>
    </Row>
    <br>
    <Table border :columns="columns12" :data="userList">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
        <Button type="error" size="small" @click="remove(index)">Delete</Button>
      </template>
    </Table>
		<Modal
			v-model="modalShow"
			:title="addUser?'添加用户':'修改用户'"
			:loading="loading"
			@on-ok="submit"
			>
			
		</Modal>
		
  </section>
</template>
<script>
  import { mapGetters } from "vuex";
  import { userApi } from "@/api";
  export default {
    data() {
      return {
				modelShow:false,
				addUser:true,
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
      ...mapGetters({
        userInfo: state => state.userInfo
      })
    },
    mounted() {
      this.getSubUser();
    },
    methods: {
      show(index) {
        this.$Modal.info({
          title: "User Info",
          content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        });
      },
      remove(index) {
        this.data6.splice(index, 1);
      },
      getSubUser() {
        userApi.getSubUser().then(data => {
          this.userList = data;
        });
      }
    }
  };
</script>
<style lang="less">
</style>

