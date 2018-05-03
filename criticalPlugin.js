const critical = require("critical");

function criticalWebpackPlugin(options) {
  this.options = options;
}

criticalWebpackPlugin.prototype.emit = function(compilation, callback) {
  critical.generate(this.options, (err, output) => {
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
