const criticalPlugin = require("./criticalPlugin");
const path = require("path");
const fs = require("fs");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
var HtmlStringReplace = require("html-string-replace-webpack-plugin");

module.exports = {
  lintOnSave: false,
  configureWebpack(config) {
    return {
      plugins: [
        new PrerenderSPAPlugin({
          // Required - The path to the webpack-outputted app to prerender.
          staticDir: path.join(__dirname, "dist"),
          // Required - Routes to render.
          routes: ["/", "/about"]
        }),
        new HtmlStringReplace({
          enable: true,
          patterns: [
            {
              // replace preload css links because they will be redundant because of the criticalPlugin
              match: /<link rel=preload as=style([^>]?)*>/g,
              replacement(match) {
                return "";
              }
            }
          ]
        }),
        new criticalPlugin({
          base: "dist/",
          src: "index.html",
          dest: "index.min.html",
          inline: true,
          minify: true,
          extract: true,
          width: 375,
          timeout: 30000,
          height: 565,
          penthouse: {
            blockJSRequests: false
          }
        })
      ]
    };
  }
};
