### 项目介绍
本项目旨在收集和整理网络上优秀和免费的教程，将其转为PDF文件，以便在阅读器上阅读，项目中提供的PDF文件为A6大小，适合在IReader T6中阅读，如果不能适配你的阅读器，请Fork源代码，自行修改导出的参数。如果大家有优秀的课程想要分享，欢迎在Issues中提出，我会及时更新出PDF文件。
### PDF文件
本项目导出的PDF文件都放在百度网盘中，下面为分享的链接
> **链接:https://pan.baidu.com/s/1LykoDdRxJvd36ZJcTf709A  密码:f177**
##### JavaScript
* [阮一峰JavaScript教程](https://pan.baidu.com/s/1LykoDdRxJvd36ZJcTf709A)
* [阮一峰ES6教程](https://pan.baidu.com/s/1LykoDdRxJvd36ZJcTf709A)
* [TypeScript入门教程](https://pan.baidu.com/s/1LykoDdRxJvd36ZJcTf709A)

##### ReactJs
* [ReactJs小书](https://pan.baidu.com/s/1LykoDdRxJvd36ZJcTf709A)
* [九部知识库之ReactJS精选文章](https://pan.baidu.com/s/1LykoDdRxJvd36ZJcTf709A)

#### NodeJS
* [七天学会NodeJS](https://pan.baidu.com/s/1LykoDdRxJvd36ZJcTf709A)

##### 面试复习
* [前端面试复习知识点集合](https://pan.baidu.com/s/1LykoDdRxJvd36ZJcTf709A)
* [计算机通识](https://pan.baidu.com/s/1LykoDdRxJvd36ZJcTf709A)
* [各种常见布局实现和案例分析](https://pan.baidu.com/s/1LykoDdRxJvd36ZJcTf709A)

##### 其他
### 添加方法
更改node_modules中percollate里面index.js中的cleanup方法，将
```
const content = (await got(encodeURI(decodeURI(url)), {
				 
			})).body;
```
改为
```
let content
		if(options.usePup) {
			const browser = await pup.launch();
			const page = await browser.newPage();
			await page.goto(url, { waitUntil: "networkidle0" });
		
			content = await page.content().then(v => {
				return v
			}).catch((err) => {
				spinner.fail('获取页面内容失败！')
			});
			await browser.close();
		} else {
			content = (await got(encodeURI(decodeURI(url)), {
				 
			})).body;
		}
```
如果网页内容是动态生成的，设置usePup为true即可

### 修改puppeteer
[点击查看代码](https://github.com/danburzo/percollate/pull/91/commits/916934009050317502f3dd91ebf50338a03b9da8)

### 依赖模块

- [cheerio](https://www.npmjs.com/package/cheerio)
  > cheerio 是 nodejs 的抓取页面模块，为服务器特别定制的，快速、灵活、实施的 jQuery 核心实现。适合各种 Web 爬虫程序
- [request](https://www.npmjs.com/package/request)
  > Request 是 Node.js 中的一个模块，目标是用最可能简单的方式，在 Node.js 发起 HTTP 请求。此外也支持最新的 HTTPS 协议
- [percollate](https://github.com/danburzo/percollate)
  > 一个通过网址将网页转成 PDF 的命令行工具，NodeJS 版本要大于 8.6.0，如果出现安装失败，请翻墙后再安装
- [markdown-pdf](https://www.npmjs.com/package/markdown-pdf)
  > 将 markdown 文件转成 PDF 文件

 ### 启动
 安装依赖
 > npm install 

启动项目
 > node index

 
