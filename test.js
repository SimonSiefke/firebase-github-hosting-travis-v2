// const fs = require("fs");

// let cssFiles;
// let oldCssFiles;
// let newCssFiles;
// function setFiles() {
//   cssFiles = fs.readdirSync("dist/css");
//   // old css files are named app.[hash].css
//   oldCssFiles = cssFiles.filter(cssFile => cssFile.split(".").length === 3);
//   // new css files are named app.[hash].[hash].css
//   newCssFiles = cssFiles.filter(cssFile => cssFile.split(".").length === 4);
// }
// function updateHtmlLinks(htmlFile) {
//   console.log("update", htmlFile);

//   const oldHtmlFile = fs.readFileSync(`dist/${htmlFile}`, "utf-8");

//   let updatedHtmlFile = oldHtmlFile;
//   newCssFiles.forEach((fileName, index) => {
//     const wantedHash = fileName.split(".")[2];
//     updatedHtmlFile = updatedHtmlFile.replace(
//       new RegExp(fileName, "g"),
//       oldCssFiles[index]
//     );
//   });

//   fs.writeFileSync(`dist/${htmlFile}`, updatedHtmlFile);
// }

// setFiles();
// updateHtmlLinks("index.html");
