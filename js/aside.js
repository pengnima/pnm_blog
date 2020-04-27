let $input = document.querySelector(".search_content");
// 搜索框 placeholder 变动 =====================================================================
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

//1. 侧边栏fade =====================================================================
let $pnms = document.querySelectorAll(".pnm_frame");
let htmlHeight = document.documentElement.clientHeight;

window.onresize = function () {
  htmlHeight = document.documentElement.clientHeight;
};

window.addEventListener("scroll", function () {
  let _top = document.body.scrollTop || document.documentElement.scrollTop;

  $pnms.forEach(item => {
    if (_top + htmlHeight >= item.offsetTop + 100) {
      item.classList.add("fade_move");
    } else {
      item.classList.remove("fade_move");
    }
  });
});

//2. 收起侧边栏，删除侧边栏===================================================
let $vs_up = document.querySelectorAll(".fa-chevron-circle-up");
let $cancle = document.querySelectorAll(".fa-times-circle");

$vs_up.forEach(item => {
  item.onclick = function () {
    let itemNode = this.parentNode.parentNode.nextElementSibling;
    let itemStyle = itemNode.style;

    if (!itemNode.pnm_maxH) {
      itemNode.pnm_maxH = window.getComputedStyle(itemNode).maxHeight;
    }
    if (!itemNode.pnm_Top) {
      itemNode.pnm_Top = window.getComputedStyle(itemNode).paddingTop;
    }

    itemStyle.maxHeight = itemStyle.maxHeight === "0px" ? itemNode.pnm_maxH : "0px";
    itemStyle.paddingTop = itemStyle.paddingTop === "0px" ? itemNode.pnm_Top : "0px";
    itemStyle.paddingBottom = itemStyle.paddingBottom === "0px" ? "30px" : "0px";

    item.className = "fa fa-chevron-circle-down";
  };
});

$cancle.forEach(item => {
  item.onclick = function () {
    let itemParent = this.parentNode.parentNode.parentNode;
    itemParent.style.display = "none";
  };
});
