<template>
  <section>
    <el-row class="row">
      <el-select v-model="selectAttr" @change="handleChange" placeholder="请选择变种属性" size="mini">
        <el-option
          v-for="(value,index) in baseDetail.skuAttTheme.values"
          :key="index"
          :value="value"
          :label="value"
        ></el-option>
      </el-select>
      <el-button type="primary" size="mini">生成变种类型</el-button>
    </el-row>
    <template v-if="allInputOption.length"> 
      <el-row class="row" v-for="(item,index) of allInputOption" :key="index">
        <el-col :span="5"><el-tag type="warning">属性名称:{{item.attributeName}}</el-tag> <el-tag type="warning">属性类型:{{item.attributeId}}</el-tag></el-col>
        <el-col :span="15">
          <el-tag
            :key="tagIndex"
            v-for="(tag,tagIndex) of item.addValues"
            closable
            :disable-transitions="false"
            @close="handleClose(item,tagIndex)"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
             v-model="input[item.attributeName]"
            :ref="item.attributeName+index"
            size="small"
            @keyup.enter.native="handleInputConfirm(item,$event)"
            @blur="handleInputConfirm(item,$event)"
          ></el-input>
          <el-button class="button-new-tag" size="small" @click="showInput(item,index)">添加变种</el-button>
        </el-col>
      </el-row>
    </template>
    <template v-if="allSelectOption.length">
        <el-row class="row" v-for="(item,index) of allSelectOption" :key="index">
          <el-col :span="5"><el-tag type="warning">属性名称:{{item.attributeName}}</el-tag> <el-tag type="warning">属性类型:{{item.attributeId}}</el-tag></el-col>
          <el-col :span="5">
            <el-select v-model="item.addValues" size="mini" multiple clearable placeholder="请选择变种类型" @change="$set(item,item.addValues,$event)">
                <el-option v-for="option in JSON.parse(item.values)" :key="option" :value="option" :label="option"></el-option>
            </el-select>
          </el-col>
        </el-row>
    </template>

  </section>
</template>
<script>
import { attrData } from "@/common/options.js";
export default {
  props: {
    baseDetail: {
      type: Object,
      default() {
        return {};
      }
    },
    VariType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selectAttr: "",
      attrObj: {},
      pickedAttr: [],
      inputValue: "",
      dynamicTags: ["标签一", "标签二", "标签三"],
      //所有输入属性的变种
      allInputOption: [],
      //所有选择属性的变种
      allSelectOption: [],
      //当前增加的所有输入属性变种
      allInputValues:[],
      //当前增加的所有选择属性变种
      allSelectValues:[],
      input:{}
    };
  },

  methods: {
    handleClose(item,index) {
        debugger
        item.addValues.splice(index,1)
      
    },
    showInput(item,index) {
      this.$nextTick(_ => {
        this.$refs[item.attributeName+index].$refs.input.focus();
      });
    },

    handleInputConfirm(item,e) {  
      if (e.target.value) {
        item.addValues.push(e.target.value)
      }
      this.inputVisible = false;
      this.input[item.attributeName] = ''
    },
    handleChange(val) {
      this.allInputOption = [];
      this.allSelectOption = [];
      let skArr = [];
      let currentSkarr = [];
      const attrObj = this.attrObj;
      debugger;
      for (let key in attrObj.skuThemeAttr) {
        delete attrObj.skuThemeAttr[key].addValues;
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
              attrObj.skuThemeAttr[name] &&
              currentSkarr.indexOf(attrObj.skuThemeAttr[name]) === -1
            ) {
              currentSkarr.push(attrObj.skuThemeAttr[name]);
            }
          });
        }
      });
      this.pickedAttr = currentSkarr;
      debugger
      this.pickedAttr.forEach(el => {
          
        if (el.attributeType == "select") {
            el.addValues = []
            debugger;
           
            
          this.allSelectOption.push(el);
        }
        if (el.attributeType == "input") {
            el.addValues = []
            this.input[el.attributeName] = ''
          this.allInputOption.push(el);
        }
      });
      
      
    },
    selectChange(item,e){
        item.addValues = e
        debugger
    }
  },
  mounted() {
    this.attrObj = JSON.parse(JSON.stringify(this.baseDetail));
  },
  watch: {
    baseDetail: {
      deep: true,
      handler(val) {
        this.attrObj = JSON.parse(JSON.stringify(val));
        debugger;
      }
    }
  }
};
</script>
<style lang="css">
.row {
  margin: 20px 0;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>