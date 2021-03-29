# codegen

> 用于自动生成项目里那些逻辑重复的中间层代码


## Install

```bash
$ yarn add @redchili/codegen
```


## CLI

```
$ codegen --help

  Usage
    $ codegen

  Options
    --type  生成类型[router]

  Examples
    $ codegen --type=router
```

## 类型
### router - 自动生成微信小程序路由配置文件
**问题:**
- 小程序路由配置需要手动在 app.config.json 里填写路由名和对应的路由文件路径。
- 实际业务代码中又需要在跳转时使用路由文件路径，但这样硬编码路由文件路径的形式并不好维护。

**原理:**

路由文件路径在新建路由文件时就确定了，故可以根据 `pages/` 目录下的所有路由文件自动生成带路由名的配置文件。

**用途:**
- 生成的 routes.json 包含符合 app.config.json 规则的路由信息，可直接用于 app.config.json 里注册路由
- 生成的 routes.json 同时为路由添加了完备的类型描述，可以在实际业务代码中使用路由名来实现跳转。

**符合要求的路由文件路径：**
1. pages/[routerName]/index.tsx
2. pages/packages/[packageName]/[routerName]/index.tsx
3. pages/tabs/[routerName]/index.tsx


