import VueDompurifyHtml from 'vue-dompurify-html'; // 替代v-html插件防止xss
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { setGoodsNum, isObject } from '@/util/util'; // 导出工具类
import '@/assets/style/index.less'; // 引入项目样式文件
import 'vant/lib/index.css'; // 引入vant样式文件
import 'amfe-flexible'; // 导入适配

// 进入应用查询购物车数量
const getGoodsnum = async () => {
	const res = await $globalStore.useCommon.getGoodsNum();
	if (res?.code === 20000) {
		setGoodsNum(res?.data || 0);
	}
};

// 远程国际化-会和本地国际化合并
const getLang = async () => {
	const res = await $globalStore.useCommon.getLang();
	if (res?.code === 20000) {
		if (isObject(res) && isObject(res?.data)) {
			Object.keys(res?.data).forEach((key) => {
				$globalLang.global.mergeLocaleMessage(key, res?.data[key]);
			});
		}
	}
};

// 处理url
const handleLoadUrl = () => {
	const url = window.location.href;
	const match = url.match(/#([^?]+)/);
	const path = match ? match[1] : url.substring(url.indexOf('#') + 2);
	return path;
};

// 获取动态配置的路由
const getDynamicRouter = async () => {
	const res = await $globalStore.useCommon.getDynamicRouter();
	if (res?.code === 20000 && res?.data) {
		res?.data?.forEach((item) => {
			const { meta = {} } = item
			const routerMap = {
				path: `/${item.path || item.name}`,
				name: item.name,
				component: () => import(`@/views/${item.filePath}/${item.name}.vue`),
				meta: meta
			}
			$globalRouter.addRoute(routerMap)
		})
	}
};

const $globalReady = {
	install: (app) => {
		//初始化请求
		app.use($globalHttp());

		// 实例化pinia
		const pinia = createPinia()
		pinia.use(piniaPluginPersistedstate) // 持久化
		app.use(pinia);
		app.use($globalRegisterStore);

		// 路由初始化
		app.use($globalRouter);

		// 初始化语言
		app.use($globalLang);

		// 依赖注入
		app.provide('$provideGoodsnum', getGoodsnum);
		app.provide('$provideLang', getLang);
		app.provide('$provideLoadUrl', handleLoadUrl);
		app.provide('$getDynamicRouter', getDynamicRouter);

		// 导入插件
		app.use(VueDompurifyHtml);
	},
};

export { $globalReady };
