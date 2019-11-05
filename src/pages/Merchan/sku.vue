<template>
    <div>
        <div>
            <el-row :gutter="20">
          <el-col :span="3">
            <el-input v-model="sku" placeholder="请输入sku码" size="mini"></el-input>
            
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="getList">查询</el-button>
          </el-col>
        </el-row>
        </div>
        
        <br/>

    <el-table :data="tableData" style="width: 100%">
    <el-table-column label="分类路径" prop="categorySelectPathText" align="center" show-overflow-tooltip></el-table-column>
    <el-table-column label="商品名称" prop="merChanName" align="center"></el-table-column>
      <el-table-column label="描述" show-overflow-tooltip prop="description" align="center"></el-table-column>
      <el-table-column label="品牌" show-overflow-tooltip prop="brand" align="center"></el-table-column>
      <el-table-column label="采购链接" show-overflow-tooltip prop="originLink" align="center"></el-table-column>
      <el-table-column label="操作"  align="center">
        <template slot-scope="scope">
        <el-button @click="link(scope.row.originLink)" size="mini">跳转</el-button>
      </template>
      </el-table-column>
      
  </el-table>
    </div>
</template>
<script>
import { merchan} from "@/api";
export default {
   data(){
       return {
            sku:'',
            targetUrl:'',
            loading:false,
            tableData:[]
       }
   },
    methods:{
        getList(){
            if(!this.sku){
                this.$Message.error('请输入sku码')
                return
            }
            this.loading = true
            merchan.linkSearch({
                sku:this.sku
            }).then((res) => {
                if(!res.data.length){
                    this.$Message.error('暂无搜索结果！')
                }
                this.tableData = [...res.data]
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        },
        link(url){
            window.open(url,'_blank'); 
        }
    }
}
</script>
