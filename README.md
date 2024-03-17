# Douban Scraper 使用指南

本项目使用 Python Selenium 技术抓取豆瓣网站内容，并提供前端网页托管服务。请谨慎使用，建议使用 VPN 并**频繁更换** IP 地址进行数据下载，以避免被封禁。

## 目录结构说明

### `/scripts` 
包含用于从豆瓣抓取内容并将数据存储到 MongoDB 的脚本。

- `scrap_discussion.py`: 抓取所有讨论的元数据。
- `scrap_topics.py`: 从讨论中抓取主题帖子内容。
- `extract_topic_url.py`: 抓取主题帖中的媒体内容链接并存储到 MongoDB。
- `scrap_comments.py`: 抓取讨论中的所有评论。
- `extract_comment_url.py`: 抓取评论中的媒体内容链接并存储到 MongoDB。
- `media_download.py`: 下载媒体内容并正确重命名到本地文件夹。

### `/dump`
存储从 MongoDB 抓取的数据。

### `/media`
存储从豆瓣下载的媒体文件。每个帖子的评论单独存储，例如 `comments.302374841` 文件夹中存储的是对应帖子的所有评论媒体内容。

### `/frontend`
基于 React 的前端应用程序。

- `/src`：
  - 评论区相关组件（以 `Comment` 开头）：
    - `CommentPager.js`: 评论区页数管理。
    - `CommentCard.js`: 评论卡片设计。
    - `CommentSection.js`: 利用上述两个组件与后端交互，处理内嵌资源的 URL 指向本地文件
  - `DiscussionPage.js`: 讨论页展示。
  - 搜索相关组件（以 `Search` 开头）：
    - `SearchBar.js`: 页面顶部的搜索框。
    - `SearchCard.js`: 搜索结果卡片设计。
    - `SearchPage.js`: 搜索结果展示页面。
  - `Topic.js`: 主题帖展示（直接使用爬取的 HTML，处理内嵌资源的 URL 指向本地文件）。
  - `config.js`: 后端服务的链接配置。

### `/backend`
基于 Node.js 的后端服务。

- `/api/discussions`: 获取所有帖子的元数据。
- `/api/comments/[topicId]?start=[index]`: 获取特定帖子的评论，`start` 参数指定从第几个评论开始获取，之后获取500个。
- `/api/search?query=[]&discussion=[discussionId]`: 在特定讨论帖子中搜索特定词语。
- `/api/topics/[topicId]`: 获取特定帖子的主题内容。

# 技术栈说明

本项目采用的技术栈包括：

- **Web Scraping**: 使用 Selenium 驱动的 headless Firefox（无头模式的火狐浏览器）进行网页内容抓取。无头模式允许在没有图形界面的服务器环境中运行浏览器，适合自动化脚本运行。

- **数据库**: 使用 MongoDB 作为数据存储解决方案。MongoDB 是一个基于文档的数据库，非常适合存储结构化的网页抓取数据。

- **后端**: 采用 Node.js 构建后端服务。Node.js 的非阻塞 I/O 特性使其成为处理大量并发请求的理想选择，适合作为数据密集型实时应用的后端服务。

- **前端**: 使用 React 开发前端用户界面。React 的组件化架构支持高效地开发复杂的单页面应用（SPA），提升用户交互体验。

## 环境配置

为了在本地环境中运行本项目，需要安装以下软件：

- Firefox 浏览器及对应的 GeckoDriver。
- MongoDB 数据库。
- Node.js 运行环境。

具体的安装步骤和配置方法请参考各自的官方文档。

## 运行项目

1. 确保 MongoDB 服务正在运行。
2. 在 `/backend` 目录下运行 `npm install` 安装依赖，然后使用 `node server.js` 启动后端服务。
3. 在 `/frontend` 目录下运行 `npm install` 安装依赖，然后使用 `npm start` 启动 React 应用。
4. 使用 `/scripts` 目录下的脚本进行数据抓取。确保在执行脚本之前已经正确配置了 Selenium 和 headless Firefox 环境。

## Windows环境配置指南

在Windows系统上配置开发环境可能与Linux系统略有不同。以下是针对Windows用户的简易安装指南：

### 安装Firefox浏览器及GeckoDriver

1. **Firefox浏览器**: 直接从[Firefox官网](https://www.mozilla.org/firefox/new/)下载安装程序并安装。
2. **GeckoDriver**:
   - 下载适用于Windows的[GeckoDriver](https://github.com/mozilla/geckodriver/releases)。
   - 解压下载的文件。
   - 将解压后的`geckodriver.exe`文件放置在一个目录中（例如`C:\WebDriver\bin`）。
   - 将该目录添加到系统的环境变量`Path`中。这样，Selenium就能在运行时定位到GeckoDriver。

### 安装MongoDB数据库

1. 下载[MongoDB社区版](https://www.mongodb.com/try/download/community)安装包。
2. 运行安装程序，选择“Complete”安装类型。
3. 选择安装目录，建议使用默认设置。
4. 完成安装后，配置MongoDB服务：
   - 打开命令提示符（以管理员身份）。
   - 运行`"C:\Program Files\MongoDB\Server\{版本号}\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\{版本号}\mongod.cfg" --install`以安装服务。
   - 使用`net start MongoDB`命令启动MongoDB服务。

### 安装Node.js

1. 从[Node.js官网](https://nodejs.org/)下载Windows安装包。
2. 运行安装程序，包含在安装过程中选择的所有默认设置。
3. 重新启动计算机以确保设置生效。
### 安装Python及必要的库

在完成Node.js和MongoDB的安装后，您需要安装Python及项目所需的库。以下步骤指导您完成安装：

1. 如果尚未安装Python，从[Python官网](https://www.python.org/)下载并安装Python。
2. 打开命令提示符或PowerShell窗口。
3. 使用pip安装项目所需的Python库：
```
pip install selenium beautifulsoup4 pymongo lxml regex
```

### 验证安装

安装完成后，可以在命令提示符中运行以下命令以验证安装是否成功：

- `firefox --version`（检查Firefox版本）
- `geckodriver --version`（检查GeckoDriver版本）
- `mongo --version`（检查MongoDB版本）
- `node --version`（检查Node.js版本）

如果上述命令均能正确显示版本信息，则表示环境配置成功。

## ArchLinux环境配置指南

### 推荐使用mongodb-bin和mongosh-bin来安装MongoDB和MongoDB Shell：
```
yay -S mongodb-bin mongosh-bin
sudo systemctl start mongodb
sudo systemctl enable mongodb
```
### 安装Node.js及npm：
```
sudo pacman -S nodejs npm
```
### 安装Python并创建虚拟环境：

```
python -m venv douban-scraper-env
source douban-scraper-env/bin/activate
pip install selenium beautifulsoup4 pymongo lxml regex
```



## 请注意，运行抓取脚本时应遵循豆瓣网站的使用协议，合理安排抓取频率和时间，避免对豆瓣服务器造成不必要的负担。


