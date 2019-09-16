<template>
  <section class="userInfo_wrap">
    <Row>
      <div class="msg_box">
        <div class="marquee">
          <div class="marquee_title">
            <Icon type="ios-megaphone" />
          </div>
          <div class="marquee_box">
            <ul class="marquee_list" :class="{marquee_top:animate}">
              <li v-for="(item, index) in marqueeList">
                <span>{{item}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Row>
    <Row style="padding:20px" type="flex" justify="start">
      <Col>
      <div style="padding: 10px;background: #f8f8f9">
        <Card title="个人面板" icon="ios-options" :padding="0" shadow style="width: 300px;">
          <CellGroup>
            <Cell title="用户名" :label="userInfo.username"></Cell>
            <Cell title="品牌信息" :label="userInfo.brand">
              <Button type="text" slot="extra" @click="changeBand">编辑品牌</Button>
            </Cell>
            <Cell title="用户等级" :label="userInfo.roleLabel">
              <Button type="text" slot="extra" v-if="userInfo.role" @click="subUserLink">用户管理</Button>
            </Cell>
            <Cell title="厂家名称" :label="userInfo.Manufacturer">
            </Cell>
            <Cell title="EAN前缀" :label="userInfo.eanPre">
            </Cell>
            <!-- <Cell title="商品数量" label="20" /> -->
            <Cell title="注册时间" :label="userInfo.formatCreatTime" />
            <Cell title="密码管理">
              <Button type="text" slot="extra" @click="changePass">修改密码</Button>
            </Cell>
          </CellGroup>
        </Card>
      </div>
      </Col>

    </Row>
    <Modal v-model="modalShow" :title="passwordChange?'修改密码':'修改品牌'" :loading="loading" @on-ok="submit">
      <Form :model="form" ref="form" :rules="validRules">
        <Row v-if="passwordChange">
          <Form-Item label="旧密码" prop="oldPass">
            <Input type="password" v-model="form.oldPass" placeholder="请输入旧密码"></Input>
          </Form-Item>
          <Form-Item label="新密码" prop="newPass">
            <Input type="password" v-model="form.newPass" placeholder="请输入新密码"></Input>
          </Form-Item>
        </Row>
        <template v-else>
          <Row>
          <Form-Item label="品牌名称" prop="newBrand">
            <Input type="text" v-model="form.newBrand" placeholder="请输入新的品牌名称"></Input>
          </Form-Item>
        </Row>
        <Row>
          <Form-Item label="厂家名称" prop="Manufacturer">
            <Input type="text" v-model="form.Manufacturer" placeholder="请输入新的厂家"></Input>
          </Form-Item>
        </Row>
         <Row>
          <Form-Item label="EAN前缀" prop="eanPre">
            <Input type="text" v-model="form.eanPre" placeholder="请输入新的3位数EAN前缀"></Input>
          </Form-Item>
        </Row>
        </template>
        
       
      </Form>
    </Modal>
  </section>
</template>
<script>
  import { mapState,mapMutations } from "vuex";
  import { userApi } from "@/api";
  export default {
    data() {
      return {
        animate: false,
        modalShow: false,
        passwordChange: false,
        loading: true,
        form: {
          oldPass: "",
          newPass: "",
          newBrand: "",
          eanPre:'',
          isPass: false,
          Manufacturer:''
        },
        marqueeList: [
          "尊敬的用户您好",
          "欢迎使用亚马逊后台管理系统",
          "您可以发布修改查看您的商品"
        ],
        validRules: {
          oldPass: [
            { required: true, message: "请输入您的密码", trigger: "blur" },
            {
              type: "string",
              min: 6,
              max: 12,
              message: "请输入6-12位密码"
            }
          ],
          newPass: [
            {
              required: true,
              message: "请输入您的新密码",
              trigger: "blur"
            },
            {
              type: "string",
              min: 6,
              max: 12,
              message: "请输入6-12位新密码"
            }
          ],
          newBrand: [
            {
              required: true,
              message: "请输入您的品牌名称",
              trigger: "blur"
            },
            {
              type: "string",
              min: 1
            }
          ],
          Manufacturer:[
            {
              required:true,
              message:'请输入厂家名称',
              trigger:'blur'
            },
            {
              type:'string',
              min:1
            }
          ],
          eanPre:[
            {
              required:true,
              message:'请输入ean前缀',
              trigger:'blur'
            },
            {
              type:'string',
              min:3,
              max:3
            }
          ]
        }
      };
    },

    created: function() {
      setInterval(this.showMarquee, 2000);
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo
      })
    },
    methods: {
      ...mapMutations(['updateUser']),
      subUserLink() {
        this.$router.push({
          name: "用户管理"
        });
      },
      showMarquee() {
        this.animate = true;
        setTimeout(() => {
          this.marqueeList.push(this.marqueeList[0]);
          this.marqueeList.shift();
          this.animate = false;
        }, 500);
      },
      async submit() {
        this.$refs["form"].validate(async valid => {
          if (valid) {
            this.loading = true;
            let res = await userApi.updateUser(this.form);
            if(res.code){
              this.$Message.success('修改成功')
              const res = await userApi.userInfo()
              sessionStorage.setItem('user',JSON.stringify(res.data))
              this.updateUser(res.data)
              this.modalShow = false
            }else{
              this.$Message.error(res.data)
            }
            this.loading = false;
          } else {
            this.$Messgae.error("您填写的信息错误,请修改后提交");
          }
        });
      },
      changePass() {
        this.modalShow = true;
        this.passwordChange = true;
        this.form.isPass = true;
        this.$refs["form"].resetFields();
      },
      changeBand() {
        this.modalShow = true;
        this.passwordChange = false;
        this.form.isPass = false;
        this.$refs["form"].resetFields();
      }
    }
  };
</script>
<style lang="less" scoped>
  .userInfo_wrap {
    .msg_box {
      width: 100%;
      color: #8d0077;
    }
    .marquee_title,
    ul,
    li {
      margin: 0;
      padding: 0;
      display: flex;
      box-sizing: border-box;
    }
    .marquee {
      width: 100%;
      height: 20px;
      align-items: center;
      display: flex;
      box-sizing: border-box;
    }

    .marquee_title {
      padding: 0 20px;
      height: 30px;
      font-size: 14px;
      align-items: center;
    }

    .marquee_box {
      display: block;
      position: relative;
      width: 60%;
      height: 30px;
      overflow: hidden;
    }

    .marquee_list {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
    .marquee_top {
      transition: all 0.5s;
      margin-top: -30px;
    }

    .marquee_list li {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      padding-left: 20px;
    }

    .marquee_list li span {
      padding: 0 2px;
    }

    .red {
      color: #ff0101;
    }
  }
</style>


