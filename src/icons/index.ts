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
	if (config.templateFile) {
		const relativePath = path.join(commandPath, config.templateFile);
		try {
			template = fs.readFileSync(relativePath, "utf-8");
		} catch (error) {
			console.log(chalk.red(`🔥 图标模板文件不存在 `), relativePath);
		}
	}
	const routesPath = path.resolve(commandPath, config.iconRoot);
	// 同步遍历目录下的所有文件
	rd.eachSync(routesPath, (fileDir, stats) => {
		const isValidPicture =
			stats.isFile() && /svg|png|jpeg/.test(path.extname(fileDir));
		// console.log(fileDir);
		if (isValidPicture) {
			const name = path.basename(fileDir, path.extname(fileDir));
			const iconFileName = path.basename(fileDir);
			// 转换为双驼峰写法
			const iconName = _.upperFirst(_.camelCase(name));
			const iconComponentName = `${iconName}Icon`;
			const code = Handlebars.compile(template)({
				iconName,
				iconFileName,
				iconComponentName,
			});
			const formatCode = prettierFormat(code);
			const iconPath = path.join(
				config.iconTarget,
				`/${iconComponentName}.tsx`
			);
			fs.writeFileSync(iconPath, formatCode, "utf-8");
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
