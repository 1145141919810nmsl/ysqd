export default{
	// 开启命名空间
	namespaced: true,
	
	// 模块state数据
	state:() => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	// 模块mutations方法
	mutations:{
		addToCart(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		updateGoodsState(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			
			if(findResult){
				findResult.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		updateGoodsCount(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			
			if(findResult){
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		removeGoodsById(state,goods_id){
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		},
		updateAllGoodsState(state,newState){
			// 循环更新每件商品的勾选状态
			state.cart.forEach(x => x.goods_state = newState)
			// 存储至本地
			this.commit('m_cart/saveToStorage')
		}
	},
	
	// 模块getters属性
	getters:{
		total(state){
			return state.cart.reduce((total,item) => total += item.goods_count,0)
		},
		checkedCount(state){
			return state.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count,0)
		},
		checkedGoodsAmount(state){
			return state.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count * item.goods_price,0).toFixed(2)
		}
	}
}