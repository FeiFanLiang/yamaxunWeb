<template>
  <section id="animation">
    <div class="form-container" v-show="login" @keypress.enter="submit">
      <div class="form-header">
        <div class="log-img">
          <img src="../../../static/cc.png" alt />
        </div>
        <h1>亚马逊通跨境电商</h1>
      </div>
      <Form ref="login_form" :model="form" class="form">
        <Row type="flex" justify="center">
          <Col span="16">
            <FormItem>
              <Input
                size="large"
                placeholder="请在此输入您的账号"
                type="text"
                clearable
                prefix="ios-contact"
                v-model.trim="form.username"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="16">
            <FormItem>
              <Input
                size="large"
                placeholder="请在此输入您的密码"
                type="password"
                prefix="ios-lock-outline"
                clearable
                v-model.trim="form.password"
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="form_submit">
        <Button type="success" long @click="submit">登录</Button>
        <Button type="text" @click="login=false">注册账号</Button>
      </div>
    </div>
    <div class="form-container" v-show="!login" @keypress.enter="regist">
      <Form ref="newUserForm" :model="newUserForm" class="form" :rules="new_rules">
        <Row type="flex" justify="center">
          <Col span="16">
            <FormItem prop="username">
              <Input
                size="large"
                placeholder="6-12位用户名"
                type="text"
                clearable
                prefix="ios-contact"
                v-model="newUserForm.username"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="16">
            <FormItem prop="password">
              <Input
                size="large"
                placeholder="6-12位密码"
                type="password"
                prefix="ios-lock-outline"
                clearable
                v-model.trim="newUserForm.password"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="16">
            <FormItem prop="brand">
              <Input
                size="large"
                placeholder="您要入驻的品牌名称"
                type="text"
                prefix="ios-lock-outline"
                clearable
                v-model.trim="newUserForm.brand"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="16">
            <FormItem prop="eanPre">
              <Input
                size="large"
                placeholder="您的EAN前缀"
                type="text"
                prefix="ios-lock-outline"
                clearable
                v-model.trim="newUserForm.eanPre"
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="form_submit">
        <Button type="success" long @click="regist('newUserForm')">注册</Button>
        <Button type="text" @click="login=true">已有账号？</Button>
      </div>
    </div>
  </section>
</template>
<script>
import {mapMutations} from 'vuex';
import { userApi } from "@/api";
export default {
  data() {
    return {
      login: true,
      form: {
        username: "",
        password: ""
      },
      newUserForm: {
        username: "",
        password: "",
        brand: "",
        eanPre:''
      },
      new_rules: {
        username: [
          { required: true, message: "请输入您的用户名", trigger: "blur" },
          {
            type: "string",
            min: 6,
            max: 12,
            message: "请输入6-12位数用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入您的密码",
            trigger: "blur"
          },
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
            message: "请输入您的入驻品牌名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapMutations([
      'updateUser'
    ]),
    async submit() {
      if (this.form.username && this.form.password) {
				userApi.login(this.form).then((res) => {
					if(res.code === 0){
						this.$Message.error("用户名或密码错误！请检查您的输入");
					}else if(res.code == 1){
            this.updateInfo()
						this.$router.push({
							path:"/"
						})
					}
				})
      } else {
        this.$Message.error("用户名或密码不能为空");
      }
    },
    async updateInfo(){
      const res2 = await userApi.userInfo()
      sessionStorage.setItem('user',JSON.stringify(res2.data))
      this.updateUser(res2.data)
    },
    async regist(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          userApi.regist(this.newUserForm).then((res) => {
            if(res.code === 1){
              this.$Message.success('注册成功！')
              this.login = true
            }else if(res.code === 0){
              this.$Message.success(res.data)
            }
            
          })
        } else {
          this.$Message.error("您的输入信息有误,请检查后重试");
        }
      });
    }
  }
};
</script>
<style lang="css" scoped>
.form_submit {
  display: inline-flex;
  justify-content: center;
  width: 336px;
}
.log-img {
  width: 80px;
  height: 80px;
}
.log-img img {
  display: block;
  width: 100%;
  height: 100%;
}
.form {
  width: 100%;
  background: none;
}
.form-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.form-header h1 {
  font-size: 24px;
  color: #d6d7d8;
}
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 40%;
  left: 50%;
  margin-top: -175px;
  margin-left: -250px;
  width: 500px;
  height: 350px;
  background-color: #1122336b;
  box-shadow: 0 1px 7px 2px #ffffff38;
  border-radius: 4px;
  z-index: 999;
}
#animation {
  font: 5vmin/1.3 Serif;
  overflow: hidden;
  background: #123;
}

