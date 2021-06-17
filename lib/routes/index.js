"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const rd_1 = __importDefault(require("rd"));
const ajv_1 = __importDefault(require("ajv"));
const chalk_1 = __importDefault(require("chalk"));
const config_1 = __importDefault(require("../config"));
const packageConfig = {
    type: "object",
    properties: {
        name: { type: "string" },
        independent: { type: "boolean" },
    },
    additionalProperties: false,
};
const ajv = new ajv_1.default();
const pkgConfigValidate = ajv.compile(packageConfig);
const normalRouterReg = /pages\/([a-zA-Z]+)\/index.(tsx|js|ts|jsx)$/;
const tabRouterReg = /pages\/tabs\/([a-zA-Z]+)\/index.(tsx|js|ts|jsx)$/;
const packageRouterReg = /pages\/packages\/([a-zA-Z]+)\/([a-zA-Z]+)\/index.(tsx|js|ts|jsx)$/;
var RouteType;
(function (RouteType) {
    RouteType["NORMAL"] = "normal";
    RouteType["TAB"] = "tab";
    RouteType["PACKAGE"] = "package";
})(RouteType || (RouteType = {}));
function generateRoutes() {
    // 获得当前执行node命令时候的文件夹目录名
    const commandPath = process.cwd();
    const routesPath = path_1.default.resolve(commandPath, config_1.default.routerRoot);
    const routes = {
        tabs: {},
        packages: {},
        subpackages: [],
        pages: [],
        source: {},
        names: [],
        customRoutes: {}
    };
    // 同步遍历目录下的所有文件
    rd_1.default.eachSync(routesPath, (fileDir, stats) => {
        var _a;
        // 每找到一个文件都会调用一次此函数
        // 参数s是通过 fs.stat() 获取到的文件属性值
        fileDir = fileDir.split(path_1.default.sep).join("/");
        const isFile = stats.isFile(); //是文件
        const routeType = isRouter(fileDir);
        if (isFile && routeType) {
            const name = path_1.default.basename(path_1.default.dirname(fileDir));
            const routePath = `pages${fileDir.replace(routesPath, "")}`;
            if (routes.names.includes(name)) {
                throw Error(`路由名 ${name} 重复了，请修改后再更新 \n ${routePath} \n ${routes.source[name]}`);
            }
            else {
                const routeUsefulPath = removeExtname(routePath);
                if (routePath.includes("tabs")) {
                    routes.tabs[name] = routeUsefulPath;
                }
                if (routePath.includes("packages")) {
                    // const names = fileDir.match(packageRouterReg);
                    const rootKeys = routePath.split(path_1.default.sep);
                    const root = rootKeys.slice(0, 3).join(path_1.default.sep);
                    const pagePath = rootKeys.slice(3, rootKeys.length).join(path_1.default.sep);
                    if (Object.keys(routes.packages).indexOf(root) > -1) {
                        (_a = routes.packages[root]) === null || _a === void 0 ? void 0 : _a.push(removeExtname(pagePath));
                    }
                    else {
                        routes.packages[root] = [removeExtname(pagePath)];
                    }
                }
                else {
                    routes.pages.push(routeUsefulPath);
                }
                routes.source[name] = routeUsefulPath;
                const shortLink = name.replace(/([A-Z])/g, "-$1").toLowerCase();
                routes.customRoutes[`/${routeUsefulPath}`] = `/${shortLink}`;
                routes.names.push(name);
            }
        }
    });
    const packageRoots = Object.keys(routes.packages);
    if (packageRoots.length > 0) {
        packageRoots.forEach((root) => {
            const subpackage = {
                root,
                name: root.split(path_1.default.sep).pop(),
                pages: routes.packages[root],
            };
            const configPath = path_1.default.join(path_1.default.resolve(config_1.default.routerRoot, "../"), `${root}/config.json`);
            // 判断配置文件是否存在
            try {
                fs_1.default.accessSync(configPath, fs_1.default.constants.F_OK);
                let pkgConfig = fs_1.default.readFileSync(configPath, "utf-8");
                try {
                    pkgConfig = JSON.parse(pkgConfig);
                }
                catch (error) {
                    console.log(chalk_1.default.yellow(`分包配置无效:${configPath}`));
                }
                if (!pkgConfigValidate(pkgConfig)) {
                    console.log(chalk_1.default.yellow(`分包配置无效:${configPath}`));
                    console.log(pkgConfigValidate.errors);
                }
                else {
                    Object.assign(subpackage, pkgConfig);
                }
            }
            finally {
                routes.subpackages.push(subpackage);
            }
        });
    }
    // 生成 routes.json;注意判断文件存在的话要覆盖写入
    fs_1.default.writeFileSync(path_1.default.resolve(config_1.default.routerTarget, "./routes.json"), JSON.stringify(routes, null, 2));
    if (routes.names.length > 0) {
        fs_1.default.writeFileSync(path_1.default.resolve(config_1.default.routerTarget, "./types.ts"), `export type RoutesName = ${routes.names
            .map((name) => `"${name}"`)
            .join(" | ")}
		`);
    }
}
exports.default = generateRoutes;
// 判断改路径是否是一个路由路径
function isRouter(filepath) {
    if (!/index.(js|jsx|ts|tsx)/.test(path_1.default.basename(filepath))) {
        return false;
    }
    if (normalRouterReg.test(filepath)) {
        return RouteType.NORMAL;
    }
    if (tabRouterReg.test(filepath)) {
        return RouteType.TAB;
    }
    if (packageRouterReg.test(filepath)) {
        return RouteType.PACKAGE;
    }
    return false;
    // return ["component","components","assets"].every((keyword) => !filepath.includes(keyword));
}
// 去掉文件后缀，小程序路由不需要
function removeExtname(filepath) {
    return filepath.replace(path_1.default.extname(filepath), "");
}
