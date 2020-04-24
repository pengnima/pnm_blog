let $input = document.querySelector(".search_content");
// 搜索框 placeholder 变动
let arr = [
  "人之初，性本善。性相近，习相远。",
  "苟不教，性乃迁。教之道，贵以专。",
  "昔孟母，择邻处。子不学，断机杼。",
  "窦燕山，有义方。教五子，名俱扬。",
  "养不教，父之过。教不严，师之惰。",
  "子不学，非所宜。幼不学，老何为。",
  "玉不琢，不成器。人不学，不知义。",
  "为人子，方少时。亲师友，习礼仪。",
  "香九龄，能温席。孝于亲，所当执。",
];
let r = 0;
let len = 0;
let timer = setInterval(function () {
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
