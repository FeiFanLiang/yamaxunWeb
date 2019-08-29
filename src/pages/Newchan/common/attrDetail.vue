<template>
  <section>
    <el-row class="row">
      <el-select v-if="baseDetail.skuAttTheme" v-model="selectAttr" @change="handleChange" placeholder="请选择变种属性" size="mini">
        <el-option
          v-for="(value,index) in baseDetail.skuAttTheme.values"
          :key="index"
          :value="value"
          :label="value"
        ></el-option>
      </el-select>
      <el-button type="primary" size="mini" @click="initChildAttrList" v-if="show">生成变种类型</el-button>
    </el-row>
    <template v-if="allInputOption.length && show"> 
      <el-row class="row" v-for="(item,index) of allInputOption" :key="index">
        <el-col :span="5"><el-tag type="warning">属性名称:{{item.attributeName}}</el-tag> <el-tag type="warning">属性类型:{{item.attributeId}}</el-tag></el-col>
        <el-col :span="15">
          <el-tag
            :key="tag"
            v-for="(tag,tagIndex) of item.addValues"
            closable
            :disable-transitions="false"
            @close="handleClose(item,tagIndex,index)"
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
    <template v-if="allSelectOption.length && show">
        <el-row class="row" v-for="item of allSelectOption" :key="item.attributeName">
          <el-col :span="5"><el-tag type="warning">属性名称:{{item.attributeName}}</el-tag> <el-tag type="warning">属性类型:{{item.attributeId}}</el-tag></el-col>
          <el-col :span="5">
            <el-select v-model="item.addValues" size="mini" multiple clearable placeholder="请选择变种类型" @change="$set(item,item.addValues,$event)">
                <el-option v-for="option in JSON.parse(item.values)" :key="option" :value="option" :label="option"></el-option>
            </el-select>
          </el-col>
        </el-row>
    </template>
		<template v-if="formData.length">
		
				<el-table :data="formData" border stripe size="mini">
					<template v-for="(value,key) in formData[0]">
						<el-table-column :label="translateColumnLabel(key)" :key="key" align="center">
							<template slot-scope="scope">
								<el-input size="mini" :disabled="editAble(key)" v-model="scope.row[key]" clearable @change="emitForm"></el-input>
							</template>
						</el-table-column>
					</template>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="danger" size="mini" @click="removeChild(scope.$index)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
		</template>
  </section>
</template>
<script>
import { attrData,tableColumn } from "@/common/options.js";
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
    },
		attrList:{
			type:Array,
			default(){
				return []
			}
		},
		parentSku:{
			type:String,
			default:''
		},
    show:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
			tableColumn:tableColumn,
      selectAttr: "",
      attrObj: {},
      pickedAttr: [],
      inputValue: "",
      //所有输入属性的变种
      allInputOption: [],
      //所有选择属性的变种
      allSelectOption: [],
      input:{},
			//生成变种数据
			formData:[],
			//不可编辑
			noEditKey:{
				sku:true
			}
    };
  },

  methods: {
		emitForm(){
			this.$emit('childChange',this.formData)
		},
		//重置不可编辑属性
		initNoEditKey(){
			this.noEditKey = {
				sku:true,
				ean:true
			},
			this.formData = []
		},
		//移除单条变种数据
		removeChild(index){
			this.formData.splice(index,1)
		},
		//生成变种数据
		initChildAttrList(){
			this.initNoEditKey()
			const skuEndemicAttr = this.attrObj.skuEndemicAttr
			let baseInfo = {
				'sku': "",
        'price': "",
        'quantity': "",
        'imgurl':''
			}
			
			const picked = [...this.allInputOption,...this.allSelectOption].filter(el => el.addValues.length)
			if(!picked.length){
				return
			}
			
			//编辑的属性值和变种类型
			let attrList = []
			picked.forEach(el => {
				let fixArr = []
				el.addValues.forEach(value => {
					let obj = {}
					obj[el.attributeId] = value
					if(!this.noEditKey[el.attributeId]) this.noEditKey[el.attributeId] = true
					fixArr.push(obj)
				})
				if(attrList.length){
					let current = []
					attrList.forEach(attrObj => {
						fixArr.forEach(fix => {
							let obj = Object.assign({},attrObj,fix)
							current.push(obj)
						})
					})
					attrList = current
				}else{
					attrList = fixArr
				}
			})
			
			//添加基本属性和附加属性
			if (skuEndemicAttr) {
        skuEndemicAttr.forEach(endemic => {
          if (baseInfo[endemic.attributeId] == undefined) {
            baseInfo[endemic.attributeId] = "";
          }
        });
      }
			this.formData = attrList.map(el => Object.assign({},baseInfo,el)).map((el,index) => {
				let currentindex = index < 9 ? "0" + (index + 1) : index + 1;
        el.sku = `${this.parentSku}-${currentindex}`;
				return el
			})
		},
		editAble(key){
			if(this.noEditKey[key]){
				return true
			}
			return false
		},
		translateColumnLabel(key){
			let r = this.tableColumn.find(el => el.en == key)
			
			
			if(r){
				
				return r.zh
			}else{
				
				return key
			}
		},
    handleClose(item,tagIndex,index) {
        item.addValues.splice(tagIndex,1)
				this.$set(this.allInputOption,index,item)
    },
    showInput(item,index) {
      this.$nextTick(_ => {
				
        this.$refs[item.attributeName+index][0].$refs.input
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
      const atrr = this.baseDetail.skuAttTheme.attributeName
      this.$emit('pickedAttr',atrr)
      this.allInputOption = [];
      this.allSelectOption = [];
      let skArr = [];
      let currentSkarr = [];
      const attrObj = this.attrObj;
      
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
     
      this.pickedAttr.forEach(el => {
          
        if (el.attributeType == "select") {
            el.addValues = []
          this.allSelectOption.push(el);
        }
        if (el.attributeType == "input") {
            el.addValues = []
          //  this.input[el.attributeName] = ''
          this.allInputOption.push(el);
        }
      });
      
      
    },
   
  },
  mounted() {
    this.attrObj = JSON.parse(JSON.stringify(this.baseDetail));
  },
  watch: {
    baseDetail: {
      deep: true,
      handler(val) {
        this.attrObj = JSON.parse(JSON.stringify(val));
				this.selectAttr = ''
				this.allInputOption= []
				this.allSelectOption = []
      }   
    },
		attrList:{
			deep:true,
			immediate:true,
			handler(val){
				this.formData = JSON.parse(JSON.stringify(val))
			}
		}
  },
	
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