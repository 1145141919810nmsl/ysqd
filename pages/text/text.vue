<template>
	<view>
		<!-- 使用自定义搜索组件 -->
		<my-search @click="gotoSearch"></my-search>
		
		<view class="scroll-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view class="left-scroll" scroll-y="true" :style= "{height: winh + 'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-scroll-view-item' , i === active ? 'active' : '']" @click="activeChange(i)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动区域 -->
			<scroll-view class="rigth" scroll-y="true" :style= "{height: winh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-v2" v-for="(item2,i2) in cateLevel2" :key="i2">
					<!-- 二级分类标题 -->
					<view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
					<!-- 三级分类列表 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
							<img :src="item3.cat_icon">
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	
	export default {
		mixins: [badgeMix],
		data() {
			return {
				winh:0,
				cateList:[],
				active:0,
				cateLevel2:[],
				scrollTop:0
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.winh = sysInfo.windowHeight - 50
			
			this.getCateList()
		},
		methods: {
			// 获取分类列表数据
			async getCateList(){
				const {data: res} = await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				
				// 二级分类赋值
				this.cateLevel2 = res.message[0].children
			},
			activeChange(i){
				this.active = i
				
				// 重新给二级分类赋值
				this.cateLevel2 = this.cateList[i].children
				
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			// 跳转到商品列表页面
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style>
.scroll-view-container{
	display: flex;
}
.left-scroll{
	width: 120px;
}

.left-scroll-view-item{
	background-color: #f7f7f7;
	line-height: 60px;
	text-align: center;
	font-size: 12px;
}
.active{
	background-color: #fff;
	position: relative;
}
.active::before{
	content: ' ';
	display: block;
	width: 3px;
	height: 30px;
	background-color: #c00000;
	position: absolute;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
}

.cate-v2{
	background-color: #fff;
}

.cate-lv2-title{
	font-size: 12px;
	font-weight: bold;
	text-align: center;
	padding: 15px 0;
}

.cate-lv3-list{
	display: flex;
	flex-wrap: wrap;
}
.cate-lv3-item{
	width: 33%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
}
.cate-lv3-item img{
	width: 60px;
	height: 60px;
}
.cate-lv3-item text{
	font-size: 12px
}
</style>
