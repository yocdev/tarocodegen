import fs from "fs";
import path from "path";
import rd from "rd";
import Handlebars from "handlebars";
import _ from "lodash";
import prettier from "prettier";

import readConfig from "../helper/readConfig";
import chalk from "chalk";

const config = readConfig();
console.log(config);
export default function generateIcons() {
	// 获得当前执行node命令时候的文件夹目录名
	const commandPath = process.cwd();

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
	rd.eachSync(routesPath, (fileDir, stats) => {
		const extname = path.extname(fileDir);
		const isValidPicture =
			stats.isFile() && /svg|png|jpeg/.test(path.extname(fileDir));
		// console.log(fileDir);
		if (isValidPicture) {
			const name = path.basename(fileDir, path.extname(fileDir));
			const iconFileName = path.basename(fileDir);
			// 转换为双驼峰写法
			const iconName = _.upperFirst(_.camelCase(name));
			const iconComponentName = `Icon${iconName}`;
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
			// const code = Handlebars.compile(finalTemplate)({
			// 	iconName,
			// 	iconFileName,
			// 	iconComponentName,
			// });
			// const formatCode = prettierFormat(code);
			// const iconPath = path.join(
			// 	config.iconTarget,
			// 	`/${iconComponentName}.tsx`
			// );
			// fs.writeFileSync(iconPath, formatCode, "utf-8");
			generator(finalTemplate, iconComponentName,{
				iconName,
				iconFileName,
				iconComponentName,
			})
		}
	});
}

const prettierFormat = (content: string) => {
	const options = {
		printWidth: 120,
		tabWidth: 2,
		trailingComma: "all",
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
