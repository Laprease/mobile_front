import dynamicImport from 'vite-plugin-dynamic-import'; // 异步导入插件

const DynamicImport = (viteEnv = {}) => {
	return dynamicImport({}); 
};

export { DynamicImport };
