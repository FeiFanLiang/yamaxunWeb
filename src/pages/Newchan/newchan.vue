<template>
  <section class="newDrawContainer">
    <Form ref="newCommitFrom" :model="form" :rules="ruleValidate">
      <Tabs value="基本信息">
        <TabPane label="基本信息" name="基本信息">
          <div class="tab_wrap">
            <Row>
              <Col :span="5">
                <FormItem label="品牌名称">
                  <Input v-model="form.brand" disabled></Input>
                </FormItem>
              </Col>
            </Row>
            <template v-if="EditShow">
              <div class="edit-item">属性分类信息</div>
              <div class="edit-item">发布站点:{{form.country}}</div>
              <div class="edit-item">分类目录:{{form.categoryType}}</div>

              <div v-if="form.childAttr.length">
                <span class="edit-item">变种信息展示</span>
                <template v-for="(item,index) in form.childAttr">
                  <Row v-if="index===0" :key="item.sku">
                    <Col v-if="key !== '__id'" :span="2" v-for="(value,key,i) in item" :key="i">
                      <span class="attrForm-item-show">{{key}}</span>
                    </Col>
                  </Row>
                  <Row style="margin:10px 0;">
                    <Col :span="2" v-if="key !== '__id'" v-for="(value,key,i) in item" :key="i">
                      <span class="attrForm-item-show">{{value}}</span>
                    </Col>
                  </Row>
                </template>
              </div>
            </template>
            <Row>
              <Button v-if="EditShow" @click="resertEdit" type="primary">修改分类信息</Button>
            </Row>
            <template v-if="!EditShow">
              <Form-Item label="站点选择" prop="country">
                <Select
                  v-model="form.country"
                  style="width:200px"
                  @on-change="regionOptionsChange"
                  label-in-value
                  placeholder="请选择站点"
                >
                  <Option
                    v-for="item in regions"
                    :value="item.regionId"
                    :key="item.regionId"
                  >{{ item.region }}</Option>
                </Select>
              </Form-Item>
              <Form-Item label="产品分类" prop="categoryType">
                <Cascader
                  :data="categoryTypes"
                  :load-data="loadData"
                  @on-change="cascaderSel"
                  width="200px"
                ></Cascader>
              </Form-Item>
              <Form-Item label="分类类型" v-if="hasCategoryTypesCheck">
                <Select v-model="form.categoryTypesCheck" @on-change="categoryTypesCheckChange">
                  <Option v-for="item in categoryTypesCheckOptions" :value="item" :key="item"></Option>
                </Select>
              </Form-Item>
              <Form-Item label="售卖形式">
                <Row class="varietaWrap">
                  <Spin size="large" fix v-if="spinShow"></Spin>
                  <RadioGroup v-model="form.hasVarieta">
                    <Radio :label="0" true-value>单体</Radio>
                    <Radio :label="1" false-value>多变种</Radio>
                  </RadioGroup>
                </Row>
              </Form-Item>
              <template v-if="!form.spiderChild || !form.spiderChild.length">
                 <Form-Item label="变种信息" v-if="form.hasVarieta">
                <Row>
                  <Select v-model="form.VariType" @on-change="variTypeChange">
                    <Option
                      v-for="(value,index) in currentCategoryAttr.skuAttTheme.values"
                      :key="index"
                      :value="value"
                      :label="value"
                    ></Option>
                  </Select>
                </Row>
              </Form-Item>
              <template v-if="form.VariType">
                <div>变种属性</div>
                <Modal
                  v-model="arrInputModal"
                  title="添加变种属性"
                  @on-ok="addAttrInput"
                  @on-cancel="cancelAddAttrInput"
                >
                  <Input size="small" v-model="attrTypeInputValue" placeholder="请输入变种信息"></Input>
                </Modal>

                <Modal
                  v-model="arrSelectModal"
                  title="添加变种属性"
                  @on-ok="addAttrSelect"
                  @on-cancel="cancelAddAttrSelect"
                >
                  <template v-if="this.attrTypeSelect.values">
                    <Select v-model="attrTypeSelectValue">
                      <Option
                        v-for="(value,i) in JSON.parse(this.attrTypeSelect.values)"
                        :key="i"
                        :label="value"
                        :value="value"
                      ></Option>
                    </Select>
                  </template>
                </Modal>
                <Row
                  :gutter="16"
                  type="flex"
                  justify="start"
                  align="middle"
                  v-for="(item,index) in currentCategoryChildAttr"
                  :key="index"
                >
                  <Col class="attributeItem">{{item.attributeName}}</Col>
                  <template v-if="item.attributeType == 'input'">
                    <Col>
                      <div v-if="item.addValues && item.addValues.length">
                        <Tag
                          v-for="(el,index) in item.addValues"
                          :key="el"
                          closable
                          @on-close="handleClose(item,index)"
                        >{{el}}</Tag>
                      </div>
                    </Col>
                    <Col>
                      <Button size="small" @click="modalAddAttrInputShow(item)">添加</Button>
                    </Col>
                  </template>

                  <Col v-if="item.attributeType == 'select'">
                    <template v-if="item.addValues">
                      <Tag
                        v-for="(el,index) in item.addValues"
                        :key="el"
                        closable
                        @on-close="handleClose(item,index)"
                      >{{el}}</Tag>
                    </template>
                    <Button size="small" @click="modalAddAttrSelectShow(item)">添加</Button>
                  </Col>
                </Row>

                <Row v-if="childAttrFormShow" class="attrBtn-wrap">
                  <Button type="success" size="small" @click="initChildAttrForm">生成变种子类型</Button>
                </Row>

                <div>变种类目编辑</div>
                <template v-for="(item,index) in form.childAttr" v-if="form.childAttr.length">
                  <Row v-if="index===0" :key="item.sku">
                    <Col v-if="key !== '__id'" :span="2" v-for="(value,key,i) in item" :key="i">
                      <span class="attrForm-item">{{key}}{{translationLabel(key)}}</span>
                    </Col>
                    <Col :span="2">
                      <span class="attrForm-item">操作</span>
                    </Col>
                  </Row>
                  <Row style="margin:10px 0;">
                    <Col :span="2" v-if="key !== '__id'" v-for="(value,key,i) in item" :key="i">
                      <span class="attrForm-item">
                        <DatePicker
                          type="daterange"
                          @on-change="childAttrDiscountDate(item,$event)"
                          formate="yyyy-MM-dd"
                          placement="bottom-end"
                          placeholder="Select date"
                          style="width: 150px"
                          v-if="key=='discountDate'"
                          :key="i"
                        ></DatePicker>
                        <Input
                          style="width:150px"
                          v-else
                          v-model="item[key]"
                          :disabled="attrTypesNoEdit[key]||key== 'sku'"
                        ></Input>
                      </span>
                    </Col>
                    <Col :span="2">
                      <span class="attrForm-item">
                        <Button type="error" size="small" @click="delChildAttr(index)">移除</Button>
                      </span>
                    </Col>
                  </Row>
                </template>
              </template>
            </template>
              </template>
             
            <Row v-if="form.spiderChild && form.spiderChild.length" class="ccc">
              <Button type="error" @click="spiderEdit">采集变种编辑</Button>
            </Row>
            <div v-if="spiderDialog">
        <template v-for="(item,index) in form.spiderChild">
                  <Row v-if="index===0" :key="item.sku" type="flex" justify="center" :gutter="20">
                    <Col :span="2" v-for="(value,key,i) in item" :key="i">
                      <span class="attrForm-item">{{key}}</span>
                    </Col>
                    <Col :span="2">
                      <span class="attrForm-item">操作</span>
                    </Col>
                  </Row>
                  <Row style="margin:10px 0;" type="flex" justify="center" :gutter="20">
                    <Col :span="2"  v-for="(value,key,i) in item" :key="i">
                      <span class="attrForm-item">
                        <template v-if="key == 'attr1' || key =='attr2'">
                         <Select v-model="item[key]['name']">
                          <Option v-for="(i,index) of spiderSelect" :label="i" :key="index" :value="i"></Option>
                        </Select>
                        <Input
                          style="width:150px"
                          v-model="item[key]['value']"
                          :disabled="attrTypesNoEdit[key]||key== 'sku'"
                        ></Input>
                        </template>
                       <template v-else>
                          <Input
                          style="width:150px"
                          v-model="item[key]"
                          :disabled="attrTypesNoEdit[key]||key== 'sku'"
                        ></Input>
                       </template>
                       
                      </span>
                    </Col>
                    <Col :span="2">
                      <span class="attrForm-item">
                        <Button type="error" size="small" @click="delSpiderChild(index)">移除</Button>
                      </span>
                    </Col>
                  </Row>
                </template>
      </div>
            <FormItem label="ParentSKU" prop="parentSku">
              <Input v-model="form.parentSku" disabled></Input>
            </FormItem>
            
            
              <FormItem label="产品类别" prop="productType">
                <Select v-model="form.productType">
                  <Option
                    v-for="(item,index) in currentCategoryAttr.product_type"
                    :key="index"
                    :value="item"
                    :label="item"
                  ></Option>
                </Select>
              </FormItem>
            

            
              <FormItem label="产品标题" prop="merChanName">
                <Input v-model="form.merChanName" placeholder="产品标题"></Input>
              </FormItem>
              
              <FormItem label="生产厂家" prop="Manufacturer">
                <Input v-model="form.Manufacturer" placeholder="生产厂家"></Input>
              </FormItem>
            <Row>
            </Row>

            <Form-Item label="产品数量" prop="quantity">
              <Input type="number" v-model.number="form.quantity"></Input>
            </Form-Item>

            <Row>
              <FormItem label="商品价格" prop="price">
                <Input v-model="form.price" placeholder="商品价格,保留两位小数"></Input>
              </FormItem>
            </Row>

            <Row>
              <FormItem label="关键词" prop="keyword">
                <Input v-model.number="form.keyword" placeholder="请输入关键词,不能超过250字符"></Input>
              </FormItem>
            </Row>
            <Row>
              <FormItem label="发布日期" prop="date">
                <DatePicker
                  type="date"
                  :value="form.soldDate"
                  @on-change="soldDateFormat"
                  placeholder="不选择默认为当天"
                  formate="yyyy-MM-dd"
                  :start-date="new Date()"
                  style="width: 200px"
                ></DatePicker>
              </FormItem>
            </Row>
          </div>
        </TabPane>
        <TabPane label="描述信息" name="描述信息">
          <Form-Item label="促销价格">
            <Input type="text" v-model="form.discountPrice" placeholder="0.00"></Input>
          </Form-Item>

          <Form-Item label="促销日期">
            <DatePicker
              type="daterange"
              v-model="form.discountDate"
              @on-change="discountDateFormat"
              formate="yyyy-MM-dd"
              placement="bottom-end"
              placeholder="选择日期"
              style="width: 200px"
            ></DatePicker>
          </Form-Item>
          <Form-Item label="处理天数">
            <Input type="text" v-model.number="form.discountDuration" placeholder="选填"></Input>
          </Form-Item>
          <Form-Item label="运输模板">
            <Input type="text" placeholder="选填" v-model="form.transModel"></Input>
          </Form-Item>
          <Form-Item label="礼品包装服务">
            <Select style="width:80px" v-model="form.gitPackage">
              <Option :value="1">是</Option>
              <Option :value="0">否</Option>
            </Select>
          </Form-Item>
          <Row>
            <Col>
              <FormItem label="商品描述" prop="description">
                <Input
                  type="textarea"
                  :rows="10"
                  placeholder="请输入商品描述,最多250字符"
                  v-model="form.description"
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="重点1" prop="point1">
                <Input type="textarea" :rows="1" placeholder="重点描述1,最多500字符" v-model="form.point1"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="重点2" prop="point2">
                <Input type="textarea" :rows="1" placeholder="重点描述2,最多500字符" v-model="form.point2"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="重点3" prop="point3">
                <Input type="textarea" :rows="1" placeholder="重点描述3,最多500字符" v-model="form.point3"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="重点4" prop="point4">
                <Input type="textarea" :rows="1" placeholder="重点描述4,最多500字符" v-model="form.point4"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="重点5" prop="point5">
                <Input type="textarea" :rows="1" placeholder="重点描述5,最多500字符" v-model="form.point5"></Input>
              </FormItem>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="图片信息" name="图片信息">
          <FormItem label="主图片1" prop="point5">
                <Input type="textarea" :rows="1" placeholder="主图1" v-model="form.mainImgUrl1"></Input>
              </FormItem>
               <FormItem label="主图片2" prop="point5">
                <Input type="textarea" :rows="1" placeholder="主图2" v-model="form.mainImgUrl2"></Input>
              </FormItem>
               <FormItem label="主图片3" prop="point5">
                <Input type="textarea" :rows="1" placeholder="主图3" v-model="form.mainImgUrl3"></Input>
              </FormItem>
               <FormItem label="主图片4" prop="point5">
                <Input type="textarea" :rows="1" placeholder="主图4" v-model="form.mainImgUrl4"></Input>
              </FormItem>
               <FormItem label="主图片5" prop="point5">
                <Input type="textarea" :rows="1" placeholder="主图5" v-model="form.mainImgUrl5"></Input>
              </FormItem>
          <!-- <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
              <img :src="item.url" />
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/"
            style="display: inline-block;width:150px;height:150px;"
          >
            <div style="width: 150px;height:150px;line-height: 150px;">
              <Icon type="md-cloud-upload" size="30" color="#0398f3" />
            </div>
          </Upload>
          <Modal title="View Image" v-model="visible">
            <img
              :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
              v-if="visible"
              style="width: 100%"
            />
          </Modal> -->
        </TabPane>
      </Tabs>
    </Form>
    <div>
      <Button @click="isShow=false">取消</Button>
      <Button type="primary" @click="addSubmit">提交</Button>
    </div>
      
        
  </section>
