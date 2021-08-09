import path from "path";
import { nodeEnv } from "./env";
export interface Config {
	routerRoot: string;
	routerTarget: string;
	iconRoot: string;
	iconTarget: string;
}

const configs: Record<string, Config> = {
	dev: {
		routerRoot: path.join("./example", "routes/pages"),
		routerTarget: path.join("./example", "routes"),
		iconRoot: path.join("./example", "icons/source"),
		iconTarget: path.join("./example", "icons"),
	},
	prod: {
		routerRoot: path.join("./src", "pages"),
		routerTarget: path.join("./src", "router"),
		iconRoot: path.join("./src", "components/icon/source"),
		iconTarget: path.join("./src", "components/icon"),
	},
};
const config = configs[nodeEnv] as Config;

export const addToConfig = (configPart: any) => {
	return { ...config, ...configPart };
};

export default config;
