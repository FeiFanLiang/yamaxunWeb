<template>
  <section>
    <el-form :model="form" ref="form" label-width="90px" size="mini" :rules="rules">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础信息" name="first">
          <el-form-item label="品牌信息" prop="brand" style="width:300px">
            <el-input v-model="form.brand" disabled></el-input>
          </el-form-item>
          <el-form-item label="站点" prop="country">
            <countrySelect v-model="form.country"></countrySelect>
          </el-form-item>
          <el-form-item label="目录分类" prop="categoryType">
            <categoryTypeNode
              ref="category"
              v-model="form.categorySelectPath"
              @picked="handlePicked"
              :site="form.country"
            ></categoryTypeNode>
          </el-form-item>
          <el-form-item label="分类类型" v-if="splitCategoryTypeAttrOptions.length">
            <el-select placeholder="请选择分类类型" v-model="form.categoryTypeText">
              <el-option
                v-for="(item,index) of splitCategoryTypeAttrOptions"
                :key="index"
                :value="item"
                :label="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品分类" v-if="currentCategoryAttr.product_type">
            <el-select v-model="form.productType" placeholder="请选择产品分类">
              <el-option
                v-for="(item,index) of currentCategoryAttr.product_type"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="售卖形式" prop="hasAttr" v-if="radioShow">
            <el-radio-group v-model="form.hasVarieta">
              <el-radio :label="0">单体</el-radio>
              <el-radio :label="1">多变种</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="SKU" prop="parentSku">
            <el-input style="width:800px" v-model="form.parentSku"></el-input>
          </el-form-item>
          <el-form-item label="产品名称" prop="merChanName">
            <el-input style="width:800px" v-model="form.merChanName"></el-input>
          </el-form-item>
          <el-form-item label="生产厂家" prop="Manufacturer">
            <el-input style="width:800px" v-model="form.Manufacturer"></el-input>
          </el-form-item>
          <el-form-item label="产品数量" prop="quantity">
            <el-input style="width:800px" v-model.number="form.quantity"></el-input>
          </el-form-item>
          <el-form-item label="产品价格" prop="price">
            <el-input v-model="form.price" style="width:800px" placeholder="商品价格,保留两位小数"></el-input>
          </el-form-item>
          <el-form-item label="关键词" prop="keyword">
            <el-input
              v-model="form.keyword"
              type="textarea"
              style="width:800px"
              :autosize="{ minRows: 2}"
              maxlength="250"
              show-word-limit
              placeholder="请输入关键词,不能超过250字符"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="description">
            <el-input
              v-model="form.description"
              type="textarea"
              style="width:800px"
              :autosize="{ minRows: 2}"
              maxlength="2000"
              show-word-limit
              placeholder="请输入关键词,不能超过2000字符"
            ></el-input>
          </el-form-item>
          <el-form-item label="重点描述1" prop="point1">
            <el-input
              v-model="form.point1"
              type="textarea"
              style="width:800px"
              :autosize="{ minRows: 2}"
              maxlength="500"
              show-word-limit
              placeholder="请输入重点描述,不能超过500字符"
            ></el-input>
          </el-form-item>
          <el-form-item label="重点描述2" prop="point2">
            <el-input
              v-model="form.point2"
              type="textarea"
              style="width:800px"
              :autosize="{ minRows: 2}"
              maxlength="500"
              show-word-limit
              placeholder="请输入重点描述,不能超过500字符"
            ></el-input>
          </el-form-item>
          <el-form-item label="重点描述3" prop="point3">
            <el-input
              v-model="form.point3"
              type="textarea"
              style="width:800px"
              :autosize="{ minRows: 2}"
              maxlength="500"
              show-word-limit
              placeholder="请输入重点描述,不能超过500字符"
            ></el-input>
          </el-form-item>
          <el-form-item label="重点描述4" prop="point4">
            <el-input
              v-model="form.point4"
              type="textarea"
              style="width:800px"
              :autosize="{ minRows: 2}"
              maxlength="500"
              show-word-limit
              placeholder="请输入重点描述,不能超过500字符"
            ></el-input>
          </el-form-item>
          <el-form-item label="重点描述5" prop="point5">
            <el-input
              v-model="form.point5"
              type="textarea"
              style="width:800px"
              :autosize="{ minRows: 2}"
              maxlength="500"
              show-word-limit
              placeholder="请输入重点描述,不能超过500字符"
            ></el-input>
          </el-form-item>
          <el-form-item label="发布日期" prop="date">
            <el-date-picker
              v-model="form.soldDate"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-row>
            <el-button type="primary" @click="submit">提交</el-button>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="变种信息" name="second">
          <div class="attrContainer">
            <div>
              <h3>变种列表</h3>
              <attrDetail
                v-if="attrPickShow"
                :parentSku="form.parentSku"
                :baseDetail="currentCategoryAttr"
                :VariType="form.VariType"
                :attrList="form.childAttr"
                
                @childChange="handleChidChange"
                @pickedAttr="handleVariType"
              ></attrDetail>
            </div>
            <div v-if="form.spiderChild.length">
              <h3>采集变种信息</h3>
              <spiderAttrEdit
                @editCallback="reSpiderChild"
                :parentSku="form.parentSku"
                :formData="form.spiderChild"
              ></spiderAttrEdit>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="图片信息" name="third">
          <el-form-item label="主图链接1">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="form.mainImgUrl1" placeholder="主图片1链接"></el-input>
            </el-col>
            <el-col :span="6">
              <el-tooltip class="item" effect="dark"  placement="top">
               <div slot="content">
                <div class="imgWrap">
                <img :src="form.mainImgUrl1" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
            </el-col>
          </el-row>
            
          </el-form-item>
         <el-form-item label="主图链接2">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="form.mainImgUrl2" placeholder="主图片2链接"></el-input>
            </el-col>
            <el-col :span="6">
              <el-tooltip class="item" effect="dark"  placement="top">
               <div slot="content">
                <div class="imgWrap">
                <img :src="form.mainImgUrl2" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
            </el-col>
          </el-row>
            
          </el-form-item>
          <el-form-item label="主图链接2">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="form.mainImgUrl2" placeholder="主图片2链接"></el-input>
            </el-col>
            <el-col :span="6">
              <el-tooltip class="item" effect="dark"  placement="top">
               <div slot="content">
                <div class="imgWrap">
                <img :src="form.mainImgUrl2" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
            </el-col>
          </el-row>
            
          </el-form-item>
          <el-form-item label="主图链接3">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="form.mainImgUrl3" placeholder="主图片3链接"></el-input>
            </el-col>
            <el-col :span="6">
              <el-tooltip class="item" effect="dark"  placement="top">
               <div slot="content">
                <div class="imgWrap">
                <img :src="form.mainImgUrl3" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
            </el-col>
          </el-row>
            
          </el-form-item>
          <el-form-item label="主图链接4">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="form.mainImgUrl4" placeholder="主图片4链接"></el-input>
            </el-col>
            <el-col :span="6">
              <el-tooltip class="item" effect="dark"  placement="top">
               <div slot="content">
                <div class="imgWrap">
                <img :src="form.mainImgUrl4" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
            </el-col>
          </el-row>
            
          </el-form-item>
          <el-form-item label="主图链接5">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="form.mainImgUrl5" placeholder="主图片5链接"></el-input>
            </el-col>
            <el-col :span="6">
              <el-tooltip class="item" effect="dark"  placement="top">
               <div slot="content">
                <div class="imgWrap">
                <img :src="form.mainImgUrl5" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
            </el-col>
          </el-row>
            
          </el-form-item>
          <el-form-item label="主图链接6">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="form.mainImgUrl6" placeholder="主图片6链接"></el-input>
            </el-col>
            <el-col :span="6">
              <el-tooltip class="item" effect="dark"  placement="top">
               <div slot="content">
                <div class="imgWrap">
                <img :src="form.mainImgUrl6" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
            </el-col>
          </el-row>
            
          </el-form-item>
          <el-form-item label="主图链接7">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="form.mainImgUrl7" placeholder="主图片7链接"></el-input>
            </el-col>
            <el-col :span="6">
              <el-tooltip class="item" effect="dark"  placement="top">
               <div slot="content">
                <div class="imgWrap">
                <img :src="form.mainImgUrl7" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
            </el-col>
          </el-row>
            
          </el-form-item>
          <el-form-item label="主图链接8">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="form.mainImgUrl8" placeholder="主图片8链接"></el-input>
            </el-col>
            <el-col :span="6">
              <el-tooltip class="item" effect="dark"  placement="top">
               <div slot="content">
                <div class="imgWrap">
                <img :src="form.mainImgUrl8" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>   
    </el-tooltip>
            </el-col>
          </el-row>
            
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="图片管理" name="four">
          <el-upload
  action="http://www.amazonvvip.com/api/uploadImg"
  list-type="picture-card"
  :file-list="newImg"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  :on-success="handleUpload">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="imgDialog">
  <img width="100%" :src="dialogImageUrl">
