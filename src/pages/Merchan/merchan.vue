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
    <Table stripe :columns="columns1" :data="formList" @on-selection-change="bathSelect" :loading="loading">
      <template slot-scope="{ row, index }" slot="action" v-if="selfList">
        <Button type="primary" size="small" style="margin-right: 5px" @click="editColumns(row)">编辑</Button>
      </template>
    </Table>
    <br/>
    <Row type="flex" justify="center">
        <Page  :current="current" :page-size="30" :total="total" @on-change="getMerList" show-total />
    </Row>
    <el-dialog title="批量编辑分类信息" :visible.sync="dialogFormVisible">
      <el-form size="mini">
        <el-form-item label="站点">
          <countrySelect v-model="categoryAttr.country" size="mini"></countrySelect>
        </el-form-item>
        <el-form-item label="目录">
          <categoryTypeNode v-model="categoryAttr.categorySelectPath"
              @picked="handlePicked"
              :site="categoryAttr.country"></categoryTypeNode>
        </el-form-item>
        <el-form-item label="分类类型" v-if="splitCategoryTypeAttrOptions.length">
          <el-select placeholder="请选择分类类型" v-model="categoryAttr.categoryTypeText">
              <el-option
                v-for="(item,index) of splitCategoryTypeAttrOptions"
                :key="index"
                :value="item"
                :label="item"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="产品类型">
           <el-select v-model="categoryAttr.productType" placeholder="请选择产品分类" v-loading="productTypeLoading">
              <el-option
                v-for="(item,index) of currentCategoryAttr.product_type"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="变种属性" v-if="currentCategoryAttr.skuAttTheme">
          <el-select  v-model="selectAttr" @change="handleChange" placeholder="请选择变种属性" size="mini">
        <el-option
          v-for="(value,index) in currentCategoryAttr.skuAttTheme.values"
          :key="index"
          :value="value"
          :label="value"
        ></el-option>
      </el-select>
        </el-form-item>
      </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="bathCategoryType">确 定</el-button>
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
import { merchan,categoryApi} from "@/api";
import xlsx from 'xlsx';
import xlsxStyle from 'xlsx-style';
import {regions,attrData} from '@/common/options.js';
import childChan from './childChanList.vue';
import countrySelect from '@/pages/Newchan/common/countrySelect'
import categoryTypeNode from '@/pages/Newchan/common/categoryTypeNode'
export default {
  components:{
      childChan,
      countrySelect,
      categoryTypeNode
  },
  data() {
    return {
      dialogFormVisible:false,
      productTypeLoading:false,
      modalShow:false,
      modalLoading:false,
      selectLoading:false,
      attrData:attrData,
      selectAttr:'',
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
        categoryAttr:{
          country:"",
          categoryType:'',
          categoryTypeText:"",
          parentCategoryTypeId:'',
          productType:'',
          VariType:""
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
            title:'ParentSku',
            key:'parentSku'
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
          title: "售卖日期",
          key: "soldDate"
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
     
     splitCategoryTypeAttrOptions:[],
     currentCategoryAttr:{}
    };
  },
  mounted() {
      this.fetchData()
      this.reciverQuery()
  },
  watch:{
    async "categoryAttr.categoryTypeText"(val) {
      if (!val) {
        return;
      }
      const params = {
        site: this.categoryAttr.country,
        categoryType: val
      };
      this.productTypeLoading = true
      await this.fetchAttrData(params);
      this.initAttrOptions();
      this.productTypeLoading = false
    }
  },
  methods: {
    handleChange(val){
      const atrr = this.currentCategoryAttr.skuAttTheme.attributeName
      this.categoryAttr.VariType = atrr
    },
    async handlePicked(val) {
      this.$set(this.categoryAttr, "categoryTypeText", "");
      this.$set(this.categoryAttr, "productType", "");
      this.splitCategoryTypeAttrOptions = [];
      const checkType = val;
      this.categoryAttr.categoryType = checkType.categoryId;
			this.categoryAttr.parentCategoryTypeId = checkType.nodePathId.split('/')[0]
      if (checkType.categoryType.indexOf(",") !== -1) {
        //分类存在多个属性的情况,需要再次选择
        this.splitCategoryTypeAttrOptions = checkType.categoryType.split(",");
        debugger
        return;
      }
      this.$set(this.categoryAttr, "categoryTypeText", checkType.categoryType);
      const params = {
        site: val.site,
        categoryType: val.categoryType
      };
      this.productTypeLoading = true
      await this.fetchAttrData(params);
      this.initAttrOptions();
      this.productTypeLoading = false
    },
    async fetchAttrData(params) {
      const res = await categoryApi.getCategoryList(params);
      this.originAttrData = res.data;
    },
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
      //  this.radioShow = true;
      } else {
      //  this.radioShow = false;
      }
      this.currentCategoryAttr.skuEndemicAttr = skuEndemicAttr;
      this.currentCategoryAttr.skuThemeAttr = skuAttThemeReal;
      this.currentCategoryAttr.product_type = product_type;
      debugger
    },
    bathCategoryType(){
    //  categoryAttr:{
    //       country:"",
    //       categoryType:'',
    //       categoryTypeText:"",
    //       parentCategoryTypeId:'',
    //       productType:'',
    //       VariType:""
    //     },
    
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
                'standard_price':el.price,
                'quantity':el.quantity,
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
                    children['main_image_url'] = child.imgurl
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
          this.getMerList()         
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
