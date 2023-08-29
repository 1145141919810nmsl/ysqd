<template>
	<view class="login-container">
		<!-- 登录图标 -->
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<!-- 登录提示 -->
		<view class="tips-text">我测你们🐎</view>
	</view>
</template>

<script>
	import { mapMutations,mapState } from 'vuex'
	
	export default {
		name:"my-login",
		computed:{
			...mapState('m_user',['redirectInfo'])
		},
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
			getUserInfo(e){
				if(e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('取消登录授权')
				
				this.updateUserInfo(e.detail.userInfo)
				
				this.getToken(e.detail)
			},
			async getToken(info){
				const [err,res] = await uni.login().catch(err => err)
				
				if(err || res.errMsg !== 'login:ok') return uni.$showError('登陆失败')
				
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				// 换取token
				const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin',query)
				console.log(loginResult);
				this.updateToken("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo")
				this.navigateBack()
				if(loginResult.meta.status !== 200) return uni.$showMsg('登录失败')
			},
			navigateBack(){
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
					uni.switchTab({
						url:this.redirectInfo.from,
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style>
.login-container{
	height: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f8f8f8;
	position: relative;
	overflow: hidden;
}
.login-container::after{
	content: ' ';
	display: block;
	width: 100%;
	height: 40px;
	background-color: #fff;
	position: absolute;
	bottom: 0;
	left: 0;
	border-radius: 100%;
	transform: translateY(50%);
}
.btn-login{
	width: 90%;
	border-radius: 100px;
	margin: 15px 0;
	background-color: #c00000;
}
.tips-text{
	font-size: 12px;
	color: gray;
}
</style>