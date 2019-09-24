<template>
  <section>
    <Row :gutter="2">
     
    
      <Col :span="2">
        <Input size="small" type="text" v-model="query.merChanName" placeholder="按商品名称搜索"></Input>
      </Col>
      <Col :span="2">
        <DatePicker size="small" type="date" placement="bottom-end" placeholder="按创建日期搜索" ></DatePicker>
      </Col>
     
      <Col :span="1">
        <Button type="info" size="small" @click="fetchData">搜索</Button>
      </Col>
      
      
       <template v-if="selfList">
            <Col :span="1">
        <Button type="success" size="small" @click="exportCsv">导出表格</Button>
      </Col>
           <Col :span="1">
        <Button type="info" size="small" @click="addNew">发布商品</Button>
      </Col>
        <Col :span="1">
        <Button type="error" size="small" @click="bathDel">批量删除</Button>
      </Col>
     <Col :span="1">
        <Button type="error" size="small" @click="dialogFormVisible=true">批量编辑</Button>
      </Col>
      
      </template>
    </Row>
    <br />
    <el-table :data="formList" v-loading="loading"  @selection-change="bathSelect" size="mini">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-table :data="props.row.spiderChild">
          <el-table-column label="采集变种属性1" prop="name" align="center"></el-table-column>
          <el-table-column label="采集变种属性2" prop="skuName" align="center"></el-table-column>
          <el-table-column label="数量" prop="quality" align="center"></el-table-column>
          <el-table-column label="价格" prop="price" align="center"></el-table-column>
        </el-table>
        </el-form>
      </template>
    </el-table-column>
      <el-table-column label="站点" prop="country" align="center"></el-table-column>
      <el-table-column label="分类路径" prop="categorySelectPathText" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="商品名称" prop="merChanName" align="center"></el-table-column>
      <el-table-column label="描述" show-overflow-tooltip prop="description" align="center"></el-table-column>
      <el-table-column label="品牌" show-overflow-tooltip prop="brand" align="center"></el-table-column>
      <el-table-column label="生产厂家" show-overflow-tooltip prop="Manufacturer" align="center"></el-table-column>
      <el-table-column label="关键词" prop="keyword" align="center"></el-table-column>
      <el-table-column label="子变种数量" align="center">
        <template slot-scope="scope">
          {{scope.row.childAttr.length}}
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="price" align="center"></el-table-column>
      <el-table-column label="数量" prop="quantity" align="center"></el-table-column>
      <el-table-column label="售卖时间" prop="soldDate" align="center"></el-table-column>
      <el-table-column label="产品类型" prop="productType" align="center"></el-table-column>
      <el-table-column label="创建时间" prop="creatTime" fixed="right" width="100" align="center"> </el-table-column>
      <el-table-column label="操作"  fixed="right" width="100" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editColumns(scope.row)">编辑</el-button>
        </template>
       </el-table-column>
    </el-table>
    <br/>
    <Row type="flex" justify="center">
        <Page  :current="current" :page-size="30" :total="total" @on-change="fetchData" show-total />
    </Row>
    <el-dialog title="批量编辑分类信息" :visible.sync="dialogFormVisible">
       <batchEdit :site="'de'" @done="handleDone"></batchEdit>
       <br/>
       <batchEdit :site="'fr'" @done="handleDone"></batchEdit>
       <br/>
       <batchEdit :site="'it'" @done="handleDone"></batchEdit>
       <br/>
       <batchEdit :site="'uk'" @done="handleDone"></batchEdit>
       <br/>
       <batchEdit :site="'es'" @done="handleDone"></batchEdit>
       <br/>
       <el-row>
        <el-input v-model="textDe.description" type="textarea" :autosize="{ minRows: 2}"
              maxlength="2000"
              show-word-limit
              placeholder="请输入关键词,不能超过2000字符"></el-input>  
       </el-row>
       <br>
       <el-row>
        <el-input v-model="textDe.point1" type="textarea" :autosize="{ minRows: 2}"
              maxlength="500"
              show-word-limit
              placeholder="请输入重点描述1,不能超过500字符"></el-input>  
       </el-row>
             
       
              <br/>
              <el-row>
              <el-input v-model="textDe.point2" type="textarea" :autosize="{ minRows: 2}"
              maxlength="500"
              show-word-limit
              placeholder="请输入重点描述2,不能超过500字符"></el-input>         
              </el-row>
       
              <br/>
              <el-row>
                 <el-input v-model="textDe.point3" type="textarea" :autosize="{ minRows: 2}"
              maxlength="500"
              show-word-limit
              placeholder="请输入重点描述3,不能超过500字符"></el-input>          
              </el-row>
              <br/>
              <el-row>
                   <el-input v-model="textDe.point4" type="textarea" :autosize="{ minRows: 2}"
              maxlength="500"
              show-word-limit
              placeholder="请输入重点描述4,不能超过500字符"></el-input>
              </el-row>
      
              <br/>
              <el-row>
        <el-input v-model="textDe.point5" type="textarea" :autosize="{ minRows: 2}"
              maxlength="500"
              show-word-limit
              placeholder="请输入重点描述5,不能超过500字符"></el-input>         
              </el-row>
       
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="batchSave"></el-button>
  </div>
