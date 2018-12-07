const utils = require("./util"),
  percollate = require("percollate"),
  markdownpdf = require("markdown-pdf"),
  merge = require("easy-pdf-merge"),
  schedule = require('node-schedule'),
  fs = require("fs"),
  {
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
  } = require("./config");

const getHtml = (url,usePup) => {
  if(usePup) {
    return utils.parseBodyPup(url)
  }
  return utils.parseBody(url);
};
const getJSCourse = () => {
  const { url, name, wrapEle, getUrlList, css } = javaScriptCourse;

  getHtml(url).then(res => {
    const urlList = getUrlList(res, wrapEle, url);
    percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css
    });
  });
};

const getEs6Course = () => {
  const { url, name, wrapEle, getUrlList, pageApi } = es6Course;

  getHtml(pageApi).then(res => {
    const urlList = getUrlList(res, wrapEle, url);

    // 生成的pdf文件中包含markdown代码
    // percollate.configure();
    // percollate.pdf(urlList, {
    //   output: name,
    //   css: baseOpt.css,
    //   sandbox: true
    // });

    const reqList = [];
    urlList.forEach(v => {
      console.log("请求地址---", v);
      reqList.push(getHtml(v));
    });
    console.log("开始发出请求...");

    Promise.all(reqList)
      .then(arrRes => {
        console.log("所有请求都成功了---");
        const md = arrRes.join(" ");
        // console.log(md);
        const optPath =
          "/Users/apple/Documents/my/LearningLog/NodeJs/网页生成pdf/";

        fs.writeFileSync(`${name}.md`, md, function(err) {
          if (err) {
            return console.error(err);
          }
          console.log("数据写入成功！");
        });
        console.log("开始生成pdf文件...");
        markdownpdf({
          paperFormat: "A6"
          // paperOrientation: "landscape"
        })
          .from(`${optPath}${name}.md`)
          .to(`${optPath}${name}.pdf`, function() {
            console.log("生成pdf文件成功");
          });
      })
      .catch(err => {
        console.log("请求报错---", err);
      });
  });
};

const getFe9ReactCourse = () => {
  const { url, name, wrapEle, getUrlList, css, usePup } = fe9ReactCourse;
  getHtml(url).then(res => {
    const urlList = getUrlList(res, wrapEle, url);
    // console.log("urlList", urlList);
    percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css,
      usePup
    });
  });
};

const getReactJsBook = () => {
  const { url, name, getUrlList, css,   } = reactJsBook;
  const urlList = getUrlList(url);
    percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css,
      toc: true
    });
}

const getTypeScriptCourse = () => {
  const { url, name, getUrlList, css,pageApi,usePup   } = typeScriptCourse;
  getHtml(pageApi).then(res => {
    const urlList = getUrlList(res, url);
    percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css,
      usePup
    });
  });
}

const getNodeJsCourse = () => {
  const { url, name, wrapEle, getUrlList, css,usePup,pageApi } = nodeJsCourse;

  getHtml(pageApi).then(res => {
    const urlList = getUrlList(res, wrapEle, url);
    percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css,
      usePup
    });
  });
}

const getJsReview = () => {
  const { url, name, wrapEle, getUrlList, css,usePup,pageApi } = interviewReview;

  getHtml(pageApi).then(res => {
    const urlList = getUrlList(res, wrapEle, url);
    percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css,
    });
  });
}

const getComputerGeneral = () => {
  const { url, name, wrapEle, getUrlList, css,usePup,pageApi } = computerGeneral;

  getHtml(pageApi).then(res => {
    const urlList = getUrlList(res, wrapEle, url);
    
    percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css,
    });
  });
}

const getLayoutExample = () => {
  const { url, name, css } = layoutExample;
  percollate.configure();
  percollate.pdf([url], {
    output: name,
    css,
  });
}

const getLiaoXueFengJs =  () => {
  const { url, name, wrapEle, getUrlList, css,usePup,pageApi } = liaoXueFengJs;

  getHtml(pageApi,true).then(res => {
    const urlList = getUrlList(res, wrapEle, url)
    console.log('urlList---',urlList.length)
    const arr = utils.toDoubleDimensionalArray(urlList,5)
    console.log('arr2---',arr.length)
    let i = 0
    let rule = new schedule.RecurrenceRule()
    rule.minute = [15,30,45,60]
    const task = schedule.scheduleJob(rule, function(){
      percollate.configure();
      percollate.pdf(arr[i], {
        output: 0 + name,
        css,
        usePup
      });
      if(i === arr.length) {
        task.cancel()
      }
      i++
    });

  });
}

const getQuickLearnGolang = () => {
  const{urlSize, pageApi, name, wrapEle, css, getUrlList} = quickLearnGolang;

  getHtml(pageApi).then(res => {
    const urlList = getUrlList(res, wrapEle, urlSize);
    percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css,
      decompress: false,
      toc:true
    });
  })
}

const getExample = () => {
  const urlList = ['http://example.com'];
  percollate.configure();
  percollate.pdf(urlList, {
    output: 'example.pdf'
  });
}

const getPdf = {
  0:getJSCourse,          // 阮一峰JS教程
  1:getEs6Course,         // 阮一峰ES6教程
  2:getFe9ReactCourse,    // 九部知识库精选集-react
  3:getReactJsBook,       // ReactJs小书
  4:getTypeScriptCourse,  // TypeScript入门教程
  5:getNodeJsCourse,      // 七天学会NodeJs
  6:getJsReview,          // 前端JS面试知识点总结
  7:getComputerGeneral,   // 计算机通识
  8:getLayoutExample,     // 各种常见布局实现和案例分析
  9:getLiaoXueFengJs,     // 廖雪峰JavaScript全栈教程
  10:getQuickLearnGolang, // 快学Go语言
  11:getExample, // example
}

utils.renderTempFile(`file://C:/Users/songy/AppData/Local/Temp/tmp-1121237X1IrKnkH4R.html`,{
  output: '1.pdf'
});

// 获取pdf
// getPdf[11]()