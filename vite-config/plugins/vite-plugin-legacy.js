import legacy from "@vitejs/plugin-legacy"; // 兼容低版本浏览器插件
const legacyPlugin = (viteEnv = {}) => {
	return legacy();
};

export { legacyPlugin };
