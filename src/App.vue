<template>
	<router-view v-slot="{ Component, route }">
		<!-- 路由缓存 -->
		<keep-alive>
			<component :is="Component" v-if="route?.meta?.isKeepAlive || route?.meta?.isAlwaysKeepAlive || route?.meta?.isRouterKeepAlive"
				:key="route?.meta?.isRouterKeepAlive ? route?.fullPath : route?.name" />
		</keep-alive>

		<!-- 不缓存 -->
		<component :is="Component" v-if="(!route?.meta?.isKeepAlive) && (!route?.meta?.isAlwaysKeepAlive) && (!route?.meta?.isRouterKeepAlive)"
			:key="route.name" />
	</router-view>
</template>

<script setup name="App">
onMounted(async () => {
	const handleLoadUrl = inject('$provideLoadUrl')
	const getGoodsnum = inject('$provideGoodsnum')
	const getLang = inject('$provideLang')
	const getDynamicRouter = inject('$getDynamicRouter')
	const path = handleLoadUrl()
	if (!['/', '/login'].includes(path)) {
		await getGoodsnum();
		await getLang();
		await getDynamicRouter()
	}

});
</script>
