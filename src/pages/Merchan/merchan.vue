<template>
	<section>
		<Row :gutter="2">
			<Col :span="1">
			<Button type="success" size="small">导出表格</Button>
			</Col>
			<Col :span="1">
			<Button type="info" size="small" @click="drawerShow = !drawerShow">发布商品</Button>
			</Col>
			<Col :span="1">
			<Button type="error" size="small">批量删除</Button>
			</Col>
		</Row>
		<br>
		<Table stripe :columns="columns1" :data="data1">
			<template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px">编辑</Button>
            <Button type="error" size="small">删除</Button>
        </template>
		</Table>
		<creatNew v-model="drawerShow"></creatNew>
	</section>
</template>
<script>
import creatNew from './newDraw'
 export default {
	 			components:{
					 creatNew
				 },
        data () {
            return {
								drawerShow:false,
                columns1: [
										{
											type:'selection',
											width:60,
											alight:'center'
										},
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
										
										{
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    },
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
				methods:{
					toggle(val){
						this.drawerShow = val
					}
				}
    }
</script>
