![repository-open-graph](repository-open-graph.png)

# Fake API

## 项目概述

Fake API 是一个轻量级的模拟接口服务工具，专为前后端分离开发设计。它允许前端开发者在后端接口未完成前，通过简单配置即可快速创建模拟接口，实现独立开发和测试。

## 功能特性

- **前后端分离开发**：前端可独立于后端进行开发，无需等待后端接口就绪
- **简单易用**：基于 Node.js 环境，使用直观，学习成本低
- **灵活扩展**：支持根据请求参数返回不同数据，满足复杂业务场景
- **请求记录**：自动保存请求记录，便于调试和回溯
- **开发无侵入**：仅需修改前端项目的 baseUrl 即可切换到模拟接口
- **支持共享**：可将服务部署后分享给团队成员共同使用

## 安装步骤

1. 克隆或下载项目到本地
2. 进入项目根目录，执行 `npm install` 安装依赖
3. 使用 `config-template.js` 模板文件创建 `config.js` 配置文件
4. 执行 `npm start` 启动服务

## 配置说明

### 配置文件结构

通过 `config.js` 文件可以配置以下参数：

- `port`：服务端口号，默认为 3000
- `apiDir`：接口数据文件存储目录，默认为 `api`
- `logDir`：请求日志存储目录，默认为 `logs`
- `cors`：是否允许跨域请求，默认为 `true`

### 配置示例

```javascript
module.exports = {
  port: 3000,
  apiDir: 'api',
  logDir: 'logs',
  cors: true
};
```

## 使用方法

### 1. 启动服务

```bash
npm start
```

服务启动后，将在控制台输出服务地址，默认格式为 `http://localhost:3000`。

### 2. 创建接口

直接访问需要模拟的接口 URL，例如：

```
http://localhost:3000/api/users
http://localhost:3000/api/articles/1
```

### 3. 编写返回数据

访问接口后，系统会在配置的 `apiDir` 目录下自动生成对应的 JSON 文件，例如：

- `api/api/users.json`
- `api/api/articles/1.json`

在生成的 JSON 文件中填写需要返回的数据，例如：

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "张三",
      "age": 25
    },
    {
      "id": 2,
      "name": "李四",
      "age": 30
    }
  ]
}
```

### 4. 再次访问接口

保存 JSON 文件后，再次访问相同的接口 URL，即可获得配置的返回数据。

## 高级功能

### 根据请求参数返回不同数据

Fake API 支持根据请求参数（如查询参数、请求体）返回不同数据。你可以在 JSON 文件名中使用占位符，例如：

- `api/api/users/[id].json`：匹配 `http://localhost:3000/api/users/1`、`http://localhost:3000/api/users/2` 等
- `api/api/users?name=[name].json`：匹配 `http://localhost:3000/api/users?name=张三`、`http://localhost:3000/api/users?name=李四` 等

### 支持多种请求方法

Fake API 支持 GET、POST、PUT、DELETE 等多种 HTTP 请求方法。对于不同的请求方法，你可以创建不同的文件，例如：

- `api/api/users.GET.json`：处理 GET 请求
- `api/api/users.POST.json`：处理 POST 请求
- `api/api/users.PUT.json`：处理 PUT 请求
- `api/api/users.DELETE.json`：处理 DELETE 请求

## 常见问题

### Q：如何修改服务端口？
A：在 `config.js` 文件中修改 `port` 参数即可。

### Q：如何查看请求日志？
A：请求日志会自动保存在配置的 `logDir` 目录下，按日期生成日志文件。

### Q：是否支持 HTTPS？
A：目前暂不支持 HTTPS，仅支持 HTTP。

### Q：如何处理跨域请求？
A：在 `config.js` 文件中设置 `cors: true` 即可允许跨域请求。

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

---

[English Version](README.en.md)