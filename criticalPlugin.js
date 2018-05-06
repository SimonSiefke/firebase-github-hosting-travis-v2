const critical = require("critical");
const fs = require("fs");

function replaceOldCssFiles() {
  const cssFiles = fs.readdirSync("dist/css");

  // old css files are named app.[hash].css
  const oldCssFiles = cssFiles.filter(
    cssFile => cssFile.split(".").length === 3
  );
  // new css files are named app.[hash].[hash].css
  const newCssFiles = cssFiles.filter(
    cssFile => cssFile.split(".").length === 4
  );

  // remove old
  for (const oldCssFile of oldCssFiles) {
    fs.unlinkSync(`dist/css/${oldCssFile}`);
  }

  // and replace with new
  newCssFiles.forEach((file, index) => {
    fs.renameSync(`dist/css/${file}`, `dist/css/${oldCssFiles[index]}`);
  });
}

function criticalWebpackPlugin(options) {
  this.options = options;
}

criticalWebpackPlugin.prototype.emit = function(compilation, callback) {
  critical.generate(this.options, (err, output) => {
    replaceOldCssFiles();
    callback(err);
  });
};

criticalWebpackPlugin.prototype.apply = function(compiler) {
  var self = this;
  compiler.plugin("after-emit", function(compilation, callback) {
    self.emit(compilation, callback);
  });
};

module.exports = criticalWebpackPlugin;
