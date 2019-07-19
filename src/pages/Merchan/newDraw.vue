<template>
  <Drawer :title="edit?'商品编辑':'新增商品'" width=80 :mask-closable="false" v-model="isShow" placement="left" class="newDrawContainer">
    <Form ref="newCommitFrom" :model="form">
      <Tabs value="基本信息">
        <TabPane label="基本信息" name="基本信息">

          <Row>
            <FormItem label="SKU">
              <Input v-model="form.sku" placeholder="输入SKU"></Input>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="商品名称">
              <Input v-model="form.commName" placeholder="商品名称"></Input>
            </FormItem>

          </Row>
          <Row>
            <FormItem label="商品编号">
              <Input v-model.number="form.commNumber" placeholder="商品编号"></Input>
            </FormItem>
          </Row>

          <Row>
            <FormItem label="商品价格">
              <Input v-model.number="form.price" placeholder="商品价格"></Input>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="商品目录">
              <Input v-model.number="form.commkey" placeholder="商品目录"></Input>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="关键词">
              <Input v-model.number="form.keyword" placeholder="请输入关键词,不能超过250字符"></Input>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="发布日期">
              <Input v-model.number="form.submitDate" placeholder="发布日期"></Input>
            </FormItem>
          </Row>

          <!-- <Col :span="4">
          <FormItem label="商品状况">
						<br>
            <i-switch size="large" v-model="form.status">
              <span slot="open">新</span>
              <span slot="close">旧</span>
            </i-switch>
          </FormItem>

          </Col> -->

        </TabPane>
        <TabPane label="描述信息" name="描述信息">
          <Row>
            <Col>
            <FormItem label="商品描述">
              <Input type="textarea" :rows="10" placeholder="请输入商品描述" v-model="form.description"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
            <FormItem label="重点1">
              <Input type="textarea" :rows="1" placeholder="重点描述1" v-model="form.commInfo1"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
            <FormItem label="重点2">
              <Input type="textarea" :rows="1" placeholder="重点描述2" v-model="form.commInfo2"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
            <FormItem label="重点3">
              <Input type="textarea" :rows="1" placeholder="重点描述3" v-model="form.commInfo3"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
            <FormItem label="重点4">
              <Input type="textarea" :rows="1" placeholder="重点描述4" v-model="form.commInfo4"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
            <FormItem label="重点5">
              <Input type="textarea" :rows="1" placeholder="重点描述5" v-model="form.commInfo5"></Input>
            </FormItem>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="图片信息" name="图片信息">
          <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="//jsonplaceholder.typicode.com/posts/" style="display: inline-block;width:150px;height:150px;">
            <div style="width: 150px;height:150px;line-height: 150px;">
              <Icon type="md-cloud-upload" size="30" color="#0398f3" />
            </div>
          </Upload>
          <Modal title="View Image" v-model="visible">
            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
          </Modal>
        </TabPane>
      </Tabs>

    </Form>
		<div>
			<Button @click="isShow=false">取消</Button>
			<Button type="primary">确定</Button>
		</div>
  </Drawer>
</template>    
<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
			edit:{
				type:Boolean,
				default:false
			}
    },
    data() {
      return {
        form: {
          sku: "",
          commName: "",
          commNumber: "",
          price: "",
          status: true,
          description: "",
          keyword: "",
          commkey: "",
          creatTime: "",
          commInfo1: "",
          commInfo2: "",
          commInfo3: "",
          commInfo4: "",
          commInfo5: "",
          commImg1: "",
          submitDate: ""
        },
        defaultList: [
          {
            name: "a42bdcc1178e62b4694c830f028db5c0",
            url:
              "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"
          },
          {
            name: "bc7521e033abdd1e92222d733590f104",
            url:
              "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"
          }
        ],
        imgName: "",
        visible: false,
        uploadList: []
      };
    },
    computed: {
      isShow: {
        get() {
          
          return this.value;
        },
        set(val) {
         
          this.$emit("input", val);
        }
      }
    },
    watch: {
      
			edit(val){
				if(val){
					this.form = Object.assign({},val)
				}else{
					this.$refs['newCommitFrom'].resetFields()
				}
			}
    },
    methods: {
			
      handleView(name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove(file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess(res, file) {
        file.url =
          "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
        file.name = "7eb99afb9d5f317c912f08b5212fd69a";
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: "The file format is incorrect",
          desc:
            "File format of " +
            file.name +
            " is incorrect, please select jpg or png."
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: "Exceeding file size limit",
          desc: "File  " + file.name + " is too large, no more than 2M."
        });
      },
      handleBeforeUpload() {
        const check = this.uploadList.length < 10;
        if (!check) {
          this.$Notice.warning({
            title: "最多只能上传九张图片"
          });
        }
        return check;
      }
    },
    mounted() {
      this.uploadList = this.$refs.upload.fileList;
    }
  };
</script>
<style lang="less">
  .newDrawContainer {
		.upload-list-container{
			width: 160px;
			height: 160px;
			line-height: 1;
			background-color: #ccc;
		}
    .demo-upload-list {
      display: inline-block;
      width: 150px;
      height: 150px;
      text-align: center;
      line-height: 150px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
      margin-right: 4px;
    }
    .demo-upload-list img {
      width: 100%;
      height: 100%;
    }
    .demo-upload-list-cover {
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover {
      display: block;
    }
    .demo-upload-list-cover i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }
  }
</style>
