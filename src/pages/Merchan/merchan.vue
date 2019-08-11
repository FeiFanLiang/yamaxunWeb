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
    <Modal
        v-model="modalShow"
        title="导出表格"
        :loading="modalLoading"
        @on-ok="submit">
       <Form>
        <Form-Item label="国家">
          <Select @on-change="regionOptionsChange">
            <Option v-for="(item,index) in regions" :key="index" :value="item.regionId" :label="item.region"></Option>
          </Select>
        </Form-Item>
        <Form-Item label="分类">
          <Select >
            
          </Select>
        </Form-Item>
        <Form-Item label="时间">
          
        </Form-Item>
        </Form>
    </Modal>
  </section>
</template>
<script>
import { merchan } from "@/api";
import {regions} from '@/common/options.js';
import childChan from './childChanList.vue';
import {categoryApi} from '@/api'
export default {
  comments:{
      childChan
  },
  data() {
    return {
      modalShow:false,
      modalLoading:false,
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
        },
        exportQuery:{

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
     formList:[]
    };
  },
  mounted() {
      this.fetchData()
      this.reciverQuery()
  },
  methods: {
     regionOptionsChange(val) {
      debugger
      const params = {
          site: val
        };
        categoryApi.getCategoryList(params).then(res => {
          debugger
          this.categoryTypes.push(...res.data);
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
