<template>
	 <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="light">
                    <div class="layout-logo">
											<div class="logo-img">
												<img src="../../../static/cc.png" alt="">
											</div>
											<span class="logo-title">亚马逊通跨境电商</span>
										</div>
                    <!-- <div class="layout-nav">
											<MenuItem to="{path:'/dashboard',name:'个人中心'}" name="个人中心">个人中心</MenuItem>
                    </div> -->
                </Menu>
            </Header>
            <Layout>
							
                <Sider hide-trigger :style="{background: '#fff'}">
									
                    <Menu :active-name="this.$route.name" theme="light" width="auto">
                      
                    <Submenu v-for="item in router" :name="item.name" :key="item.name">
                      <template slot="title">
											{{item.name}}		
											</template>
                    
										<MenuItem v-for="route in item.children" :name="route.name" :to="route" :key="route.name">{{route.name}}</MenuItem>
										</Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
										<BreadcrumbItem v-for="route in breadRoutes" :key="route.name" :to="route">
										  {{route.name}}
										</BreadcrumbItem>
                       
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
												<router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
	data(){
		return {

		}
	},
	watch:{
	
	},
	computed:{
		router(){
			return this.$router.options.routes.filter(el => el.meta && !el.meta.hidden)
		},
		breadRoutes(){
			return this.$route.matched.filter(el => el.meta && !el.meta.bread)
		}
	},
	mounted(){
	//	console.log(this.$cookies)
	}
}
</script>
<style lang="less">
	.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
		height: 100%;
}

.layout-logo{
    width: 205px;
    height: 50px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 5px;
    left: 40px;
		.logo-img{
			width: 60px;
			height: 100%;
			float: left;
			img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		.logo-title{
			color: #ef810b;
		}
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.ivu-layout-header{
	padding: 0;
}
.ivu-layout{
	height: 100%;
}
</style>


