<template>
	<view>
		<!-- 未登录展示 -->
		<my-login v-if="!token"></my-login>
		<!-- 登录后展示 -->
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import { mapState } from 'vuex'
	
	export default {
		mixins: [badgeMix],
		computed:{
			...mapState('m_user',['token'])
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