</el-dialog>
<div class="urlList">
<span v-for="(item,index) of newImg" :key="index">上传图片链接{{index+1}}: {{item.response.data.url}}</span>
</div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </section>
</template>
<script>
import spiderAttrEdit from "./common/spiderAttrEdit";
import attrDetail from "./common/attrDetail";
import categoryTypeNode from "./common/categoryTypeNode";
import countrySelect from "./common/countrySelect";
import { regions, attrData } from "@/common/options.js";
import { categoryApi, merchan, translateApi } from "@/api";
import { mapState } from "vuex";
export default {
  components: { countrySelect, categoryTypeNode, attrDetail, spiderAttrEdit },
  data() {
    return {
      imgDialog:false,
       dialogImageUrl: '',
        dialogVisible: false,
      activeName: "first",
      //固定数据
      attrData: attrData,
      //是否显示增加变种选择
      radioShow: true,
      newImg:[],
      dialogImageUrl:'',
      form: {
        parentSku: "",
        brand: "",
        country: "",
        Manufacturer: "",
        //当前选择的分类ID
        categoryType: "",
        //分类路径
        categorySelectPath: [],
        //选择的分类类型
        categoryTypeText: "",
				parentCategoryTypeId:'',
        //是否有变种
        hasVarieta: 0,
        //当前选择的变种
        VariType: "",
        status:'',
        //产品名称
        merChanName: "",
        productType: "",
        quantity: 500,
        ean: "",
        model: "",
        price: "",
        keyword: "",
        description: "",
        point1: "",
        point2: "",
        point3: "",
        point4: "",
        point5: "",
        //发布日期
        soldDate: this.formatDate(new Date()),
        mainImgUrl1: "",
        mainImgUrl2: "",
        mainImgUrl3: "",
        mainImgUrl4: "",
        mainImgUrl5: "",
        mainImgUrl6: "",
        mainImgUrl7: "",
        mainImgUrl8: "",
        //变种
        childAttr: [],
        //采集得到的数据
        spiderChild: []
      },
      rules: {
        country: [
          {
            required: true,
            message: "站点必选",
            trigger: "change"
          }
        ],
        Manufacturer: [
          {
            required: true,
            message: "厂家必填",
            trigger: "blur"
          }
        ],
        categoryType: [
          {
            required: true,
            message: "分类目录必选",
            trigger: "change"
          }
        ],
        merChanName: [
          {
            required: true,
            message: "产品名称必填",
            trigger: "blur"
          }
        ],
        productType: [
          {
            required: true,
            message: "产品分类必填",
            trigger: "change"
          }
        ],
        price: [
          {
            required: true,
            message: "价格必填",
            trigger: "blur"
          }
        ],
        quantity: [
          {
            required: true,
            message: "数量必填",
            trigger: "blur"
          }
        ],
        keyword: [
          {
            required: true,
            message: "关键字必填",
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: "描述必填",
            trigger: "blur"
          }
        ],
        point1: [
          {
            required: true,
            message: "重点必填",
            trigger: "blur"
          }
        ],
        point2: [
          {
            required: true,
            message: "重点必填",
            trigger: "blur"
          }
        ],
        point3: [
          {
            required: true,
            message: "重点必填",
            trigger: "blur"
          }
        ],
        point4: [
          {
            required: true,
            message: "重点必填",
            trigger: "blur"
          }
        ],
        point5: [
          {
            required: true,
            message: "重点必填",
            trigger: "blur"
          }
        ]
      },

      //当前分类如果存在多个属性
      splitCategoryTypeAttrOptions: [],
      pickSpiltCategoryTypeAttr: "",
      //分类的变种信息原始数据
      originAttrData: [],
      //筛选组合成的当前分类的数据
      currentCategoryAttr: {},
      //是否显示变种编辑
      attrPickShow: false
    };
  },
  mounted() {
    this.checkQuery();
  },
  computed: {
    ...mapState(["userInfo"])
  },
  watch: {
    'form.country'(val){
      if(val){
        this.form.status = this.initStatusFormCountry(val)
      }
    },
    async "form.categoryTypeText"(val) {
      if (!val) {
        return;
      }
      const params = {
        site: this.form.country,
        categoryType: val
      };
      await this.fetchAttrData(params);
      this.initAttrOptions();
    },
    // currentCategoryAttr:{
    //   deep:true,
    //   handler(val){
    //     if(Object.keys(val).length !== 0){
    //       this.attrPickShow = true
    //     }else{
    //       this.attrPickShow = false
    //     }
    //   }
    // },
    "form.hasVarieta"(val) {
      if (val) {
        this.attrPickShow = true;
      } else {
        this.attrPickShow = false;
      }
    }
  },
  methods: {
    handleUpload(response,file,fileList){
      debugger
      if(response.code == 1){
        this.$message.success('图片上传成功')
        this.newImg = fileList
      }
      
    },
    uploadImg(params){
      params
      debugger
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.imgDialog = true;
      },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    initStatusFormCountry(country){
       if(country == 'de'){
           return 'Neu'
       }
       if(country == 'uk'){
           return 'New'
       }
       if(country == 'fr'){
           return 'Neuf'
       }
       if(country == 'it'){
           return 'Nuovo'
       }
       if(country == 'es'){
           return 'Nuevo'
       }
    },
    //翻译信息
    handleVariType(val){
      this.form.VariType = val
    },
    async translateForm() {
      let arr = [
        "merChanName",
        "description",
        "point1",
        "point2",
        "point3",
        "point4",
        "point5"  
      ];
      let childArr = [
        "sku",
        "price",
        "quantity",
        "imgurl",
        "ean",
        "size_map",
        "size_name"
      ];
      let promiseArr = [];
      for (let key in this.form) {
        if (arr.indexOf(key) !== -1) {
          let promise = new Promise((reslove, reject) => {
            const params = {
              country: this.form.country,
              query: this.form[key]
            };
            translateApi
              .translate(params)
              .then(res => {
                this.form[key + "trans"] = res.data;
                reslove();
              })
              .catch(() => {
                reject();
              });
          });
          promiseArr.push(promise);
        }
      }
      if (this.form.childAttr.length) {
        for (let child of this.form.childAttr) {
          for (let key in child) {
            if (childArr.indexOf(key) == -1) {
              let promise = new Promise((reslove, reject) => {
                const params = {
                  country: this.form.country,
                  query: child[key]
                };
                translateApi
                  .translate(params)
                  .then(res => {
                    child[key + "trans"] = res.data;
                    reslove();
                  })
                  .catch(() => {
                    reject();
                  });
              });
              promiseArr.push(promise);
            }
          }
        }
      }
      await Promise.all(promiseArr);
    },
    handleChidChange(val) {
      this.form.childAttr = val;
    },
    //提交数据
    async submit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "翻译上传中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          if (this.$route.query.edit) {
           
              await this.translateForm();
            
            merchan
              .updateMer(this.form)
              .then(res => {
                if (res.code == 1) {
                  this.$Message.success("发布成功");
                  loading.close();
                } else {
                  this.$Message.error("发布失败");
                  loading.close();
                }
              })
              .catch(() => {
                this.$Message.error("发布失败");
                loading.close();
              });
          } else {
            await this.translateForm();
            merchan
              .addMer(this.form)
              .then(res => {
                if (res.code == 1) {
                  this.$Message.success("发布成功");
                  loading.close();
                } else {
                  this.$Message.error("发布失败");
                  loading.close();
                }
              })
              .catch(() => {
                this.$Message.error("发布失败");
                loading.close();
              });
          }
        } else {
          this.$Message.error("字段填写错误！");
          return false;
        }
      });
    },
    checkQuery() {
      if (this.$route.query.edit) {
        const form = JSON.parse(sessionStorage.getItem("currentMer"));
        this.form = Object.assign({}, this.form, form);
      } else {
        this.form.brand = this.userInfo.brand;
        this.form.parentSku = (this.form.brand + "-" + this.$uuid()).slice(0,35)
        this.form.Manufacturer = this.userInfo.Manufacturer;
      }
    },
    reSpiderChild(data) {
      this.form.childAttr = data;
      this.attrPickShow = true
    },
    formatDate(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      m < 10 ? (m = "0" + m) : m;
      d < 10 ? (d = "0" + d) : d;
      return `${y}-${m}-${d}`;
    },
    async handlePicked(val) {
      this.$set(this.form, "categoryTypeText", "");
      this.$set(this.form, "productType", "");
      this.splitCategoryTypeAttrOptions = [];
      const checkType = val;
      this.form.categoryType = checkType.categoryId;
			this.form.parentCategoryTypeId = checkType.nodePathId.split('/')[0]
      if (checkType.categoryType.indexOf(",") !== -1) {
        //分类存在多个属性的情况,需要再次选择
        this.splitCategoryTypeAttrOptions = checkType.categoryType.split(",");
        return;
      }
      this.$set(this.form, "categoryTypeText", checkType.categoryType);
      const params = {
        site: val.site,
        categoryType: val.categoryType
      };
      await this.fetchAttrData(params);
      this.initAttrOptions();
    },
    //存在多属性情况下

    //获取变种属性信息
    async fetchAttrData(params) {
      const res = await categoryApi.getCategoryList(params);
      this.originAttrData = res.data;
    },
    //初始化变种信息
    initAttrOptions() {
      let skuAttTheme = "";
      let skuAttThemeArr = [];
      let skuAttThemeReal = {};
      let skuEndemicAttr = [];
      let product_type = [];
      this.currentCategoryAttr = {};
      this.originAttrData.forEach(el => {
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
      if (skuAttTheme) {
        skuAttTheme.values = JSON.parse(skuAttTheme.values);
        this.currentCategoryAttr.skuAttTheme = skuAttTheme;
        this.radioShow = true;
      } else {
        this.radioShow = false;
      }
      this.currentCategoryAttr.skuEndemicAttr = skuEndemicAttr;
      this.currentCategoryAttr.skuThemeAttr = skuAttThemeReal;
      this.currentCategoryAttr.product_type = product_type;
    }
  }
};
</script>
<style lang="css">
.attrContainer {
  display: flex;
  flex-direction: column;
}
.el-upload-list__item {
      transition: none !important;
    }
    .imgContainer{
      display: flex;
      align-items: center;
      padding: 40px;
    }
    .imgWrap{
      width: 200px;
      height: 200px;
      margin-bottom: 15px;
      margin-right: 15px;
    }
    .imgWrap img{
      display: block;
      width: 100%;
      height: 100%;
    }
   
</style>
