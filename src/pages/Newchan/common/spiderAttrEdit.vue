<template>
	<section>
		<el-row :gutter="20" class="tableContainer">
			<el-col :span="1">
				<el-tag>选择name对应的属性</el-tag>
			</el-col>
			<el-col :span="2">
				<el-select v-model="attrMap.name" placeholder="选择name对应属性">
					<el-option v-for="(item,index) of options" :key="index" :label="item" :value="item"></el-option>
				</el-select>
			</el-col>
				<el-col :span="1">
				<el-tag>选择skuName对应的属性</el-tag>
			</el-col>
			<el-col :span="2">
				<el-select v-model="attrMap.skuName" placeholder="选择skuName对应属性">
					<el-option v-for="(item,index) of options" :key="index" :label="item" :value="item"></el-option>
				</el-select>
			</el-col>
			<el-col :span="2">
				<el-col :span="2">
					<el-input placeholder="筛选字符" v-model="transTarget"></el-input>
				</el-col>
				<el-col :span="2">
					<el-input placeholder="替换字符" v-model="transRuslut"></el-input>
				</el-col>
				<el-col :span="2">
					<el-button type="success" @click="replaceTarget">替换</el-button>
				</el-col>
			</el-col>
		</el-row>
		<template v-if="spiderData.length">
				<el-table :data="spiderDate">
					<el-table-column label="SKU">
						<template slot-scope="scope">
							<el-input v-model="scope.row.sku" disabled></el-input>
						</template>
					</el-table-column>
					<el-table-column label="EAN(EAN码)">
						<template slot-scope="scope">
							<el-input v-model="scope.row.ean" disabled></el-input>
						</template>
					</el-table-column>
					<el-table-column label="name(属性标题)">
						<template slot-scope="scope">
							<el-tag>{{attrMap.name}}</el-tag>
							<el-input v-model="scope.row.name"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="skuName(属性)">
						<template slot-scope="scope">
							<el-tag>{{attrMap.skuName}}</el-tag>
							<el-input v-model="scope.row.skuName"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="price(价格)">
						<template slot-scope="scope">
							<el-input v-model="scope.row.price"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="quality(数量)">
							<template slot-scope="scope">
							<el-input v-model="scope.row.quality"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="imgurl(变种图片)">
						<template slot-scope="scope">
							<el-input v-model="scope.row.imgurl"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="danger" @click="removeChild(scope.$index)">移除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row>
					<el-button type="primary" @click="submitData">保存</el-button>
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
			this.spiderData = JSON.parse(dataText.replace(reg,`${this.transRuslut}`))
		},
		resetAttrMap(){
			this.attrMap = {
				skuName:'',
				name:''
			}
		},
		submitData(){
			const newChild = spiderData.map(el => {
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
				sku:'',
				ean:''
			}
			return data.map(el => Object.assign({},el,baseInfo))
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
</style>