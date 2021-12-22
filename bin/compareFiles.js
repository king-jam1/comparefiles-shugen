#!/usr/bin/env node
/**
 * command line usage
 * 最多6个文件同时比较
 * compareFiles path1 path2 -o ./origin.html
 * -o 指定输出路径，文件名 没有的话默认是 当前文件夹下 文件名：index.html
 *
 * **/
const parseOpts = require("minimist");
const path = require("path");
const fs = require("fs");
const args = parseOpts(process.argv.slice(2));
const templatehtmlPath = path.dirname(process.argv[1]) + "\\template.html";
console.log(templatehtmlPath);

const filePathList = args._;
const output = args.o;

const files = filePathList.map((filePath) => {
  const dirname = path.dirname(filePath);
  const basename = path.basename(filePath);
  const extname = path.extname(filePath).replace(".", "");

  let content = "";
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.log(err);
  }

  return {
    filename: basename,
    filepath: filePath,
    content,
    extname: extname,
  };
});

// 读取html模板
let htmlContent = "";
const options = {};
let appendCode = `
  <script>
    // 获取 容器
    var viewsBoxEl = window.document.getElementById('views-container');
    let highlight = false,
        connect = "align",
        collapse = false;
    CodeMirror.MergeView(
        viewsBoxEl,
        Object.assign(
            {},
            {
                value: \`${files[0].content}\`,
                origLeft: \`${files[1] ? files[1]?.content : ""}\`,
                origRight: \`${files[2] ? files[2]?.content : ""}\`,
                origMostRight:  \`${files[3] ? files[3]?.content : ""}\`,
                origRight04: \`${files[4] ? files[4]?.content : ""}\`,
                origRight05:  \`${files[5] ? files[5]?.content : ""}\`,
                readOnly: true,
                lineNumbers: true,
                firstLineNumber: 1,
                mode: "text/json",
                highlightDifferences: highlight,
                connect: connect,
                revertButtons: false,
                collapseIdentical: collapse,
                showCursorWhenSelecting: false,
            }
        )
    );
</script>
  `;
fs.readFile(templatehtmlPath, "utf-8", (err, data) => {
  if (err) {
    throw new Error("HTML模板不存在");
  }
  htmlContent += data;
  htmlContent += appendCode;
  const filename = output || "./index.html";
  // 生成一个html文件到指定目录
  fs.writeFile(`./${filename}`, htmlContent, { flag: "w+" }, (err) => {
    if (err) {
      console.log("HTML文件生成错误");
      return;
    }
    console.log(
      "\033[42;30m DONE \033[40;32m Compiled successfully in 19987ms\033[0m"
    );
    console.log("\033[45;31m HTML文件已生成\033[0m");
  });
});