</template>
<script>
import { categoryApi, merchan } from "@/api";
import { regions, comStatusOptions, attrData } from "@/common/options.js";
import { mapState } from "vuex";
export default {
  //quantity //title //id //keyword
  data() {
    return {
      comStatusOptions: comStatusOptions,
      regions: regions,
      EditShow: false,
      spiderDialog:false,
      currentRegion: {
        options: [
          {
            label: "请选择",
            value: "请选择"
          }
        ]
      },
      //分类目录
      categoryTypes: [],
      //获取所有属性
      categoryAttrOrigin: {},
      //筛选完的属性
      currentCategoryAttr: {
        skuThemeAttr: "",
        skuAttTheme: ""
      },

      //当前选择的属性下变种
      currentCategoryChildAttr: [],
      //当前选择变种属性下拉框
      nowAttr: [],
      //当前选择编辑的input类型子属性
      attrTypeInput: [],
      //当前选择的input类型变种子属性值
      attrTypeInputValue: "",
      //当前选择编辑的select类型子属性
      attrTypeSelect: "",
      //当前选择的select类型变种子属性值
      attrTypeSelectValue: "",
      attrTypesNoEdit: {},
      defalutAttrObj: {
        sku: "",
        conditionNote: "",
        price: "",
        discountPrice: "",
        discountDate: "",
        quantity: ""
      },
      hasCategoryTypesCheck: false,
      categoryTypesCheckOptions: [],
      currentSite: "",
      spinShow: false,
      arrInputModal: false,
      arrSelectModal: false,
      childAttrFormShow: true,
      isFromSpider:false,
      childAttrFormColumns: [],
      spiderSelect:[],
      form: {
        brand: "",
        country: "",
        categoryType: "",
        Manufacturer:"",
        parentSku: "",
        merChanId: "",
        merChanName: "",
        categoryTypeId:'',
        quantity: 50,
        price: "",
        status: 1,
        model:'',
        productType: "",
        description: "",
        keyword: "",
        point1: "",
        point2: "",
        point3: "",
        point4: "",
        point5: "",
        mainImgUrl1: "",
        mainImgUrl2: "",
        mainImgUrl3: "",
        mainImgUrl4: "",
        mainImgUrl5: "",
        soldDate: this.formatDate(new Date()),
        hasVarieta: 0,
        VariType: "",
        discountPrice: "",
        discountDuration: "",
        discountDate: [],
        transModel: "",
        gitPackage: "",
        //变种存在多属性选择的变种类型
        categoryTypesCheck: "",
        childAttr: []
      },
      
      imgName: "",
      visible: false,
      uploadList: [],
      ruleValidate: {
        Manufacturer:[
          {
            required:true,
            message:'请输入生产厂家',
            trigger:'blur'
          }
        ],
        productType: [
          {
            required: true,
            message: "请选择产品类别",
            type: "string",
            trigger: "change"
          }
        ],
        point1: [
          {
            required: true,
            message: "请输入50字以内的商品重点描述",
            trigger: "blur"
          }
        ],
        point2: [
          {
            required: true,
            message: "请输入50字以内的商品重点描述",
            trigger: "blur"
          }
        ],
        point3: [
          {
            required: true,
            message: "请输入50字以内的商品重点描述",
            trigger: "blur"
          }
        ],
        point4: [
          {
            required: true,
            message: "请输入50字以内的商品重点描述",
            trigger: "blur"
          }
        ],
        point5: [
          {
            required: true,
            message: "请输入50字以内的商品重点描述",
            trigger: "blur"
          }
        ],
        quantity: [
          {
            required: true,
            message: "请输出产品数量",
            trigger: "blur",
            type: "number"
          }
        ],
        parentSku: [
          {
            required: true,
            message: "请输入产品sku",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入产品价格",
            trigger: "blur"
          }
        ],
        merChanName: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur"
          },
          {
            type: "string",
            min: 1,
            message: "请输入正确的商品名称"
          }
        ],
        keyword: [
          {
            required: true,
            message: "请输入关键字",
            trigger: "blur"
          },
          {
            type: "string",
            min: 1,
            message: "请输入关键字信息"
          }
        ],
        merChanId: [
          {
            required: true,
            message: "请输入商品ID",
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: "请输入200字符以内的商品描述",
            trigger: "blur"
          },
          {
            type: "string",
            min: 5,
            message: "请至少输入大于5个字符的商品描述",
            trigger: "blur"
          }
        ],
        country: [
          {
            type: "string",
            required: true,
            message: "请选择站点",
            trigger: "change"
          }
        ],
        categoryType: [
          {
            required: true,
            message: "请选择分类",
            trigger: "change",
            type: "string"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created() {
    this.fetchData();
  },

  methods: {
    spiderSave(){

    },
    spiderEdit(){
      this.spiderDialog  = true
      this.initSpiderChild()
    },
    translationLabel(val){
      if(val == 'conditionNote'){
        return '(状况说明)'
      }
      if(val == 'discountPrice'){
        return '(折扣价)'
      }
      if(val == 'discountDate'){
        return '(打折时间)'
      }
      if(val == 'quantity'){
        return '(变种数量)'
      }
      if(val == 'imgurl'){
        return '(变种图片)'
      }

      
    },
    CheckBarCode(s) {
      var a = 0,
        b = 0,
        c = 0,
        d = 0,
        e = 0;
      for (var i = 1; i <= 12; i++) {
        var sc = parseInt(s[i - 1]);
        if (i <= 12 && i % 2 == 0) {
          a += sc;
        } else if (i <= 11 && i % 2 == 1) {
          b += sc;
        }
      }
      c = a * 3;
      d = b + c;
      if (d % 10 == 0) e = d - d;
      else e = d + (10 - (d % 10)) - d;
      return e;
    },
    //生成随机13位条码
    createBarcode() {
      var str = "69";
      for (var i = 0; i < 10; i++) {
        str += Math.floor(Math.random() * 10);
      }
      var checkcode = this.CheckBarCode(str);
      return str + checkcode;
    },

    resertEdit() {
      this.EditShow = false;
      this.form.country = "";
      this.form.childAttr = [];
      this.form.hasVarieta = 0;
    },
    fetchData() {
      if (this.$route.query.edit) {
        sessionStorage.getItem("currentMer");
        this.form = JSON.parse(sessionStorage.getItem("currentMer"));
        this.EditShow = true;
      } else {
        this.form.brand = this.userInfo.brand;
        this.form.parentSku = this.form.brand + "-" + this.$uuid();
      }
    },

    async addSubmit() {
      this.$refs["newCommitFrom"].validate(valid => {
        if (valid) {
          if (this.$route.query.edit) {
            
            if(this.form.spiderChild.length){
              const data = this.form.spiderChild
              for(let el of this.form.spiderChild){
                 let attr1 = el.attr1
                let name1 = attr1.name
                let value1 = attr1.value
                let attr2 = el.attr2
                let name2 = attr2.name
                let value2 = attr2.value2
                delete el.attr1
                delete el.attr2
               el.name1 = value1
               el.name2 = value2
              }
              

              this.form.childAttr = this.form.spiderChild
              this.form.spiderChild = []
              merchan.updateMer(this.form).then(res => {
              if (res.code == 1) {
                this.$Message.success("修改成功");
                this.$router.go(-1)
              } else {
                this.$Message.error("修改失败");
              }
            });
            }else{
               merchan.updateMer(this.form).then(res => {
              if (res.code == 1) {
                this.$Message.success("修改成功");
              } else {
                this.$Message.error("修改失败");
              }
            });
            }
           
          } else {
            merchan.addMer(this.form).then(res => {
              if (res.code == 1) {
                this.$Message.success("发布成功");
                this.$refs['newCommitFrom'].resetFields()
              } else {
                this.$Message.error("发布失败");
              }
            });
          }
        } else {
          this.$Message.error("您的信息填写有误，请检查后重新提交");
        }
      });
    },

    childAttrDiscountDate(item, date) {
      item.discountDate = date;
    },
    delSpiderChild(index){
      this.form.spiderChild.splice(index,1)
    },
    delChildAttr(index) {
      this.form.childAttr.splice(index, 1);
    },
    initSpiderChild(){
      
      let childChanList = [];
      this.spiderSelect = ['color_name','size_map','color_map','size_name']
      this.form.spiderChild = this.form.spiderChild.map((el,index) => {
        let currentindex = index < 9 ? "0" + (index + 1) : index + 1;
        let obj = {
          attr1:{
            name:'',
            value:el.name
          },
          attr2:{
            name:'',
            value:el.skuName || ''
          },
          sku:`${this.form.parentSku}-${currentindex}`,
          price:el.price || 0,
          quantity:el.quality || 50,
          imgurl:el.imgurl || ''
        }
        return obj
      })
    },
    initChildAttrForm() {
      
      const skuAttThemeArr = this.currentCategoryAttr.skuThemeAttr;
      const skuEndemicAttr = this.currentCategoryAttr.skuEndemicAttr;
    
      let obj = {
        sku: "",
        conditionNote: "",
        price: "",
        discountPrice: "",
        discountDate: "",
        quantity: "",
        imgurl:''
      };
      
      let childAttr = [];
      let childChanList = [];
      
      for (let key in skuAttThemeArr) {
        if (
          skuAttThemeArr[key].addValues &&
          skuAttThemeArr[key].addValues.length
        ) {
          let attrObj = {
            name: skuAttThemeArr[key].attributeId,
            values: skuAttThemeArr[key].addValues
          };
          this.attrTypesNoEdit[skuAttThemeArr[key].attributeId] = true;
          childAttr.push(attrObj);
        }
      }
      if (skuEndemicAttr) {
        skuEndemicAttr.forEach(endemic => {
          if (obj[endemic.attributeId] == undefined) {
            obj[endemic.attributeId] = "";
          }
        });
      }

      let resultArray = [];
      childAttr.forEach(item => {
        if (!resultArray.length) {
          item.values.forEach(el => {
            let obj = {};
            obj[item.name] = el;

            resultArray.push(obj);
          });
        } else {
          let currentArr = [];
          item.values.forEach((el, index) => {
            resultArray.forEach(result => {
              let obj = {};
              obj[item.name] = el;
              currentArr.push(Object.assign({}, obj, result));
            });
          });
          resultArray = currentArr;
        }
      });
      resultArray.forEach((el, index) => {
        let initObj = Object.assign({}, obj, el);
        let currentindex = index < 9 ? "0" + (index + 1) : index + 1;
        initObj.sku = `${this.form.parentSku}-${currentindex}`;
        childChanList.push(initObj);
      });
      this.form.childAttr = childChanList;
    },
    modalAddAttrInputShow(val) {
      this.attrTypeInput = val;
      this.arrInputModal = true;
      this.childAttrFormShow = true;
    },
    modalAddAttrSelectShow(val) {
      this.attrTypeSelect = val;
      this.arrSelectModal = true;
      this.childAttrFormShow = true;
    },
    addAttrInput() {
      if (!this.attrTypeInput.addValues) {
        this.attrTypeInput.addValues = [];
      }
      if (
        this.attrTypeInput.addValues.indexOf(this.attrTypeInputValue) === -1
      ) {
        this.attrTypeInput.addValues.push(this.attrTypeInputValue);
      }

      this.arrInputModal = false;
    },
    addAttrSelect() {
      if (!this.attrTypeSelect.addValues) {
        this.attrTypeSelect.addValues = [];
      }
      if (
        this.attrTypeSelect.addValues.indexOf(this.attrTypeSelectValue) === -1
      ) {
        this.attrTypeSelect.addValues.push(this.attrTypeSelectValue);
      }

      this.arrSelectModal = false;
    },
    cancelAddAttrSelect() {
      this.attrTypeSelectValue = "";
      this.arrSelectModal = false;
    },
    cancelAddAttrInput() {
      this.attrTypeInputValue = "";
      this.arrSelectModal = false;
    },
    resetAddAttr() {
      this.attrTypeInput = "";
      this.attrTypeInputValue = "";
      this.attrTypeSelect = "";
      this.attrTypeSelectValue = "";
    },
    handleClose(item, index) {
      item.addValues.splice(index, 1);
      this.currentCategoryChildAttr = this.currentCategoryChildAttr.map(el => {
        return el;
      });
    },

    variTypeChange(val) {
      let skArr = [];
      let currentSkarr = [];
      for (let key in this.currentCategoryAttr.skuThemeAttr) {
        delete this.currentCategoryAttr.skuThemeAttr[key].addValues;
      }

      if (val.indexOf("-") !== -1 || val.indexOf("/") !== -1) {
        if (val.indexOf("-") !== -1) skArr = val.split("-");
        if (val.indexOf("/") !== -1) skArr = val.split("/");
      } else {
        skArr.push(val);
      }

      skArr.forEach(el => {
        let names = el ? attrData.skuAttrRelation[el.toLowerCase()] : "";
        if (names) {
          names.forEach(name => {
            if (
              this.currentCategoryAttr.skuThemeAttr[name] &&
              currentSkarr.indexOf(
                this.currentCategoryAttr.skuThemeAttr[name]
              ) === -1
            ) {
              currentSkarr.push(this.currentCategoryAttr.skuThemeAttr[name]);
            }
          });
        }
      });

      this.currentCategoryChildAttr = currentSkarr;
      
      
      this.resetAddAttr();
    },

    async categoryTypesCheckChange(value) {
      this.form.categoryTypesCheck = value;
      const params = {
        site: this.currentSite,
        categoryType: value
      };
      const res = await categoryApi.getCategoryList(params);
      this.categoryAttrOrigin = res.data;
      this.form.hasVarieta = 0;
      this.initAttrOptions();
    },
    initAttrOptions() {
      this.spinShow = true;
      let skuAttTheme = "";
      let skuAttThemeArr = [];
      let skuAttThemeReal = {};
      let skuEndemicAttr = [];
      let product_type = [];
      this.categoryAttrOrigin
      this.categoryAttrOrigin.forEach(el => {
        if (el.attributeId == "variation_theme") skuAttTheme = el;
        if (el.attributeId == "feed_product_type") {
            product_type = JSON.parse(el.values);
          }
        if (attrData.skuNotDisplay.indexOf(el.attributeId) === -1) {
          if (el.variantionSpecifics === 1) {
            skuEndemicAttr.push(el);
          }
          skuAttThemeArr.push(el);
        }
      });
      if (skuAttTheme) {
        let theme = skuAttTheme.values;
        if (theme) {
          const themeValus = JSON.parse(theme);
          let skArr = [];
          skuAttThemeArr.forEach(sku => {
            themeValus.forEach(theme => {
              if (theme.indexOf("/") !== -1 || theme.indexOf("-") !== -1) {
                if (theme.indexOf("/") !== -1) skArr = theme.split("/");
                if (theme.indexOf("-") !== -1) skArr = theme.split("-");
              } else {
                skArr.push(theme);
              }
              if (skArr.length > 0) {
                skArr.forEach(el => {
                  let names = el
                    ? attrData.skuAttrRelation[el.toLowerCase()]
                    : "";
                  if (names) {
                    names.forEach(name => {
                      if (sku.attributeId === name && !skuAttThemeReal[name]) {
                        skuAttThemeReal[name] = sku;
                      }
                    });
                  }
                });
              }
            });
          });
        }
      }
      skuAttTheme.values = JSON.parse(skuAttTheme.values);
      this.currentCategoryAttr.skuAttTheme = skuAttTheme;
      this.currentCategoryAttr.skuEndemicAttr = skuEndemicAttr;
      this.currentCategoryAttr.skuThemeAttr = skuAttThemeReal;
      this.currentCategoryAttr.product_type = product_type;
      this.spinShow = false;
    },
    soldDateFormat(date) {
      this.form.soldDate = date;
    },
    discountDateFormat(data) {
      this.form.discountDate = data;
    },
    formatDate(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      m < 10 ? (m = "0" + m) : m;
      d < 10 ? (d = "0" + d) : d;
      return `${y}-${m}-${d}`;
    },
    cascaderSel(val, selectedData) {
      const checkType = selectedData[selectedData.length - 1];
      this.form.categoryType = checkType.nodePath;
      this.form.categoryTypeId = checkType.id;
      if (checkType.categoryType.indexOf(",") !== -1) {
        this.hasCategoryTypesCheck = true;
        this.categoryTypesCheckOptions = checkType.categoryType.split(",");
        return;
      }
      const params = {
        site: checkType.site,
        categoryType: checkType.categoryType
      };

      categoryApi.getCategoryList(params).then(res => {
        this.categoryAttrOrigin = res.data;
        this.initAttrOptions();
      });
    },
    async loadData(item, callback) {
      if (!item.children.length && item.leafCategory === 0) {
        item.loading = true;
        const params = {
          site: item.site,
          parentId: item.id
        };
        categoryApi.getCategoryList(params).then(res => {
          item.children = res.data.map(el => {
            if (el.leafCategory === 0) {
              el.children = [];
              el.loading = false;
            }
            return el;
          });
          item.loading = false;
          callback();
        });
      }
    },

    regionOptionsChange(obj) {
      const val = obj.value;
      const label = obj.label;
      const exsit = this.categoryTypes.find(el => el.site == val);
      this.currentSite = val;
      if (!exsit) {
        const params = {
          site: val
        };
        categoryApi.getCategoryList(params).then(res => {
          let obj = {
            site: val,
            value: val,
            label: label,
            loading: false
          };
          obj.children = res.data.map(el => {
            el.children = [];
            el.loading = false;
            return el;
          });
          this.categoryTypes.push(obj);
        });
      }
    },
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
        title: "图片格式错误",
        desc: "图片：" + file.name + "格式错误,请上传jpg或png格式图片"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "图片大小超过限制",
        desc: "图片：" + file.name + "超过2M,请重新选择图片"
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
    // console.log(regions, regionsOptions);
    // this.uploadList = this.$refs.upload.fileList;
  }
};
</script>
<style lang="less">
.newDrawContainer {
  .edit-item {
    font-size: 16px;
    padding: 10px 0;
  }
  .ccc{
    margin: 20px 0;
  }
  .attrForm-item {
    display: flex;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    color: #7b7a7a;
  }
  .attrForm-item-show {
    display: flex;
    font-size: 16px;
    color: #7b7a7a;
  }

  .ivu-layout-content {
    min-height: 0px;
  }
  .attrBtn-wrap {
    margin: 20px 0;
  }
  .attributeItem {
    color: #e2523a;
  }
  .varietaWrap {
    position: relative;
  }
  .upload-list-container {
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
  .select_text {
    color: #e8b211;
  }
  .tab_wrap {
    padding-bottom: 80px;
  }
}
</style>
<style>
.newDrawContainer .ivu-table {
  min-height: 400px;
}
</style>
