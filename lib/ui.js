"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ink_1 = require("ink");
const ink_select_input_1 = __importDefault(require("ink-select-input"));
const ink_spinner_1 = __importDefault(require("ink-spinner"));
const chalk_1 = __importDefault(require("chalk"));
const routes_1 = __importDefault(require("./routes"));
const icons_1 = __importDefault(require("./icons"));
const items = [
    {
        label: "路由",
        value: "routes",
    },
    {
        label: "图标",
        value: "icons",
    },
];
const App = ({ type }) => {
    const handleSelect = (item) => {
        setProcess("processing");
        if (item.value === "routes") {
            try {
                routes_1.default();
                setProcess("success");
            }
            catch (error) {
                console.log(chalk_1.default.red(error));
                setProcess("failed");
            }
        }
        else if (item.value === 'icons') {
            try {
                icons_1.default();
                setProcess("success");
            }
            catch (error) {
                console.log(chalk_1.default.red(error));
                setProcess("failed");
            }
        }
    };
    const [process, setProcess] = react_1.useState("init");
    react_1.useEffect(() => {
        if (type) {
            setProcess("processing");
        }
    }, []);
    return (react_1.default.createElement(ink_1.Box, null,
        process === "init" ? (react_1.default.createElement(ink_select_input_1.default, { items: items, onSelect: handleSelect })) : null,
        process === "processing" ? (react_1.default.createElement(ink_1.Text, null,
            react_1.default.createElement(ink_1.Text, { color: "green" },
                react_1.default.createElement(ink_spinner_1.default, { type: "dots" })),
            " Loading")) : null,
        process === "success" ? react_1.default.createElement(ink_1.Text, null, "\uD83C\uDF89 \u7EC4\u4EF6\u5DF2\u66F4\u65B0") : null,
        process === "failed" ? react_1.default.createElement(ink_1.Text, null, "\u274C \u7EC4\u4EF6\u66F4\u65B0\u5931\u8D25") : null));
};
module.exports = App;
exports.default = App;
