import Ajv from "ajv";
import chalk from "chalk";
import config, { addToConfig, Config } from "../config";
import readExtraConfig from "../util/readExtraConfig";

const configSchema = {
	type: "object",
	properties: {
		routerEntry: { type: "string" },
		iconRoot: { type: "string" },
		iconTarget: { type: "string" },
		templateFile: { type: "string" },
		prefix: { type: "string" },
		svgr: {
			type: "object",
			properties: {
				platform: { type: "array", items: { type: "string" } },
				filter: { type: "string" },
			},
			required: ["platform"],
		},
		templates: {
			type: "array",
			items: {
				type: "object",
				properties: {
					fileType: { type: "string" },
					templateFile: { type: "string" },
				},
			},
		},
	},
	additionalProperties: false,
};

const ajv = new Ajv();
const iconConfigValidate = ajv.compile(configSchema);

const codegenConfigPath = "./.codegen/config.json";

export default function readConfig() {
	const codegenConfig = readExtraConfig(codegenConfigPath);
	if (iconConfigValidate(codegenConfig)) {
		return addToConfig(codegenConfig as Config);
	} else {
		console.log(
			chalk.red(`🔥 配置项错误 `),
			JSON.stringify(iconConfigValidate.errors)
		);
	}
	return config;
}
