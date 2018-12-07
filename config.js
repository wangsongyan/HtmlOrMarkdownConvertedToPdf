const $ = require("cheerio");
// PDF样式
const baseOpt = {
  css: "@page { size: 8.2in 14.5in } html { font-size: 18pt }",  // 华为p10
  cssIReader: "@page { size: A6 landscape; margin: 14pt } html { font-size: 14pt } ", // iReader T6
};

// 阮一峰JS教程
const javaScriptCourse = {
  url: "https://wangdoc.com/javascript", // 要爬取的网站地址
  name: "阮一峰JavaScript教程.pdf", // 导出的文件名字
  wrapEle: ".menu-list", //  导航父元素的class
  css: "@page { size: A6 landscape } html { font-size: 18pt } ", // 生成pdf的大小和字体
  getUrlList(body, ele, url) {
    // 从返回的html中获取章节地址
    let urlList = [];
    $(body)
      .find(ele)
      .eq(0)
      .find("li a")
      .each((i, v) => {
        const pathStr = $(v).attr("href");
        const path = pathStr.slice(pathStr.indexOf("/"));
        urlList.push(url + path);
      });
    return urlList;
  }
};

// 阮一峰ES6教程
const es6Course = {
  url: "http://es6.ruanyifeng.com/",
  pageApi: "http://es6.ruanyifeng.com/sidebar.md",
  name: "阮一峰ECMAScript6入门",
  wrapEle: "#sidebar ol",
  getUrlList(body, ele, url) {
    const reg = /(?<=\]\(#)\S+(?=\))/g;
    const urlList = body
      .match(reg)
      .filter(v => {
        return !v.includes("http");
      })
      .map(v => {
        const urlPath = url + v + ".md";
        return urlPath;
      });
    return urlList;
  }
};
// 九部知识库精选集-react
const fe9ReactCourse = {
  url: "https://www.yuque.com/fe9/select/",
  name: "九部知识库之ReactJs.pdf",
  wrapEle: ".typo-catalog-detail",
  css: baseOpt.cssIReader,
  usePup: true,
  getUrlList(body, ele, url) {
    let urlList = [];
    const reg = /(?<=decodeURIComponent\()\S+(?=\)\))/g;
    const dataStr = decodeURIComponent(body.match(reg)[0]);
    const data = dataStr.slice(1, dataStr.length - 1);
    const dataJson = JSON.parse(data);
    dataJson.book.toc.forEach((v, i) => {
      if (v.type === "DOC") {
        urlList.push(url + v.url);
      }
    });

    return urlList;
  }
};

// ReactJs小书
const reactJsBook = {
  url: "http://huziketang.mangojuice.top/books/react/lesson",
  name: "ReactJs小书.pdf",
  css: baseOpt.cssIReader,
  // usePup: true,
  getUrlList(url) {
    let urlList = [];
    for(let i = 1; i < 47;i++) {
      urlList.push(url+i)
    }
    return urlList;
  }
};

// typescript教程
const typeScriptCourse = {
  url: "https://ts.xcatliu.com/",
  pageApi: "https://ts.xcatliu.com/search_index.json",
  name: "TypeScript入门教程.pdf",
  wrapEle: ".typo-catalog-detail",
  css: baseOpt.cssIReader,
  usePup: true,
  getUrlList(body, url) {
    let urlList = [];
    const bodyJson = JSON.parse(body)
    Object.keys(bodyJson.store).forEach((v) => {
      urlList.push(url + v)
    })
    return urlList.filter((v) => {
      return v.includes('html')
    });
  }
};

// 七天学会NodeJs
const nodeJsCourse = {
  url: "http://nqdeng.github.io/7-days-nodejs/",
  pageApi: "http://nqdeng.github.io/7-days-nodejs/#1.6",  // 网站有反爬虫措施，如果请求报错，请换其他url
  name: "七天学会NodeJs.pdf",  
  wrapEle: "nav ul",  
  css: baseOpt.cssIReader,
  usePup: true,  
  getUrlList(body, ele, url) {
    let urlList = [];
    
    $(body)
      .find(ele)
      .find("li a")
      .each((i, v) => {
        const path = $(v).attr("href");
        urlList.push(url + path);
      });
    return urlList;
  }
}

// 前端面试复习知识点集合
const interviewReview = {
  url: "https://yuchengkai.cn",
  pageApi: "https://yuchengkai.cn/docs/zh/frontend/",
  name: "前端面试复习知识点集合.pdf",  
  wrapEle: ".sidebar-group-items li",  
  css: baseOpt.cssIReader,
  getUrlList(body, ele, url) {
    let urlList = [];
    
    $(body)
      .find(ele)
      .children('a')
      .each((i, v) => {
        const path = $(v).attr("href");
        if(!path.includes('#')) {
          urlList.push(url + path);
        }
      });
    return urlList;
  }
}

// 计算机通识
const computerGeneral = {
  url: "https://yuchengkai.cn",
  pageApi: "https://yuchengkai.cn/docs/zh/cs/",
  name: "计算机通识.pdf",  
  wrapEle: ".sidebar-group-items li",  
  css: baseOpt.cssIReader,
  getUrlList(body, ele, url) {
    let urlList = [];
    
    $(body)
      .find(ele)
      .children('a')
      .each((i, v) => {
        const path = $(v).attr("href");
        if(!path.includes('#')) {
          urlList.push(url + path);
        }
      });
    return urlList;
  }
} 

// 各种常见布局实现和案例分析
const  layoutExample = {
  url: "https://juejin.im/post/5aa252ac518825558001d5de",
  name: "各种常见布局实现和案例分析.pdf",  
  css: baseOpt.cssIReader,
}

// 廖雪峰JavaScript全栈教程
const  liaoXueFengJs = {
  url: "https://www.liaoxuefeng.com",
  pageApi: "https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000",
  name: "廖雪峰JavaScript全栈教程.pdf",  
  wrapEle: "#001434446689867b27157e896e74d51a89c25cc8b43bdb3000 a",  
  usePup: true,
  css: baseOpt.cssIReader,
  getUrlList(body, ele, url) {
    let urlList = [];
    $(body)
      .find(ele)
      .each((i, v) => {
        const path = $(v).attr("href");
        if(path && 
          path.includes('wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000') && 
          !urlList.includes(url + path)
          ) {
          urlList.push(url + path);
        }
      });
    return urlList;
  }
}

// 码洞 老钱 快学Go语言
const quickLearnGolang = {
  urlSize: 12,
  pageApi: "https://mp.weixin.qq.com/s/3Cy7dZordk6NbxYCBFSOeg",
  name: "快学Go语言.pdf",
  wrapEle: ".rich_media_content a",
  css: baseOpt.cssIReader,
  getUrlList(body, ele, urlSize){
    let urlList = [];
    $(body)
      .find(ele)
      .each((i,v) => {
        if(i < urlSize){
          const path = $(v).attr("href");
          if(path){
            urlList.push(path);
          }
        }
      });
    return urlList.reverse();
  }
}

module.exports = {
  javaScriptCourse,
  es6Course,
  baseOpt,
  fe9ReactCourse,
  reactJsBook,
  typeScriptCourse,
  nodeJsCourse,
  interviewReview,
  computerGeneral,
  layoutExample,
  liaoXueFengJs,
  quickLearnGolang
};
