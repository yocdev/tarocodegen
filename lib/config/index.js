"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const config = {
    dev: {
        routerRoot: path_1.default.join("./example", "routes/pages"),
        routerTarget: path_1.default.join("./example", "routes"),
        iconRoot: path_1.default.join("./example", 'icons/source'),
        iconTarget: path_1.default.join("./example", 'icons'),
    },
    prod: {
        routerRoot: path_1.default.join("./src", "pages"),
        routerTarget: path_1.default.join("./src", "router"),
        iconRoot: path_1.default.join("./src", 'components/icon/source'),
        iconTarget: path_1.default.join("./src", 'components/icon'),
    },
};
// @ts-ignore
const nodeEnv = "prod" || "dev";
exports.default = config[nodeEnv];