</el-dialog>
    <Modal
        v-model="modalShow"
        title="导出表格"
        :loading="modalLoading"
        @on-ok="submit">
       <Form :model="exportQuery" :rules="ruleValidate" ref="exportForm">
        <Form-Item label="国家">
          <Select @on-change="regionOptionsChange">
            <Option v-for="(item,index) in regions" :key="index" :value="item.regionId" :label="item.region"></Option>
          </Select>
        </Form-Item>
        <Form-Item label="分类" prop="id">
          <Select :loading="selectLoading" v-model="exportQuery.id">
            <Option v-for="(item,index) in categoryTypes" :key="index" :value="item.categoryId" :label="item.label"></Option>
          </Select>
        </Form-Item>
        <Form-Item label="时间" prop="dateRange"> 
           <DatePicker :value="exportQuery.dateRange" @on-change="pickDate" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
        </Form-Item>
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
      dialogFormVisible:false,
      productTypeLoading:false,
      modalShow:false,
      modalLoading:false,
      selectLoading:false,
      attrData:attrData,
     
        selectArr:[],
        current:1,
        total:0,
        loading:false,
        selfList:false,
        regions:regions,
        categoryTypes:[],
        query:{
           merChanName:'', 
           creatTime:'',
           excelName:''
        },
     
        
        exportQuery:{
          id:'',
          dateRange:[]
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
     textDe:{
       description:'',
       point1:'',
       point2:'',
       point3:'',
       point4:'',
       point5:''
     },
     batchDeatil:{
       es:{},
       uk:{},
       de:{},
       fr:{},
       it:{}
     }
    
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
   async batchSave(){
     const loading = this.$loading({
          lock: true,
          text: '翻译生成中..请稍后',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
     let batchData = []
     if(!this.selectArr.length){
       this.$Message.error('未选中数据!')
       this.dialogFormVisible = false
       return
     }
     for(let country in this.batchDeatil){
       if(Object.keys(this.batchDeatil[country]).length === 0) continue
        for(let form of this.selectArr){
          batchData.push(this.creatNewForm(form,this.batchDeatil[country]))
        }
     }
    batchData.forEach(el => {
      for(let k in this.textDe){
        if(this.textDe[k]){
          el[k] = this.textDe[k]
        }
      }
    })
     let promiseArr = batchData.map(el => {
       return new Promise((reslove,reject) => {
         this.translateForm(el).then((data) => {reslove(data)}).catch(() => {reject()})
       })

     })
     let newList = await Promise.all(promiseArr)
     
     await merchan.batchEdit(newList)
     
     this.dialogFormVisible = false
     loading.close()
    this.fetchData()
   },
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
   handleDone(val){
     this.batchDeatil[val.country] = val
   },
   formatTransData(data){
     let transArr = ['merChanName','description','point1','point2','point3','point4','point5']
     let noTransArr = ['sku','price','quality','imgurl','ean','size_map','model','size_name']
     let str = ''
     

     for(let key of transArr){
       
       str+=`${key.toUpperCase()}=${data[key].replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,',')}"\n"`
     }
     if(data.childAttr.length > 0){
       for(let i=0,l=data.childAttr.length;i<l;i++){
         let child = data.childAttr[i]
         for(let k in child){
           
           if(noTransArr.indexOf(k) === -1 && k.indexOf('trans') == -1 && k.indexOf('imgurl') === -1){
             str+=`${k.toUpperCase()+i}=${child[k]}"\n"`
           }
         }
       }
     }
     str = str.slice(0,str.length - 1)
     return str
   },
   async translateForm(data){
     //description
     let transArr = ['merChanName','description','point1','point2','point3','point4','point5']
     
     const str = this.formatTransData(data)
     
      const params = {
                  country: data.country,
                  query: str
                };
              let res =  await translateApi.translate(params)
              
                if(!res.data) return 
                for(let i=0,l=res.data.length;i<l;i++){
                  
                  
                  const trans = res.data[i]

                  if(!trans.dst.replace(/"/g,'') || !trans.src.replace(/"/g,'')){
                    continue
                  }
                  
                  const transKey = trans.src.split('=')[0].replace(/\W/g,'')
                  const transData = trans.dst.split('=')[1].replace(/"/g,'')
                  
                  for(let k in data){
                    if(k.toUpperCase() == transKey){
                      
                      data[k+'trans'] = transData
                    }
                  }
                  if(data.childAttr.length){
                    data.childAttr.forEach((el,index) => {
                      for(let k in el){
                        if((k.toUpperCase()+index) == transKey){
                          el[k+'trans'] = transData
                        }
                      }
                    })
                  }
                  
                }
               
               
                  return data
   },
    
    
   
   
   
    
      pickDate(val){
        this.exportQuery.dateRange = val
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
        this.$refs['exportForm'].validate(async (valid) => {
          if(valid){
            const params = {
              startDate:this.exportQuery.dateRange[0],
              endDate:this.exportQuery.dateRange[1],
              id:this.exportQuery.id,
              excelName:this.exportQuery.excelName
            }
             const loading = this.$loading({
          lock: true,
          text: '正在生成表格下载',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
       
            merchan.excelLoad(params).then((res) => {
              if(!res.data.length){
                this.$Message.error('数据为空')
                loading.close();
                return
              }
              if(!res.template){
                this.$Message.error('模板为空')
                loading.close();
                return
              }
              const data = res.data
              const template = res.template.template
              const saveName = params.excelName
              loading.close();
              this.creatExcelLoad(data,template,saveName)
              
            })
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
                'number_of_items':el.quantity,
                'condition_type':el.status || this.initStatusFormCountry(el.country)
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
                    children['quantity'] = child.quantity
                    children['external_product_id'] = child.ean
                    children['external_product_id_type'] = 'EAN'
                    children['model'] = child.model
                    children['parent_child'] = 'Child'
                    children['parent_sku'] = obj['item_sku']
                    children['relationship_type'] = 'Variation'
                    children['variation_theme'] = el.VariType
                    children['number_of_items'] = child.quantity
                    children['main_image_url'] = child.imgurl1 || el.mainImgUrl1
                    children['other_image_url1'] = child.imgurl2 || el.mainImgUrl2
                    children['other_image_url1'] = child.imgurl3 || el.mainImgUrl3
                    children['other_image_url1'] = child.imgurl4 || el.mainImgUrl4
                    children['other_image_url1'] = child.imgurl5 || el.mainImgUrl5
                    children['other_image_url1'] = child.imgurl6 || el.mainImgUrl6
                    children['other_image_url1'] = child.imgurl7 || el.mainImgUrl7
                    children['standard_price'] = child.price
                    current.push(children)
                })
            }else{
                obj['external_product_id'] = el.ean
                obj['external_product_id_type'] = 'EAN'
            }
            merchants.push(...current)
        })
        
       return merchants
    },
    renderExcel(merchants,template){
    const table = template
    
    
    for(let i=0,l=merchants.length;i<l;i++){
        for(let k in merchants[i]){
            for(let key in table){
                if(table[key].v == k && !merchants[i][k+'trans']){
                    let index = Number(key.slice(-1))+i+1
                    let cell = key.slice(0,key.length - 1)
                    table[cell+index] = {
                        t:'s',
                        v:merchants[i][k] || '',
                        h:merchants[i][k] || '',
                        w:merchants[i][k] || ''
                    }
                  
                  
                    
                }else if(table[key].v == k && merchants[i][k+'trans']){
									let index = Number(key.slice(-1))+i+1
                    let cell = key.slice(0,key.length - 1)
                    table[cell+index] = {
                        t:'s',
                        v:merchants[i][k+'trans'] || '',
                        h:merchants[i][k+'trans'] || '',
                        w:merchants[i][k+'trans'] || ''
                    }
								}
            }
        }
        
    }
    const oldRef = table['!ref']
    const colsStyle = []
    for(let tr in table){
      colsStyle.push({wch:50})
    }
    table['!cols'] = colsStyle
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
                  edit:true
              }
          })
          
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
              name:'商品编辑'
          })
      },
      
    fetchData(){
        const param = this.$route.query
        this.getMerList(this.current,param.user,param.auth)
    },
    async getMerList(current,user,auth){
        this.loading = true
        let query = {}
        for(let k in this.query){
            if(this.query.k){
                query[k] = this.query[k]
            }
        }
        if(auth){
            const param = {
                query:{
                    user:user
                },
                pageIndex:current-1
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
                pageIndex:current-1
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
