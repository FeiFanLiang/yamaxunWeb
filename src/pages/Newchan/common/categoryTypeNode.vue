<template>
  <el-cascader style="width:800px" ref="case" :props="prop" :options="options" v-model="pickArray" clearable  @change="handleChange" placeholder="选择商品分类目录"></el-cascader>
</template>
<script>
import { categoryApi } from "@/api";
export default {
  props: {
    site: {
      type: String,
      default: ""
    },
    select: {
      type: String,
      default: ""
    },
    picked:{
        type:Array,
        default(){
            return []
        }
    }
  },
  data() {
      let that = this;
    return {
      options: [{
          value:'请选择',
          label:'请选择'
      }],
      prop: {
        lazy: true,
        lazyLoad(node, resolve) {
            
          if (!node.children.length && node.data.leafCategory === 0) {
            const params = {
              site: node.data.site,
              parentId: node.data.id
            };
            categoryApi.getCategoryList(params).then(res => {
              const loadNode = res.data.map(el => {
                  
                if (el.leafCategory === 0) {
                  el.children = [];
                }
                el.leaf= el.leafCategory == 1
                return el;
              });

              resolve(loadNode);
            });
          }else{
            resolve(node.data.children)
          }
        }
      }
    };
  },
  methods: {
    handleChange(val) {
      let current = this.$refs['case'].getCheckedNodes();
      debugger
      this.$emit('picked',current[0].data)
    },
    
    //获取第一级
    async getCategoryFirst(params){
        let res = await categoryApi.getCategoryList(params)
        return res.data.map(el => {
            el.children = [];
            return el;
        })
    },
    //编辑模式下加载已选项
    async editPickLoad(pathArr){
      
        let options,site = this.site
        const params = {
            site:site
        }
        
        options = await this.getCategoryFirst(params)
       
        let parentCate = options
        let current = options
        for(let i=1,l=pathArr.length;i<l;i++){
          const params = {
            site:site,
            parentId:pathArr[i-1]
          }
          
          let res = await categoryApi.getCategoryList(params)
          if(!res.data.length) return
          let childCate = res.data
          childCate.forEach(el => {
            el.leaf= el.leafCategory == 1
          })
          current.forEach(el => {
            if(el.id == pathArr[i-1]){
              el.children = childCate
            }
            el.leaf= el.leafCategory == 1
          })
          parentCate
          current = childCate
         
        }
        this.options = parentCate
       
       
    }
  },
  computed:{
    pickArray:{
      get(){
        return [...this.picked]
      },
      set(val){
        this.$emit('input',val)
      }
    }
  },
  watch: {
      picked:{
          deep:true,
          handler(val){
              if(val.length){
                this.editPickLoad()
              }      
          }
      },
    site(val) {
        
      const params = {
        site: val
      };
      categoryApi.getCategoryList(params).then(res => {
         
        this.options = [];
        
        const node = res.data.map(el => {
          el.children = [];
          return el;
        });
        this.options = node;
        
      });
    }
  }
};
</script>