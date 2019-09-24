<template>
 <el-cascader  id="cascader" v-loading="load" style="width:800px" ref="case" :props="prop" :options="options" v-model="pickArray" clearable @change="handleChange" placeholder="选择商品分类目录"></el-cascader>
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
   value: {
    type: Array,
    default() {
     return [];
    }
   }
  },
  data() {
   let that = this;
   return {
    options: [
     {
      value: "请选择",
      label: "请选择"
     }
    ],
    load: false,
    firstLoad: true,
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
         el.leaf = el.leafCategory == 1;
         return el;
        });

        resolve(loadNode);
       });
      } else {
       resolve(node.data.children);
      }
     }
    }
   };
  },
  methods: {
   handleChange(val) {
    let current = this.$refs["case"].getCheckedNodes();
    
    this.$emit("picked", current[0].data);
   },

   //获取第一级
   async getCategoryFirst(params) {
    let res = await categoryApi.getCategoryList(params);
    return res.data.map(el => {
     el.children = [];
     return el;
    });
   },
   //编辑模式下加载已选项
   async editPickLoad(pathArr) {
    this.load = true;
    let options,
     site = this.site;
    const params = {
     site: site
    };

    options = await this.getCategoryFirst(params);

    let parentCate = options;
    let current = options;
    for (let i = 1, l = pathArr.length; i < l; i++) {
     const params = {
      site: site,
      parentId: pathArr[i - 1]
     };

     let res = await categoryApi.getCategoryList(params);
     if (!res.data.length) return;
     let childCate = res.data;
     childCate.forEach(el => {
      el.leaf = el.leafCategory == 1;
     });
     current.forEach(el => {
      if (el.id == pathArr[i - 1]) {
       el.children = childCate;
      }
      el.leaf = el.leafCategory == 1;
     });
     parentCate;
     current = childCate;
    }
    this.options = parentCate;
    this.load = false;
   }
  },
  computed: {
   pickArray: {
    get() {
     return [...this.value];
    },
    set(val) {
     this.firstLoad = false;
     this.$emit("input", val);
    }
   }
  },
  watch: {
   value: {
    deep: true,
    handler(newVal, oldVal) {
    
     if (newVal.length && !oldVal.length && this.firstLoad) {
      this.editPickLoad(newVal);
     }
    }
   },
   site(val) {
    const params = {
     site: val
    };
    this.load = true;
    categoryApi
     .getCategoryList(params)
     .then(res => {
      this.options = [];

      const node = res.data.map(el => {
       el.children = [];
       return el;
      });
      this.options = node;
      this.load = false;
     })
     .catch(() => {
      this.load = false;
     });
   }
  }
 };
</script>
<style lang="css">
   .el-cascader-node__label{
    max-width: 350px;
  }
</style>