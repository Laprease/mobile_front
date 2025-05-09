const modulesConstant = import.meta.glob("../constant/**/*.js", {
	eager: true,
});

const constantMap = {};

for (const [key, value] of Object.entries(modulesConstant)) {
	const name = key.replace(/^\.\.\/(.*)\.\w+$/, "$1").split("/")[1];
	if (name && value) {
		constantMap[name] = {}
		for (const [childKey, childValue] of Object.entries(value)) {
			constantMap[name][childKey] = childValue
		}
	}
}

const $globalConstant = (modelName) => {
	return constantMap[modelName]
}

export { $globalConstant };
