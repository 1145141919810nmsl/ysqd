
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

// 导入网络请求包
import { $http } from '@escook/request-miniprogram'

uni.$http = $http

// 根路径
$http.baseUrl = "https://api-hmugo-web.itheima.net"

// 请求拦截器
$http.beforeRequest = function(options){
	uni.showLoading({
		title:'数据加载中'
	})
}
// 响应拦截器
$http.afterRequest = function(){
	uni.hideLoading()
}

//封装弹框
uni.$showMsg = function(title = '请求失败',duration = 2000){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif