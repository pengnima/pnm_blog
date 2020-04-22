import { $input } from "./getDom.js";

// 搜索框 placeholder 变动
let arr = ["右键无法复制？CV大法呀~", "想搜🐍🐍的？", "那还是百度吧！"];
let r = 0;
let len = 0;
let timer = setInterval(() => {
  if (len > arr[r].length) {
    if (len > arr[r].length + 10) {
      len = 0;
      r = ++r >= arr.length ? 0 : r;
    }
  } else {
    let str = arr[r].substr(0, len);
    $input.setAttribute("placeholder", str);
  }
  len++;
}, 100);
