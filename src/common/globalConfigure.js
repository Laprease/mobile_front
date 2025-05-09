import { useRoute } from "vue-router";

const event = {}
const $globalEventCallback = (route = {}, option = {}) => {
	const { path, meta = {} } = route
	const { isRefreshKeepAlive = true } = option
	const { isAlwaysKeepAlive = false } = meta
	if (event[path] && isRefreshKeepAlive && !isAlwaysKeepAlive) {
		event[path]()
		event[path].isReload = true
	}
}
const $globalConfigure = (callback) => {
	const route = useRoute()
	const { path, meta = {} } = route
	const { isKeepAlive = false, isAlwaysKeepAlive = false, isRouterKeepAlive = false } = meta
	const keepAlive = isKeepAlive || isAlwaysKeepAlive || isRouterKeepAlive
	if (keepAlive) {
		event[path] = callback
		Promise.resolve().then(() => {
			const { isReload = false } = callback
			if (!isReload) {
				isAlwaysKeepAlive && callback()
				$globalEventCallback(route)
			}
		})
	}
};

export { $globalConfigure, $globalEventCallback };
