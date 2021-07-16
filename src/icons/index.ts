import fs from "fs";
import path from "path";
import rd from "rd";
import Handlebars from "handlebars";
import _ from "lodash";
import prettier from "prettier";
import svgr from "@svgr/core";
import glob from "glob-promise";

import readConfig from "../helper/readConfig";
import chalk from "chalk";
import { nodeEnv } from "../config/env";

const config = readConfig();
if (nodeEnv === "dev") {
	console.log(config);
}
const commandPath = process.cwd();
export default function generateIcons() {
	// 获得当前执行node命令时候的文件夹目录名

	let template = fs.readFileSync(
		path.join(__dirname, "./template/taro.handlebars"),
		"utf-8"
	);
	let templates: any[] = [];
	if (config.templateFile) {
		// 单模版模式
		const relativePath = path.join(commandPath, config.templateFile);
		try {
			template = fs.readFileSync(relativePath, "utf-8");
		} catch (error) {
			console.log(chalk.red(`🔥 图标模板文件不存在 `), relativePath);
		}
	}
	if (config.templates) {
		// 多模板模式
		config.templates.forEach((item: any) => {
			const relativePath = path.join(commandPath, item.templateFile);
			try {
				const templateContent = fs.readFileSync(relativePath, "utf-8");
				if (templateContent) {
					templates.push({
						fileType: item.fileType,
						template: templateContent,
					});
				}
			} catch (error) {
				console.log(chalk.red(`🔥 图标模板文件不存在 `), relativePath);
			}
		});
	}
	const routesPath = path.resolve(commandPath, config.iconRoot);
	// 同步遍历目录下的所有文件
	rd.eachSync(routesPath, async (fileDir, stats) => {
		const extname = path.extname(fileDir);
		const isValidPicture =
			stats.isFile() &&
			/svg|png|jpeg/.test(path.extname(fileDir)) &&
			!/@[23]x/.test(fileDir);
		// console.log(fileDir);
		if (isValidPicture) {
			const name = path.basename(fileDir, path.extname(fileDir));
			const iconFileName = path.basename(fileDir);
			// 转换为双驼峰写法
			const iconName = _.upperFirst(_.camelCase(name));
			const iconComponentName = config.prefix
				? `${config.prefix}${iconName}`
				: iconName;
			let finalTemplate = template;
			if (templates.length > 0) {
				templates.some((item) => {
					const reg = new RegExp(item.fileType);
					if (reg.test(extname)) {
						finalTemplate = item.template;
						return true;
					}
					return false;
				});
			}
			let skipGenerator = false;
			if (config.svgr && /svg/.test(extname)) {
				skipGenerator = await svgrGenerator(fileDir, iconComponentName);
			}
			if (!skipGenerator) {
				generator(finalTemplate, iconComponentName, {
					iconName,
					iconFileName,
					iconComponentName,
				});
			}
		}
	});
}

const prettierFormat = (content: string) => {
	const options = {
		printWidth: 120,
		tabWidth: 2,
		trailingComma: "all",
		semi: false,
		parser: "typescript",
	};
	return prettier.format(content, options);
};

const generator = (
	template: string,
	fileName: string,
	compileData: Record<string, string>
) => {
	const code = Handlebars.compile(template)(compileData);
	const formatCode = prettierFormat(code);
	const iconPath = path.join(config.iconTarget, `/${fileName}.tsx`);
	fs.writeFileSync(iconPath, formatCode, "utf-8");
};

const svgrGenerator = async (fileDir: string, componentName: string) => {
	// TODO: 判断是否被过滤
	if (config.svgr.filter) {
		try {
			const files = await glob(config.svgr.filter);
			const skip = files.some((file) => {
				const absoluteFilePath = path.resolve(commandPath, file);
				return absoluteFilePath === fileDir;
			});
			if (skip) {
				return !skip;
			}
		} catch (error) {
			console.log(error);
		}
	}

	// TODO: 读取文件数据
	const svgCode = fs.readFileSync(fileDir, "utf-8");
	config.svgr.platform.forEach((platform: string) => {
		svgr(
			svgCode,
			{
				native: platform === "rn",
				dimensions: false,
				replaceAttrValues: {
					"#000": "{props.color}",
					"#000000": "{props.color}",
					currentColor: "{props.color}",
				},
				plugins: [
					"@svgr/plugin-svgo",
					"@svgr/plugin-jsx",
					"@svgr/plugin-prettier",
				],
			},
			{ componentName: componentName }
		).then((code: string) => {
			const iconBaseName =
				platform === "h5"
					? `${componentName}.tsx`
					: `${componentName}.${platform}.tsx`;
			const iconPath = path.join(config.iconTarget, `/${iconBaseName}`);
			fs.writeFileSync(iconPath, prettierFormat(code), "utf-8");
		});
	});
	return true;
};
