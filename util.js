const request = require("request");
const pup = require("puppeteer");
const ora = require('ora');
const spinner = ora();

const parseBody = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, res, body) => {
      console.log(error)
      if (!error && res.statusCode === 200) {
        resolve(body);
      } else {
        reject("获取页面失败" + error);
      }
    });
  });
}

const parseBodyPup = async (url) => {
  const browser = await pup.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  return new Promise((resolve,reject) => {
			page.content().then(v => {
         resolve(v)
         browser.close();
			}).catch((error) => {
        reject('获取页面内容失败！' + error)
        browser.close();
			});
  })
}

const delay = async (time = 1000,count = 1) => {
  await new Promise(resolve => setTimeout(resolve,time*count))
}

const toDoubleDimensionalArray = (arr,count) => {
    const doubleDimensionalArray = []
    const num = Math.ceil(arr.length/count)
    for(let i = 0; i < num; i++) {
      doubleDimensionalArray.push(arr.slice(i*count,(i+1)*count))
    }
    return doubleDimensionalArray
}

const renderTempFile  = async (url, options) => {
	const browser = await pup.launch({
		headless: true,
		/*
			Allow running with no sandbox
			See: https://github.com/danburzo/percollate/issues/26
		 */
		args: options.sandbox
			? undefined
			: ['--no-sandbox', '--disable-setuid-sandbox'],
		defaultViewport: {
			// Emulate retina display (@2x)...
			deviceScaleFactor: 2,
			// ...but then we need to provide the other
			// viewport parameters as well
			width: 1920,
			height: 1080
		}
	});
	const page = await browser.newPage();

	/*
		Increase the navigation timeout to 2 minutes
		See: https://github.com/danburzo/percollate/issues/80
	 */
	page.setDefaultNavigationTimeout(120 * 1000);

	if (options.debug) {
		page.on('response', response => {
			spinner.succeed(`Fetched: ${response.url()}`);
		});
	}

	await page.goto(url, { waitUntil: 'load' });

	/*
		When no output path is present,
		produce the file name from the web page title
		(if a single page was sent as argument), 
		or a timestamped file (for the moment) 
		in case we're bundling many web pages.
	 */
	const output_path =
		options.output || `percollate-${Date.now()}.pdf`;

  //console.log(header.body.innerHTML);
  const commonTemplate = `<span></span>`;

	await page.pdf({
		path: output_path,
		preferCSSPageSize: true,
		displayHeaderFooter: true,
		headerTemplate: commonTemplate,
		footerTemplate: commonTemplate,
		printBackground: true
	});

	await browser.close();

	spinner.succeed(`Saved PDF: ${output_path}`);
}

module.exports = {
  parseBody,
  parseBodyPup,
  delay,
  toDoubleDimensionalArray,
  renderTempFile
};
