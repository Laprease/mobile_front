import Home from "@/views/Home.vue";
import login from "@/views/login.vue";
const routes = [
	{
		path: "/login",
		name: "login",
		component: login,
		meta: {},
	},
	{
		path: "/home",
		name: "Home",
		component: Home,
		meta: {
			isKeepAlive: true,
		},
	},
	{
		path: "/goodsDetail",
		name: "goodsDetail",
		component: () => import("@/views/common/goodsDetail.vue"),
		meta: {
			isRouterKeepAlive: true,
		},
	},
];

export { routes };