section {
  display: block;
  font-size: 52px;
  color: transparent;
  height: 100%;
  width: 100%;
}

#animation::before,
#animation::after {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 3em;
  height: 3em;
  content: ".";
  mix-blend-mode: screen;
  animation: 44s -27s move infinite ease-in-out alternate;
}

#animation::before {
  text-shadow: 0.933301652em 1.5673124938em 7px rgba(255, 20, 0, 0.9),
    0.24102608em 0.9917424137em 7px rgba(175, 0, 255, 0.9),
    0.0293982711em 1.8649102951em 7px rgba(210, 255, 0, 0.9),
    2.171635548em -0.332469831em 7px rgba(0, 255, 10, 0.9),
    2.3004237767em 2.4436182492em 7px rgba(255, 0, 113, 0.9),
    2.0545966741em 2.4092067773em 7px rgba(0, 255, 39, 0.9),
    1.3280429536em 0.4988731001em 7px rgba(255, 0, 165, 0.9),
    -0.2179260621em 1.5077686898em 7px rgba(0, 129, 255, 0.9),
    1.6665785384em 2.0538057218em 7px rgba(46, 255, 0, 0.9),
    0.9257684865em 0.0881921826em 7px rgba(0, 222, 255, 0.9),
    0.3007786426em 2.3348194676em 7px rgba(0, 42, 255, 0.9),
    0.6942120296em 2.4103469465em 7px rgba(0, 169, 255, 0.9),
    -0.0930772146em 0.9371120474em 7px rgba(236, 255, 0, 0.9),
    0.973814108em 1.194224426em 7px rgba(58, 0, 255, 0.9),
    2.4373618103em 0.011549485em 7px rgba(0, 98, 255, 0.9),
    0.1586143043em 0.4138636226em 7px rgba(255, 0, 136, 0.9),
    2.4853038886em 0.3587019547em 7px rgba(196, 0, 255, 0.9),
    0.3306920223em 1.0179620275em 7px rgba(255, 188, 0, 0.9),
    0.428424569em 0.623546227em 7px rgba(255, 224, 0, 0.9),
    0.9662807953em 1.102352105em 7px rgba(118, 0, 255, 0.9),
    0.052739773em 0.2987829177em 7px rgba(0, 142, 255, 0.9),
    2.2044889704em -0.3600193772em 7px rgba(0, 7, 255, 0.9),
    0.6255947812em 1.1539943956em 7px rgba(92, 0, 255, 0.9),
    1.077176581em 1.8142247067em 7px rgba(255, 0, 38, 0.9),
    1.8283252128em -0.2640429538em 7px rgba(72, 0, 255, 0.9),
    1.4829698378em 0.9399468042em 7px rgba(0, 255, 143, 0.9),
    1.3449270289em 0.6614414596em 7px rgba(46, 0, 255, 0.9),
    0.998731257em 0.5951981511em 7px rgba(255, 0, 186, 0.9),
    0.7089949395em 0.0806998119em 7px rgba(98, 255, 0, 0.9),
    0.6304402313em 2.3128552658em 7px rgba(0, 255, 36, 0.9),
    1.5523072217em 0.2035227256em 7px rgba(255, 0, 230, 0.9),
    0.1451068427em 1.4000728704em 7px rgba(69, 255, 0, 0.9),
    2.2696169156em 2.0488710391em 7px rgba(255, 0, 114, 0.9),
    -0.186037035em 2.4255444605em 7px rgba(122, 255, 0, 0.9),
    1.3879597725em 0.8566685656em 7px rgba(247, 0, 255, 0.9),
    2.1882728106em 1.7076029657em 7px rgba(0, 255, 131, 0.9),
    1.0571902543em 2.144410251em 7px rgba(31, 255, 0, 0.9),
    -0.0794577423em -0.2754596987em 7px rgba(0, 255, 75, 0.9),
    1.7603859473em 2.36891561em 7px rgba(0, 27, 255, 0.9),
    2.3699137535em 0.0653426433em 7px rgba(0, 25, 255, 0.9),
    0.5818530743em -0.4783217245em 7px rgba(0, 173, 255, 0.9);
  animation-duration: 44s;
  animation-delay: -27s;

}

