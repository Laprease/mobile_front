// 加载模块配置的路由缓存配置
const $globalRouterModules = (routes) => {
	let routesArr = [...routes];
	let pathArr = [];
	let nameArr = [];
	const modulesRouter = import.meta.glob("../router/*.js", {
		eager: true,
	});

	for (const [key, value] of Object.entries(modulesRouter)) {
		const moduleName = key.replace(/^\.\.\/(.*)\.\w+$/, "$1").split("/")[1];
		if (moduleName && value) {
			for (const [, valueChild] of Object.entries(value)) {
				valueChild.forEach((item, index) => {
					pathArr.includes(item.path)
						? console.error(`模块${moduleName}的路由地址${item.path}存在重复`)
						: pathArr.push(item.path);
					nameArr.includes(item.name)
						? console.error(`模块${moduleName}的路由名${item.name}存在重复`)
						: nameArr.push(item.name);
				});
				routesArr.splice(1, 0, ...valueChild);
			}
		}
	}
	return routesArr;
};

// 跳转路由执行回调
const callBackRoute = (router) => {
	const routes = $globalRouter.getRoutes()
	const route = router.currentRoute.value;
	const { path } = route;
	const hState = history.state;
	const { isKeepAlive = false, isAlwaysKeepAlive = false, isRouterKeepAlive = false } = getKeepAlive(routes, path);
	(isKeepAlive || isAlwaysKeepAlive || isRouterKeepAlive) && $globalEventCallback(route, hState)
}

// 是否缓存页面
const getKeepAlive = (data, path) => {
	const [res] = data?.filter((item) => [path].includes(item.path))
	const { meta } = res || {}
	const { isKeepAlive = false, isRouterKeepAlive = false, isAlwaysKeepAlive = false } = meta || {}
	return {
		isKeepAlive,
		isRouterKeepAlive,
		isAlwaysKeepAlive
	}
}

// 添加扩展方法
const $globalExpandRouter = (router) => {
	// 扩展push方法
	const routerPush = router.push;
	router.push = (location) => {
		return routerPush.call(this, location).then(() => {
			callBackRoute(router)
		});
	};

	// 扩展replace方法
	const routerReplace = router.replace;
	router.replace = (location) => {
		return routerReplace.call(this, location).then(() => {
			callBackRoute(router)
		});
	};
};

export { $globalRouterModules, $globalExpandRouter };
