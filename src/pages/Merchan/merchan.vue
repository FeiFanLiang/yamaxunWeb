<template>
  <section>
    <Row :gutter="2">
     
    
      <Col :span="2">
        <Input size="small" type="text" v-model="query.merChanName" placeholder="按商品名称搜索"></Input>
      </Col>
      <Col :span="2">
      <el-date-picker
      size="mini"
      v-model="query.formatCreatTime"
      type="date"
      placeholder="选择日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd">
    </el-date-picker>
        
      </Col>
     <Col :span="2">
     <el-select v-model="query.country" placeholder="请选择国家" size="mini">
       <el-option :value="'uk'" :label="'英国'"></el-option>
       <el-option :value="'de'" :label="'德国'"></el-option>
       <el-option :value="'fr'" :label="'法国'"></el-option>
       <el-option :value="'it'" :label="'意大利'"></el-option>
       <el-option :value="'es'" :label="'西班牙'"></el-option>
     </el-select>
      
     </Col>
     <Col :span="2">
      <el-input placeholder="请输入导出次数" size="mini" v-model.number="query.exportTime"></el-input>
     </Col>
      <Col :span="1">
        <Button type="info" size="small" @click="fetchData">搜索</Button>
      </Col>
      
      
       <template>
            <Col :span="1">
        <Button type="success" size="small" @click="exportCsv">导出表格</Button>
      </Col>
           <Col :span="1" v-if="selfList">
        <Button type="info" size="small" @click="addNew">发布商品</Button>
      </Col>
        <Col :span="1" v-if="selfList">
        <Button type="error" size="small" @click="bathDel">批量删除</Button>
      </Col>
   
      </template>
    </Row>
    <br />
    <el-table :data="formList" v-loading="loading"  @selection-change="bathSelect" size="mini">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column label="站点" prop="country" align="center"></el-table-column>
      <el-table-column label="路径" prop="categorySelectPathText" align="center" show-overflow-tooltip ></el-table-column>
      <el-table-column label="名称" prop="merChanName" align="center" show-overflow-tooltip></el-table-column>
     
      <el-table-column label="子变种数量" align="center">
        <template slot-scope="scope">
          {{scope.row.childAttr.length}}
        </template>
      </el-table-column>
     <el-table-column label="导出次数" sortable prop="exportTime" align="center"></el-table-column>
      <el-table-column label="创建时间" sortable prop="creatTime"  align="center"></el-table-column>
      <el-table-column label="操作"   align="center" v-if="selfList">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editColumns(scope.row)">详情</el-button>
        </template>
       </el-table-column>
    </el-table>
    <br/>
    <Row type="flex" justify="center">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[60, 100, 300]"
      :page-size="60"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
        
    </Row>

    <Modal
        v-model="modalShow"
        title="导出表格"
        :loading="modalLoading"
        @on-ok="submit">
       <Form :model="exportQuery" :rules="ruleValidate" ref="exportForm">
        <Form-Item label="生成表格名" prop="excelName"> 
           <Input v-model="exportQuery.excelName" placeholder="下载表格名(必填)"></Input>
        </Form-Item>
        </Form>
    </Modal>
  </section>