#animation::after {

  text-shadow: 1.8191120921em 0.6945916857em 7px rgba(147, 0, 255, 0.9),
    2.3027104219em -0.1014678049em 7px rgba(87, 255, 0, 0.9),
    1.6184184493em 1.77576573em 7px rgba(0, 81, 255, 0.9),
    -0.3658796926em 2.165872874em 7px rgba(0, 64, 255, 0.9),
    2.3790434636em 0.7006449714em 7px rgba(255, 225, 0, 0.9),
    1.9258008925em 1.6127872474em 7px rgba(0, 191, 255, 0.9),
    0.390518403em 0.3529644623em 7px rgba(0, 8, 255, 0.9),
    -0.2864215644em 2.3153844086em 7px rgba(255, 198, 0, 0.9),
    0.619991229em 1.5169973339em 7px rgba(255, 0, 223, 0.9),
    -0.4036524434em 0.7575500241em 7px rgba(200, 0, 255, 0.9),
    2.4035783093em 2.3519288194em 7px rgba(0, 255, 243, 0.9),
    -0.4763987099em 1.5379256845em 7px rgba(0, 7, 255, 0.9),
    0.689616248em 2.2241142774em 7px rgba(50, 0, 255, 0.9),
    -0.0950194282em 1.7885630008em 7px rgba(255, 0, 177, 0.9),
    0.1448654473em 2.0084987786em 7px rgba(255, 0, 20, 0.9),
    0.3147469478em 1.9695324201em 7px rgba(255, 71, 0, 0.9),
    0.4480357374em -0.472025206em 7px rgba(61, 255, 0, 0.9),
    1.4582895269em -0.3129105375em 7px rgba(0, 255, 193, 0.9),
    0.3770580457em 0.3034614262em 7px rgba(255, 184, 0, 0.9),
    -0.3310588572em 1.4589104297em 7px rgba(255, 0, 244, 0.9),
    0.7175109637em 0.9856454946em 7px rgba(255, 0, 68, 0.9),
    1.0020888168em 1.3896854116em 7px rgba(0, 44, 255, 0.9),
    -0.4426637987em 0.5379112089em 7px rgba(0, 255, 238, 0.9),
    1.8705702094em 0.297048697em 7px rgba(255, 165, 0, 0.9),
    1.4077973255em 2.4800915908em 7px rgba(255, 16, 0, 0.9),
    1.4779817224em 1.1191183607em 7px rgba(0, 255, 176, 0.9),
    0.9012381088em 0.6027440565em 7px rgba(0, 199, 255, 0.9),
    2.0833395786em 1.8224028766em 7px rgba(255, 0, 7, 0.9),
    1.499418801em 1.850592944em 7px rgba(0, 161, 255, 0.9),
    1.9008404366em -0.3316817386em 7px rgba(0, 255, 196, 0.9),
    1.129973179em 0.0438569169em 7px rgba(255, 0, 34, 0.9),
    0.5225293251em 0.4470552985em 7px rgba(10, 255, 0, 0.9),
    1.0337720398em 0.3231139954em 7px rgba(255, 3, 0, 0.9),
    1.8798858929em 0.2150804293em 7px rgba(255, 203, 0, 0.9),
    1.9578186333em 2.2944945672em 7px rgba(255, 0, 79, 0.9),
    1.4412802522em 0.5152953175em 7px rgba(255, 215, 0, 0.9),
    0.8771585796em 0.6675045053em 7px rgba(125, 0, 255, 0.9),
    1.4198082621em 0.5560999535em 7px rgba(127, 0, 255, 0.9),
    1.554990333em 1.5037165698em 7px rgba(124, 255, 0, 0.9),
    0.1248077085em 2.4599152431em 7px rgba(255, 251, 0, 0.9),
    1.0807757369em 1.5188802589em 7px rgba(255, 0, 194, 0.9);
  animation-duration: 43s;
  animation-delay: -32s;
}

@keyframes move {
  from {
    transform: rotate(0deg) scale(12) translateX(-20px);
  }
  to {
    transform: rotate(360deg) scale(18) translateX(20px);
  }
}
</style>
<style>
#animation .ivu-input {
  color: #a59f9f;
  background-color: transparent;
}
</style>



