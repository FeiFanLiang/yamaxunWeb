<template>
	<section>
		<el-row :gutter="2" class="tableContainer" type="flex">
				<div class="item">
						<el-tag>选择name对应的属性</el-tag>
				</div>
				<div class="item">
					<el-select v-model="attrMap.name" placeholder="选择name对应属性" size="mini">
					<el-option v-for="(item,index) of options" :key="index" :label="item" :value="item"></el-option>
				</el-select>
				</div>
				<div class="item">
					<el-tag>选择skuName对应的属性</el-tag>
				</div>
				<div class="item">
					<el-select v-model="attrMap.skuName" placeholder="选择skuName对应属性" size="mini">
					<el-option v-for="(item,index) of options" :key="index" :label="item" :value="item"></el-option>
				</el-select>
				</div>
				<div class="item">
					<el-input placeholder="筛选字符" v-model="transTarget" size="mini"></el-input>
				</div>
				<div class="item">
					<el-input placeholder="替换字符" v-model="transRuslut" size="mini"></el-input>
				</div>
				<div class="item">
					<el-button type="success" @click="replaceTarget" size="mini">替换</el-button>
				</div>
			
				
			
		
			
		</el-row>
		<template v-if="spiderData.length">
				<el-table :data="spiderData" border stripe size="mini">
				<el-table-column type="expand" label="图片信息">
      <template slot-scope="props">
			 <el-form size="mini" label-position="left" class="demo-table-expand">
          <el-form-item label="图片1">
            <el-input v-model="props.imgurl1"></el-input>
			<el-tooltip class="item" effect="dark"  placement="top" v-if="props.imgurl1">
               <div slot="content">
                <div class="imgWrap">
                <img :src="props.row.imgurl1" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
          </el-form-item>
          <el-form-item label="图片2">
            <el-input v-model="props.imgurl2"></el-input>
			<el-tooltip class="item" effect="dark"  placement="top" v-if="props.imgurl2">
               <div slot="content">
                <div class="imgWrap">
                <img :src="props.row.imgurl2" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
          </el-form-item>
		  <el-form-item label="图片3">
            <el-input v-model="props.imgurl3"></el-input>
			<el-tooltip class="item" effect="dark"  placement="top" v-if="props.imgurl3">
               <div slot="content">
                <div class="imgWrap">
                <img :src="props.row.imgurl3" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
          </el-form-item>
		  <el-form-item label="图片4">
            <el-input v-model="props.imgurl4"></el-input>
			<el-tooltip class="item" effect="dark"  placement="top" v-if="props.imgurl4">
               <div slot="content">
                <div class="imgWrap">
                <img :src="props.row.imgurl4" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
          </el-form-item>
		  <el-form-item label="图片5">
            <el-input v-model="props.imgurl5"></el-input>
			<el-tooltip class="item" effect="dark"  placement="top" v-if="props.imgurl5">
               <div slot="content">
                <div class="imgWrap">
                <img :src="props.row.imgurl5" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
          </el-form-item>
		  <el-form-item label="图片6">
            <el-input v-model="props.imgurl6"></el-input>
			<el-tooltip class="item" effect="dark"  placement="top" v-if="props.imgurl6">
               <div slot="content">
                <div class="imgWrap">
                <img :src="props.row.imgurl6" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
          </el-form-item>
		  <el-form-item label="图片7">
            <el-input v-model="props.imgurl7"></el-input>
			<el-tooltip class="item" effect="dark"  placement="top" v-if="props.imgurl7">
               <div slot="content">
                <div class="imgWrap">
                <img :src="props.row.imgurl7" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
          </el-form-item>
		  <el-form-item label="图片8">
            <el-input v-model="props.imgur8"></el-input>
			<el-tooltip class="item" effect="dark"  placement="top" v-if="props.imgurl8">
               <div slot="content">
                <div class="imgWrap">
                <img :src="props.row.imgurl8" alt="">
                </div>
               </div>
      <el-button>图片预览</el-button>
    </el-tooltip>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
					<el-table-column label="name(属性标题)">
						<template slot-scope="scope">
							<el-tag v-if="attrMap.name">{{attrMap.name}}</el-tag>
							<el-input v-model="scope.row.name" size="mini"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="skuName(属性)">
						<template slot-scope="scope">
							<el-tag v-if="attrMap.skuName">{{attrMap.skuName}}</el-tag>
							<el-input v-model="scope.row.skuName" size="mini"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="price(价格)">
						<template slot-scope="scope">
							<el-input v-model="scope.row.price" size="mini"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="quality(数量)">
							<template slot-scope="scope">
							<el-input v-model="scope.row.quality" size="mini"></el-input>
						</template>
					</el-table-column>
					
					
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="danger" @click="removeChild(scope.$index)" size="mini">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row>
					<el-button type="primary" @click="submitData" size="mini">保存</el-button>
				</el-row>
		</template>
	</section>
</template>
<script>
export default { 
	props:{
		formData:{
			type:Array,
			default(){
				return []
			}
		},
		parentSku:{
			type:String,
			default:''
		}
	},
	data(){
		return {
			spiderData:[],
			attrMap:{
				skuName:'',
				name:''
			},
			transTarget:'',
			transRuslut:'',
			options:['color_name','size_map','color_map','size_name']
		}
	},
	methods:{
		replaceTarget(){
			const dataText = JSON.stringify(this.spiderData)
			const reg = new RegExp(this.transTarget,'g')
			if(this.transTarget.indexOf('?') !== -1 || this.transTarget.indexOf('/') !== -1 || this.transTarget.indexOf('|') !== -1){
				this.spiderData = this.spiderData.map(el => {
					return JSON.parse(JSON.stringify(el).replace(this.transTarget,this.transRuslut))
				})
			}else{
				this.spiderData = JSON.parse(dataText.replace(reg,`${this.transRuslut}`))
			}
			
		},
		resetAttrMap(){
			this.attrMap = {
				skuName:'',
				name:''
			}
		},
		submitData(){
			const newChild = this.spiderData.map(el => {
				let obj = {
					[this.attrMap.skuName]:el.skuName,
					[this.attrMap.name]:el.name,
					ean:el.ean,
					price:el.price,
					quality:el.quality,
					imgurl:el.imgurl,
					sku:el.sku
				}
				return obj
			})
			
			this.$emit('editCallback',newChild)
		},
		removeChild(index){
			this.spiderData.splice(index,1)
		},
		initFormData(data){
			this.resetAttrMap()
			let baseInfo = {
				sku:''
			}
			return data.map(el => Object.assign({},el,baseInfo)).map((el,index) => {
				let currentindex = index < 9 ? "0" + (index + 1) : index + 1;
				el.sku = `${this.parentSku}-${currentindex}`;
				return el
			})	
		}
	},
	watch:{
		formData:{
			deep:true,
			immediate:true,
			handler(val){
				if(val.length){
					this.spiderData = this.initFormData(val)
				}
				
			}
		},
	},
	computed:{
		
	}
}
</script>
<style lang="css">
	.tableContainer{
		margin: 30px 0;
	}

	.item{

		margin-right: 20px;
	}
</style>