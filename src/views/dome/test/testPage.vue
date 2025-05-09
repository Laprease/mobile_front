<template>
    <div>
      <van-empty description="动态路由配置的页面" />
    </div>
</template>

<script setup>
  onMounted(() => {
	console.log("onMounted");
	$globalConfigure(() => {
		console.log("缓存页面时--总监听事件接收--用于初始化操作");
	});
});
</script>