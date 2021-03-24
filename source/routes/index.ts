import fs from "fs";
import path from "path";
import rd from "rd";
import Ajv from "ajv";
import chalk from "chalk";
import config from "../config";
// console.log("检查看下啊", config);
const packageConfig = {
	type: "object",
	properties: {
		name: { type: "string" },

		independent: { type: "boolean" },
	},
	additionalProperties: false,
};
const ajv = new Ajv();
const pkgConfigValidate = ajv.compile(packageConfig);

export default function generateRoutes() {
	// 获得当前执行node命令时候的文件夹目录名
	const commandPath = process.cwd();
	const routesPath = path.resolve(commandPath, config.routerRoot);
	const routes: {
		tabs: Record<string, string>;
		packages: Record<string, string[]>;
		subpackages: {
			root: string;
			name?: string;
			pages: string[];
			independent?: boolean;
		}[];
		pages: string[];
		source: Record<string, string>;
		names: string[];
	} = {
		tabs: {},
		packages: {},
		subpackages: [],
		pages: [],
		source: {},
		names: [],
	};

	// 同步遍历目录下的所有文件
	rd.eachSync(routesPath, (fileDir, stats) => {
		// 每找到一个文件都会调用一次此函数
		// 参数s是通过 fs.stat() 获取到的文件属性值
		const isFile = stats.isFile(); //是文件
		if (isFile && isRouter(fileDir)) {
			const name = path.basename(path.dirname(fileDir));
			const routePath = `pages${fileDir.replace(routesPath, "")}`;
			if (routes.names.includes(name)) {
				throw Error(
					`路由名 ${name} 重复了，请修改后再更新 \n ${routePath} \n ${routes.source[name]}`
				);
			} else {
				const routeUsefulPath = removeExtname(routePath);
				if (routePath.includes("tabs")) {
					routes.tabs[name] = routeUsefulPath;
				}
				if (routePath.includes("package")) {
					const rootKeys = routePath.split(path.sep);
					const root = rootKeys.slice(0, 2).join(path.sep);
					const pagePath = rootKeys.slice(2, rootKeys.length).join(path.sep);
					if (Object.keys(routes.packages).indexOf(root) > -1) {
						routes.packages[root]?.push(removeExtname(pagePath));
					} else {
						routes.packages[root] = [removeExtname(pagePath)];
					}
					// console.log('检查下啊',root)
					// routes.packages.push(routePath);
				} else {
					routes.pages.push(routeUsefulPath);
				}
				routes.source[name] = routeUsefulPath;
				routes.names.push(name);
			}
		}
	});

	const packageRoots = Object.keys(routes.packages);
	if (packageRoots.length > 0) {
		packageRoots.forEach((root) => {
			const subpackage = {
				root,
				pages: routes.packages[root] as string[],
			};
			const configPath = path.join(
				path.resolve(config.routerRoot, "../"),
				`${root}/config.json`
			);
			let pkgConfig = fs.readFileSync(configPath, "utf-8");
			try {
				pkgConfig = JSON.parse(pkgConfig);
			} catch (error) {
				console.log(chalk.yellow(`分包配置无效:${configPath}`));
			}
			if (!pkgConfigValidate(pkgConfig)) {
				console.log(chalk.yellow(`分包配置无效:${configPath}`));
				console.log(pkgConfigValidate.errors);
			} else {
				Object.assign(subpackage, pkgConfig);
			}
			routes.subpackages.push(subpackage);
		});
	}
	// 生成 routes.json
	fs.writeFileSync(
		path.resolve(config.routerTarget, "./routes.json"),
		JSON.stringify(routes, null, 2)
	);
	fs.writeFileSync(
		path.resolve(config.routerTarget, "./types.ts"),
		`export type RoutesName = ${routes.names
			.map((name) => `"${name}"`)
			.join(" | ")}
	`
	);
}

// 判断改路径是否是一个路由路径
function isRouter(filepath: string) {
	if (!/index.(js|jsx|ts|tsx)/.test(path.basename(filepath))) {
		return false;
	}
	return ["component","components","assets"].every((keyword) => !filepath.includes(keyword));
}

// 去掉文件后缀，小程序路由不需要
function removeExtname(filepath: string) {
	return filepath.replace(path.extname(filepath), "");
}