</template>
<script>
import { merchan,categoryApi,translateApi} from "@/api";
import xlsx from 'xlsx';
import xlsxStyle from 'xlsx-style';
import {regions,attrData} from '@/common/options.js';
import childChan from './childChanList.vue';
import batchEdit from '@/pages/Newchan/common/batchEdit';
import {mapState} from 'vuex';
export default {
  components:{
      childChan,
      batchEdit
  },
  data() {
    return {
      productTypeLoading:false,
      modalShow:false,
      modalLoading:false,
      selectLoading:false,
      attrData:attrData,
     
        selectArr:[],
        pageIndex:1,
        pageSize:60,
        total:0,
        loading:false,
        selfList:false,
        regions:regions,
        categoryTypes:[],
        query:{
           merChanName:'', 
           formatCreatTime:'',
           country:'',
           exportTime:'',
           isSpiderBox:false
        },
     
        
        exportQuery:{
          excelName:''
        },
      columns1: [
        {
          type: "selection",
          width: 60,
          alight: "center"
        },
        {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(childChan, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
        {
            title:'站点',
            key:'country'
        },
        {
          title: "商品名称",
          key: "merChanName"
        },
        {
          title: "价格",
          key: "price"
        },
        {
          title:'描述',
          slot:'des',
          width:100,
          align:"center"
        },
        {
            title:'创建时间',
            key:'creatTime'
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      ruleValidate:{
        id:[
          {
            required:true,
            message:'分类必选',
            trigger:'change',
            type:'string'
          }
        ],
        dateRange:[
          {
            required:true,
            message:'日期必选',
            trigger:'change',
            type:'array'
          }
        ],
        excelName:[
          {
            required:true,
            message:'表格名必填',
            trigger:'blur'
          }
        ]
      },
     formList:[],
    
    };
  },
  mounted() {
      this.fetchData()
      this.reciverQuery()
  },
  computed:{
    ...mapState(["userInfo"])
  },
  watch:{
    
  },
  methods: {
   
   creatNewForm(form,newData){
     let newForm = Object.assign({},form,newData)
     newForm.parentSku = (form.brand + "-" + this.$uuid()).slice(0,32)
     if(newForm.childAttr){
       newForm.childAttr.forEach((el,index) => {
         let currentindex = index < 9 ? "0" + (index + 1) : index + 1;
        el.sku = `${newForm.parentSku}-${currentindex}`;
       })
     }
     return newForm
   },
   formatTransMain(data){
     let str  = ''
     let transArr = ['merChanName','description','point1','point2','point3','point4','point5']
     for(let key of transArr){
       str+=`${key.toUpperCase()}=${data[key].replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,',')}\n`
     }
     return str
   },
   formatTransChild(data){
     
     let noTransArr = ['sku','price','quality','imgurl','ean','size_map','model','size_name']
     let exArr = []
     let str = ''
     if(data.childAttr.length > 0){
       for(let i=0,l=data.childAttr.length;i<l;i++){
         let child = data.childAttr[i]
         for(let k in child){
           if(noTransArr.indexOf(k) === -1 && k.indexOf('trans') == -1 && k.indexOf('imgurl') === -1){
             if(exArr.indexOf(child[k]) === -1){
               str+=`${k.toUpperCase()+i}=${child[k]}\n`
               exArr.push(child[k])
             }
             
           }
         }
       }
     }
     str = str.slice(0,str.length - 1)
     return str
   },
  
     regionOptionsChange(val) {
      const params = {
          site: val
        };
        this.loading = true
        categoryApi.getCategoryList(params).then(res => {
          this.categoryTypes = []
          this.categoryTypes.push(...res.data);
          this.loading = false
        });
    }, 
      reciverQuery(){
          const query = this.$route.query
          if(!query.auth || !query.user){
              this.selfList = true
          }
      },
      async exportCsv(){
        this.modalShow = true;

      },
      async submit(){
         this.$message({
          message: '导出表格默认只导出和第一条国家分类相同的数据,如选择数据中存在其他国家分类数据,请多次导出！',
          type: 'warning',
          duration:5000
        });
        const data  = this.selectArr
        if(data.length == 0){
          this.$message({
            message:'选中数据为空!',
            type:'error'
          })
          return
        }
        const flag = this.selectArr[0]
        const formData = this.selectArr.filter(el => el.parentCategoryTypeId == flag.parentCategoryTypeId)
        const uuidList = formData.map(el => el.uuid)
        const loading = this.$loading({
          lock: true,
          text: '正在生成表格下载',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        const params = {
          uuidList:uuidList,
          id:flag.parentCategoryTypeId,
          excelName:this.exportQuery.excelName
        }
        
        
        this.$refs['exportForm'].validate(async (valid) => {
          if(valid){
            let res;
            if(!this.selfList){
              res = await merchan.excelLoadFormAuth(params)
            }else{
              res = await merchan.excelLoad(params)
            }
            this.modalShow = false
             if(!res.template){
                this.$Message.error('模板为空')
                loading.close();
                return
              }
              const template = res.template.template
              const saveName = params.excelName
              loading.close();
              this.creatExcelLoad(formData,template,saveName)
              this.fetchData()
           
          }
        })
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
      initExcelData(data){
        const merchants = []
        data.forEach(el => {
            let current = []
            let obj = {
                'manufacturer':el.Manufacturer,
                'feed_product_type':el.productType,
                'item_sku':el.parentSku,
                'brand_name':el.brand,
                'item_name':el['merChanNametrans'],
                'recommended_browse_nodes':el.categoryType,
                'product_description':el['descriptiontrans'],
                'model':el.model,
                'bullet_point1':el['point1trans'],
                'bullet_point2':el['point2trans'],
                'bullet_point3':el['point3trans'],
                'bullet_point4':el['point4trans'],
                'bullet_point5':el['point5trans'],
                'generic_keywords':el.keyword,
                'main_image_url':el.mainImgUrl1,
                'other_image_url1':el.mainImgUrl2,
                'other_image_url2':el.mainImgUrl3,
                'other_image_url3':el.mainImgUrl4,
                'other_image_url4':el.mainImgUrl5,
                'other_image_url5':el.mainImgUrl6,
                'other_image_url6':el.mainImgUrl7,
                'other_image_url7':el.mainImgUrl8,
                'country_of_origin':'China',
                'variation_theme':el.VariType,
                'quantity':el.quantity||el.quality,
                'condition_type':this.initStatusFormCountry(el.country)
            }
            if(el.discountDate.length){
                obj['sale_price'] = el.discountPrice
                obj['sale_from_date'] = el.discountDate[0],
                obj['sale_end_date'] = el.discountDate[1]
            }
            current.push(obj)
            if(el.childAttr.length){
                el.childAttr.forEach(child => {
                    obj['parent_child'] = 'Parent'
                    let children = Object.assign({},obj,child)
                    children['item_sku'] = child.sku
                    children['quantity'] = child.quantity || child.quality
                    children['external_product_id'] = child.ean
                    children['external_product_id_type'] = 'UPC'
                    children['model'] = child.model
                    children['parent_child'] = 'Child'
                    children['parent_sku'] = obj['item_sku']
                    children['relationship_type'] = 'Variation'
                    children['variation_theme'] = el.VariType
                    children['main_image_url'] = child.imgurl1 || el.mainImgUrl1
                    children['other_image_url1'] = child.imgurl2 || el.mainImgUrl2
                    children['other_image_url1'] = child.imgurl3 || el.mainImgUrl3
                    children['other_image_url1'] = child.imgurl4 || el.mainImgUrl4
                    children['other_image_url1'] = child.imgurl5 || el.mainImgUrl5
                    children['other_image_url1'] = child.imgurl6 || el.mainImgUrl6
                    children['other_image_url1'] = child.imgurl7 || el.mainImgUrl7
                    children['standard_price'] = child.price
                    children['size_map'] = child['size_nametrans'] || ''
                    children['color_map'] = child['color_nametrans'] || ''
                    current.push(children)
                })
            }else{
                obj['standard_price'] = el.price
                obj['external_product_id'] = el.ean
                obj['external_product_id_type'] = 'EAN'
            }
            merchants.push(...current)
        })
        
       return merchants
    },
    renderExcel(merchants,template){
    const table = template

    let colStyle = []
    let filterCow = {}
    for(let key in table){
      let cellName = key.slice(0,key.length - 1)
      if(!filterCow[cellName] && cellName.indexOf('!') == -1){
        filterCow[cellName] = 1
      }
    }
    for(let key in filterCow){
      colStyle.push({wpx:100})
    }
    for(let i=0,l=merchants.length;i<l;i++){
        for(let k in merchants[i]){
            for(let key in table){
                if(table[key].v == k && !merchants[i][k+'trans']){
                    let index = Number(key.slice(-1))+i+1
                    let cell = key.slice(0,key.length - 1)
                    table[cell+index] = {
                        t:'s',
                        v:merchants[i][k] || ''
                    }
                }else if(table[key].v == k && merchants[i][k+'trans']){
									let index = Number(key.slice(-1))+i+1
                    let cell = key.slice(0,key.length - 1)
                    table[cell+index] = {
                        t:'s',
                        v:merchants[i][k+'trans'] || ''
                    }
								}
            }
        }
        
    }
    const oldRef = table['!ref']
   
     table['!cols'] = colStyle
    table['!ref'] = oldRef.slice(0,oldRef.length - 1)+(Number(oldRef.slice(-1))+merchants.length)
    const wb = xlsx.utils.book_new();
    const renderTable = Object.assign({},table)
    var wopts = {
        bookType: 'xlsm', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    xlsx.utils.book_append_sheet(wb, renderTable, 'Sheet1');
    var wbout = xlsxStyle.write(wb, wopts);
    var blob = new Blob([this.s2ab(wbout)], {type:"application/octet-stream"});
    return blob;
   },
   // 字符串转ArrayBuffer
  s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    },
   openDownloadDialog(url, saveName)
{
    if(typeof url == 'object' && url instanceof Blob)
    {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName+'.xlsm' || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if(window.MouseEvent) event = new MouseEvent('click');
    else
    {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
},
creatExcelLoad(data,template,saveName){
  const tableData = this.initExcelData(data)
  const table = this.renderExcel(tableData,template)
  this.openDownloadDialog(table,saveName)
},
      async editColumns(row){
          sessionStorage.setItem('currentMer',JSON.stringify(row))
          this.$router.push({
              name:'商品编辑',
              query:{
                  edit:true,
                  show:true
              }
          })
          
      },
      formatDate(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      m < 10 ? (m = "0" + m) : m;
      d < 10 ? (d = "0" + d) : d;
      return `${y}-${m}-${d}`;
    },
      async bathDel(){
          const promiseArr = this.selectArr.map(el => {
              let params = {
                  uuid:el.uuid
              }
              return merchan.deleteMer(params)
          })
         
          await Promise.all(promiseArr)
          this.fetchData()         
      },
      bathSelect(val){
          this.selectArr = val
      },
      addNew(){
          this.$router.push({
              name:'商品编辑',
              newEdit:true
          })
      },
      handleSizeChange(val){
        
        this.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val){
        
        this.pageIndex = val
        this.fetchData()
      },
    fetchData(){
      
        const param = this.$route.query
        this.getMerList(param.user,param.auth)
    },
    async getMerList(user,auth){
        this.loading = true
        let query = {}
        for(let k in this.query){
            if(this.query[k] !=='' && this.query[k] !== null){
                query[k] = this.query[k]
            }
        }
        if(auth){
            const param = {
                query:{
                    user:user
                },
                pageSize:this.pageSize,
                pageIndex:this.pageIndex
            }
            param.query = Object.assign(param.query,query)
            merchan.getMerListFromAuth(param).then((res) => {
                this.formList = res.data.data
                this.total = res.data.count
                this.loading = false
            })
        }else{
            const param = {
                query:query,
                 pageSize:this.pageSize,
                pageIndex:this.pageIndex
                
            }
            merchan.getMerList(param).then((res) => {
                this.formList = res.data.data
                this.total = res.data.count
                this.loading = false
            })
        }
    }
  }
};
</script>
