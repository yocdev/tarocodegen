# tarocodegen

> 用于自动生成项目里那些逻辑重复的中间层代码

## Install

```bash
$ yarn add @yocdev/tarocodegen
```

## CLI

```
$ tarocodegen --help

  Usage
    $ tarocodegen

  Options
    --type  生成类型[router]

  Examples
    $ tarocodegen --type=router
```

## 类型
### router - 自动生成微信小程序路由配置文件
**问题:**
- 小程序路由配置需要手动在 `app.config.json` 里填写路由名和对应的路由文件路径。
- 实际业务代码中又需要在跳转时使用路由文件路径，但这样硬编码路由文件路径的形式并不好维护。

**原理:**

路由文件路径在新建路由文件时就确定了，故可以根据 `pages/` 目录下的所有路由文件自动生成带路由名的配置文件。

**使用:**
- 生成的 `routes.json` 包含符合 `app.config.json` 规则的路由信息，可直接用于 `app.config.json` 里注册路由
- 生成的 `routes.json` 同时为路由添加了完备的类型描述，可以在实际业务代码中使用路由名来实现跳转。

**符合要求的路由文件路径：**
1. pages/[routerName]/index.tsx
2. pages/packages/[packageName]/[routerName]/index.tsx
3. pages/tabs/[routerName]/index.tsx

**TODO:**
- [ ] 支持分包预下载配置


### icon - 自动生成独立文件的 icon 组件
**问题：**
- 项目里的图标文件一般以 image 或 background 的形式使用，一般引入图标文件及设置尺寸和颜色等存在重复的代码，这部分代码适合自动生成
- 图标组件在增加删除时都需要修改代码，这部分代码也可以自动生成
- 使用图标组件时需要有枚举值描述项目已有哪些图标可供使用

**原理:**

读取图标目录下所有有效的图标文件，自动生成对应的独立 IconXxx 组件文件。增删图标只需重新运行工具即可。

**使用:**
