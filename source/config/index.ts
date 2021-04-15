import path from "path";
interface Config {
	routerRoot: string;
	routerTarget: string
	iconRoot: string;
	iconTarget: string;
}
const config: Record<string, Config> = {
	dev: {
		routerRoot: path.join("./example", "routes/pages"),
		routerTarget: path.join("./example", "routes"),
		iconRoot: path.join("./example", 'icons/source'),
		iconTarget: path.join("./example", 'icons'),
	},
	prod: {
		routerRoot: path.join("./src", "pages"),
		routerTarget: path.join("./src", "router"),
		iconRoot: path.join("./src", 'components/icon/source'),
		iconTarget: path.join("./src", 'components/icon'),
	},
};
// @ts-ignore
const nodeEnv = process.env.NODE_ENV || "dev";

export default config[nodeEnv] as Config;
