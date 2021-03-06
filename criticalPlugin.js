const critical = require("critical");
const fs = require("fs");

let cssFiles;
// let oldCssFiles = [];
let newCssFiles = [];
let defaultOptions = {};
/**
 * this function updates the old css files for the serviceworker with the new ones generated by critical
 */
// function removeOldCssFiles() {
//   setFiles();
//   for (const oldCssFile of oldCssFiles) {
//     // fs.unlinkSync(`dist/css/${oldCssFile}`);
//   }

//   console.log('new', cssFiles)
//   newCssFiles.forEach((file, index) => {
//     const wantedHash = file.split(".")[2];

//     fs.renameSync(`dist/css/${file}`, `dist/css/app.${wantedHash}.css`);
//   });
// }

function updateHtmlLinks(htmlFile) {
  console.log("update", htmlFile);

  const oldHtmlFile = fs.readFileSync(`dist/${htmlFile}`, "utf-8");

  let updatedHtmlFile = oldHtmlFile;
  newCssFiles.forEach(fileName => {
    const wantedHash = fileName.split(".")[2];
    const updatedCssFileName = `app.${wantedHash}.css`;
    updatedHtmlFile = updatedHtmlFile.replace(
      new RegExp(fileName, "g"),
      updatedCssFileName
    );
    fs.renameSync(`dist/css/${fileName}`, `dist/css/${updatedCssFileName}`);

    const preCacheFileName = fs
      .readdirSync("dist")
      .find(file => file.startsWith("precache"));
    const preCacheFile = fs.readFileSync(`dist/${preCacheFileName}`, "utf-8");
    const preCacheFileWithoutLastLine = preCacheFile
      .split("\n")
      .slice(0, preCacheFile.split("\n").length - 1)
      .join("\n");

    const appendedEntry = `{
    "revision": '${Math.random()}',
    "url": "/css/${updatedCssFileName}"
  }`;
    console.log(appendedEntry);
    console.log(preCacheFileWithoutLastLine);
    fs.writeFileSync(
      `dist/${preCacheFileName}`,
      `${preCacheFileWithoutLastLine},\n  ${appendedEntry} \n]`
    );
  });

  fs.writeFileSync(`dist/${htmlFile}`, updatedHtmlFile);
}

function criticalWebpackPlugin(_options) {
  defaultOptions = _options;
}

function setFiles() {
  cssFiles = fs.readdirSync("dist/css");
  // old css files are named app.[hash].css
  // oldCssFiles = cssFiles.filter(cssFile => cssFile.split(".").length === 3);
  // new css files are named app.[hash].[hash].css
  newCssFiles = cssFiles.filter(cssFile => cssFile.split(".").length === 4);
}

async function applyCritical(htmlFile) {
  const options = { ...defaultOptions, src: htmlFile, dest: htmlFile };
  await critical.generate(options, () => {
    setFiles();
    updateHtmlLinks(htmlFile);
  });
}

criticalWebpackPlugin.prototype.emit = async function(compilation, callback) {
  const sources = ["index.html", "about/index.html"];
  for (const source of sources) {
    await applyCritical(source);
  }
  callback(null);
};

criticalWebpackPlugin.prototype.apply = function(compiler) {
  var self = this;
  compiler.plugin("after-emit", function(compilation, callback) {
    self.emit(compilation, callback);
  });
};

module.exports = criticalWebpackPlugin;
