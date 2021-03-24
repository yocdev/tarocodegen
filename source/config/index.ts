import path from "path";
const config: Record<string, { routerRoot: string; routerTarget: string }> = {
	dev: {
		routerRoot: path.join("./example", "routes/pages"),
		routerTarget: path.join("./example", "routes"),
	},
	prod: {
		routerRoot: path.join("./src", "pages"),
		routerTarget: path.join("./src", "router"),
	},
};
// @ts-ignore
const nodeEnv = process.env.NODE_ENV || "dev";

export default config[nodeEnv] as { routerRoot: string; routerTarget: string };
