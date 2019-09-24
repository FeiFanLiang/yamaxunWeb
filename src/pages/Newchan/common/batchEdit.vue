<template>
  <div>
    <el-form :model="form">
      <el-form-item label="站点选择">
        <countrySelect v-model="form.country"></countrySelect>
      </el-form-item>
      <el-form-item label="分类信息">
        <categoryTypeNode
          :site="form.country"
          v-model="form.categorySelectPath"
          @picked="handlePicked"
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
      <el-form-item label="变种属性">
        <el-select v-if="currentCategoryAttr.skuAttTheme" v-model="form.VariType" @change="handleChange" placeholder="请选择变种属性" size="mini">
        <el-option
          v-for="(value,index) in currentCategoryAttr.skuAttTheme.values"
          :key="index"
          :value="value"
          :label="value"
        ></el-option>
      </el-select>
      </el-form-item>
    </el-form>

    
  </div>
</template>
<script>
import { regions, attrData } from "@/common/options.js";
import { categoryApi, merchan, translateApi } from "@/api";
import countrySelect from "./countrySelect";
import categoryTypeNode from "./categoryTypeNode";
export default {
  props: {
    site: {
      type: String,
      default: ""
    }
  },
  components: {
    categoryTypeNode,
    countrySelect
  },
  data() {
    return {
        
      form: {
        country: "",
        categoryTypeText:'',
        categorySelectPath: [],
        categorySelectPathText: "",
        productType:'',
        VariType:''
      },
      
      //存在多个分类情况下选择
      splitCategoryTypeAttrOptions: [],
      currentCategoryAttr:{}
    };
  },
  mounted(){
      this.form.country = this.site
  },
  watch:{
      async "form.categoryTypeText"(val) {
         this.$set(this.form,'VariType',"")
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
  },
  methods: {
    async handlePicked(val) {
      this.$set(this.form, "categoryTypeText", "");
      this.$set(this.form, "productType", "");
      this.$set(this.form,'VariType',"")
      this.splitCategoryTypeAttrOptions = [];
      const checkType = val;
      this.form.categoryType = checkType.categoryId;
      this.form.categorySelectPathText = checkType.nodePath;
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
    async fetchAttrData(params) {
      const res = await categoryApi.getCategoryList(params);
      this.originAttrData = res.data;
    },
    handleChange(val){
        this.$emit('done',this.form)
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