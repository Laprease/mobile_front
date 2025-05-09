<template>
	<div class="login-page">
		<div class="login-content">
			<van-nav-bar >
				<template #title>
					<div class="title">
						登录
					</div>
				</template>
			</van-nav-bar>
			<van-form @submit="onSubmit">
				<van-field v-model="username" name="username" label="用户名" placeholder="用户名"
					:rules="[{ required: true, message: '请填写用户名' }]" />
				<van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
					:rules="[{ required: true, message: '请填写密码' }]" />
				<div style="margin: 16px">
					<van-button block type="primary" native-type="submit">登录</van-button>
				</div>
			</van-form>
			<router-link to="/register" class="link">还没有账号,去注册</router-link>
		</div>
	</div>
</template>

<script setup>
const getGoodsnum = inject('$provideGoodsnum')
const getLang = inject('$provideLang')
const getDynamicRouter = inject('$getDynamicRouter')
const router = useRouter();
let username = ref("admin");
let password = ref("admin");
const onSubmit = async (values) => {
	await getGoodsnum();
	await getLang();
	await getDynamicRouter()
	router.replace({ name: "Home" });
};
</script>

<style lang="less" scoped>
.login-page {
	width: 100%;
	height: 100%;
	display: flex;
	overflow: hidden;
	background-image: url("~@/assets/images/login.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	opacity: 0.9;
	.login-content {
		margin: auto;
		padding: 10px 10px 20px 10px;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		opacity: 0.9;
		.title{
            font-size: 20px;
            font-weight: 600;
        }
	}

	.link {
		font-size: 12px;
		color: #069;
		float: right;
		margin-right: 15px;
	}
}
</style>
