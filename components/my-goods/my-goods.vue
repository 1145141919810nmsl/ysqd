<template>
	<view class="goods-item">
		<!-- 左侧盒子 -->
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioChangeHandler"/>
			<img :src="goods.goods_small_logo || defaultpic" class="goods-pic">
		</view>
		<!-- 右侧盒子 -->
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numberChangeHandler"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goods:{
				type:Object,
				default:{}
			},
			showRadio: {
				type: Boolean,
				defaule: false
			},
			showNum:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				defaultpic:'https://ts1.cn.mm.bing.net/th?id=OIP-C.hzz36dIa6iEAJXoue97TMQAAAA&w=106&h=106&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
			};
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods:{
			radioChangeHandler(){
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			numberChangeHandler(val){
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					goods_count: +val
				})
			}
		}
	}
</script>

<style>
.goods-item{
	width: 750rpx;
	box-sizing: border-box;
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
}
.goods-item-left{
	margin-right: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.goods-pic{
	width: 100px;
	height: 100px;
	display: block;
}
.goods-item-right{
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
}
.goods-name{
	font-size: 13px;
}
.goods-info-box{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.goods-price{
	font-size: 16px;
	color: #c00000;
}
</style>