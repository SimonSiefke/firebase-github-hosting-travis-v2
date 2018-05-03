var critical = require("critical");
critical.generate({
  // Inline the generated critical-path CSS
  // - true generates HTML
  // - false generates CSS
  inline: true,

  // Your base directory
  base: "dist/",

  // HTML source
  html: "<html>...</html>",

  // HTML source file
  src: "index.html",

  // Your CSS Files (optional)
  css: ["dist/css/app.f7594dd1.css"],

  // Viewport width
  width: 1300,

  // Viewport height
  height: 900,

  // Target for final HTML output.
  // use some CSS file when the inline option is not set
  dest: "index-critical.html",

  // Minify critical-path CSS when inlining
  minify: true,

  // Extract inlined styles from referenced stylesheets
  extract: true,

  // Complete Timeout for Operation
  timeout: 30000,

  // Prefix for asset directory
  pathPrefix: "/MySubfolderDocrot",

  // ignore CSS rules
  ignore: ["font-face", /some-regexp/],

  // overwrite default options
  ignoreOptions: {}
});
