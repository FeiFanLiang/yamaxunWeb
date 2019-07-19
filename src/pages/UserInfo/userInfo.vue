<template>
	<section class="userInfo_wrap">
		<Row>
		  <div class="msg_box">
    <div class="marquee">
        <div class="marquee_title">
            <Icon type="ios-megaphone" />
        </div>
        <div class="marquee_box">
            <ul class="marquee_list" :class="{marquee_top:animate}">
                <li v-for="(item, index) in marqueeList">
                    <span>{{item}}</span>
                </li>
            </ul>
        </div>
    </div>
</div>
		</Row>
		<Row style="padding:20px" type="flex" justify="start">
			<Col>
				<Card title="系统公告" icon="ios-options" :padding="0" shadow style="width:400px;">
           <p>欢迎您,超级管理员</p>
        </Card>
			</Col>
			<Col>
			 <div style="padding: 10px;background: #f8f8f9">
        <Card title="个人面板" icon="ios-options" :padding="0" shadow style="width: 900px;">
            <CellGroup>
								<Cell title="用户名" label="comcdm"></Cell>
                <Cell title="品牌信息" label="任天堂海外代购">
									<Button type="text" slot="extra">编辑品牌</Button>
                </Cell>
                <Cell title="用户等级" label="超级管理员">
									<Button type="text" slot="extra">用户管理</Button>
								</Cell>
								<Cell title="商品数量" label="20"/>
								<Cell title="注册时间" label="2019-06-28"/>
								<Cell title="密码管理">
										<Button type="text" slot="extra">修改密码</Button>
								</Cell>
            </CellGroup>
        </Card>
    </div>
			</Col>
      
    </Row>
	</section>
</template>
<script>
export default {
	data(){
		return { 
						user:{
							auth:'商家',
							product:'美的空调'
						},
            animate: false, 
            marqueeList: ['尊敬的用户您好','欢迎使用亚马逊后台管理系统','您可以发布修改查看您的商品'] 
        }
	},
	created: function () { 
            setInterval(this.showMarquee, 2000) 
        }, 
        methods: { 
            showMarquee: function () { 
                this.animate = true; 
                setTimeout(()=>{ 
                    this.marqueeList.push(this.marqueeList[0]); 
                this.marqueeList.shift(); 
                this.animate = false; 
            },500)}, 
        } 
}
</script>
<style lang="less" scoped>
.userInfo_wrap{
	.msg_box{
		width: 100%;
		color: #8d0077;
	}
	.marquee_title,ul, li {
	margin: 0;
	padding: 0;
	display: flex;
	box-sizing: border-box;
}
.marquee {
	width: 100%;
	height: 20px;
	align-items: center;
	display: flex;
	box-sizing: border-box;
}

.marquee_title {
	padding: 0 20px;
	height: 30px;
	font-size: 14px;
	align-items: center;
}

.marquee_box {
	display: block;
	position: relative;
	width: 60%;
	height: 30px;
	overflow: hidden;
}

.marquee_list {
	display: block;
	position: absolute;
	top: 0;
	left: 0;
}
.marquee_top {
	transition: all 0.5s;
	margin-top: -30px
}

.marquee_list li {
	height: 30px;
	line-height: 30px;
	font-size: 14px;
	padding-left: 20px;
}

.marquee_list li span {
	padding: 0 2px;
}

.red {
	color: #FF0101;
}
}

</style>


