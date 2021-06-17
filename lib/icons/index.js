"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const rd_1 = __importDefault(require("rd"));
const handlebars_1 = __importDefault(require("handlebars"));
const lodash_1 = __importDefault(require("lodash"));
const prettier_1 = __importDefault(require("prettier"));
const config_1 = __importDefault(require("../config"));
function generateIcons() {
    // 获得当前执行node命令时候的文件夹目录名
    const commandPath = process.cwd();
    const template = fs_1.default.readFileSync(path_1.default.join(__dirname, "./template/taro.handlebars"), "utf-8");
    const routesPath = path_1.default.resolve(commandPath, config_1.default.iconRoot);
    // 同步遍历目录下的所有文件
    rd_1.default.eachSync(routesPath, (fileDir, stats) => {
        const isValidPicture = stats.isFile() && /svg|png|jpeg/.test(path_1.default.extname(fileDir));
        // console.log(fileDir);
        if (isValidPicture) {
            const name = path_1.default.basename(fileDir, path_1.default.extname(fileDir));
            const iconFileName = path_1.default.basename(fileDir);
            // 转换为双驼峰写法
            const iconName = lodash_1.default.upperFirst(lodash_1.default.camelCase(name));
            const iconComponentName = `${iconName}Icon`;
            const code = handlebars_1.default.compile(template)({
                iconName,
                iconFileName,
                iconComponentName,
            });
            const formatCode = prettierFormat(code);
            const iconPath = path_1.default.join(config_1.default.iconTarget, `/${iconComponentName}.tsx`);
            fs_1.default.writeFileSync(iconPath, formatCode, "utf-8");
        }
    });
}
exports.default = generateIcons;
const prettierFormat = (content) => {
    const options = {
        printWidth: 120,
        tabWidth: 2,
        trailingComma: "all",
        parser: "typescript",
    };
    return prettier_1.default.format(content, options);
};
