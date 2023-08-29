<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="isFullCheck" /><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计：<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		<!-- 结算 -->
		<view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import { mapGetters,mapMutations,mapState } from 'vuex'
	
	export default {
		name:"my-settle",
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			...mapGetters('m_user',['addstr']),
			...mapState('m_user',['token']),
			// 全选
			isFullCheck(){
				return this.total === this.checkedCount
			}
		},
		data() {
			return {
				seconds:3,
				timer:null
			};
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			...mapMutations('m_user',['updateRedirectInfo']),
			changeAllState(){
				this.updateAllGoodsState(!this.isFullCheck)
			},
			settlement(){
				if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
				
				if(!this.addstr) return uni.$showMsg('请选择收货地址')
				
				if(!this.token) return this.delayNavigate()
			},
			showTips(n){
				uni.showToast({
					icon:'none',
					title:'请登录后继续结算，' + n + '秒后自动跳转至登录页',
					mask:true,
					duration:1500
				})
			},
			delayNavigate(){
				this.seconds = 3
				// 展示提示信息
				this.showTips(this.seconds)
				// 创建定时器
				this.timer = setInterval(() => {
					this.seconds--
					
					if(this.seconds <= 0){
						clearInterval(this.timer)
						
						uni.switchTab({
							url:'/pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						
						return
					}
					this.showTips(this.seconds)
				},1000)
			}
		}
	}
</script>

<style>
.my-settle-container{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
}
.radio{
	display: flex;
	align-items: center;
}
.amount-box{}
.amount{
	color: #c00000;
	font-weight: bold;
}
.btn-settle{
	background-color: #c00000;
	height: 50px;
	color: #fff;
	line-height: 50px;
	padding: 0 10px;
	min-width: 100px;
	text-align: center;
}
</style>