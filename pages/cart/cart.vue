<template>
	<view class="gwc" v-if="cart.length !==0">
		<!-- 收货地址组件 -->
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		
		<uni-swipe-action>
			<block v-for="(goods,i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
					<my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 结算组件 -->
		<my-settle></my-settle>
	</view>
	
	<!-- 空白购物车区域 -->
	<view class="empty-cart" v-else>
		<img src="/static/uni.png" class="empty-img">
		<text class="tip-text">空空如也</text>
	</view>
</template>

<script>
	import { mapGetters,mapState,mapMutations } from 'vuex'
	import badgeMix from "@/mixins/tabbar-badge.js"
	
	export default {
		mixins: [badgeMix],
		computed:{
			...mapState('m_cart',['cart'])
		},
		watch:{
			total(){
				this.setBadge()
			}
		},
		onShow(){
			this.setBadge()
		},
		data() {
			return {
				options:[{
					text:'删除',
					style:{
						backgroundColor: '#c00000'
					}
				}]
			}
		},
		methods:{
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
			radioChangeHandler(e){
				this.updateGoodsState(e)
			},
			numberChangeHandler(e){
				this.updateGoodsCount(e)
			},
			swipeActionClickHandler(goods){
				this.removeGoodsById(goods.goods_id)
			},
			setBadge(){
				uni.setTabBarBadge({
					index:2,
					text:this.total + ''
				})
			}
		}
	}
</script>

<style>
.gwc{
	background-color: #fff;
	padding-bottom: 50px;
}
.cart-title{
	display: flex;
	align-items: center;
	height: 40px;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
}
.cart-title-text{
	font-size: 14px;
	margin-left: 10px;
}

.empty-cart{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;
}
.empty-img{
	width: 90px;
	height: 90px;
}
.tip-text{
	font-size: 12px;
	color: gray;
	margin-top: 15px;
}
</style>
