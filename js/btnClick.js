let $navBtn = document.querySelector(".nav_button");
let $bar = document.querySelector(".nav_bar");

import page from "./Page.js";
let $page = document.querySelector(".blog_page.wrap");

let $mask = document.querySelector(".mask_bg");
let $bg_h = document.querySelector(".bg_h");
let $menu = document.querySelector(".menu");

let $vs_up = document.querySelectorAll(".fa-chevron-circle-up");
let $cancle = document.querySelectorAll(".fa-times-circle");

//1. navbar的按钮点击===================================================
$navBtn.addEventListener("click", function () {
  if ($bar.className == "nav_bar") {
    $bar.className = "nav_bar nav_show";
  } else {
    $bar.className = "nav_bar";
  }
});

//2. 控制切换页面==========================================================

$page.addEventListener("click", function (e) {
  let ev = e || window.event;
  let dom = ev.target;

  if (dom.className.indexOf("fa-arrow-left") != -1) {
    page.pre();
    console.log(1);
  } else if (dom.className.indexOf("fa-arrow-right") != -1) {
    page.next();
  } else {
    if (Number(dom.innerText)) {
      page.selectPage(dom.innerText);
    }
  }
});

//3. 右键隐藏图============================================================
// 随机选择图片
let num = Math.floor(Math.random() * 4 + 1);
$bg_h.style.backgroundImage = `url('./img/h_img/bg_h${num}.jpg')`;

document.oncontextmenu = function (e) {
  // 一开始便将其定位在鼠标位置
  let ev = e || window.event;
  let posX = ev.clientX - 130 + "px";
  let posY = ev.clientY - 130 + "px";
  $bg_h.style.left = posX;
  $bg_h.style.top = posY;

  if ($mask.className.indexOf("is_none") != -1) {
    $mask.className = "mask_bg";

    $menu.className = "menu open";
    $menu.style.left = posX;
    $menu.style.top = posY;
  } else {
    $mask.className = "mask_bg is_none";
    $menu.className = "menu";
  }
  return false; //禁止默认事件
};

$mask.onmousemove = function (e) {
  let ev = e || window.event;
  $bg_h.style.top = ev.clientY - 130 + "px";
  $bg_h.style.left = ev.clientX - 130 + "px";
};

//4. 收起侧边栏，删除侧边栏===================================================
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

//5. 前进后退 ===============================================================

window.onpopstate = function () {
  page.pagePop = true;

  // 只要改变当前那个亮起来的分页图标即可
  // 该判断防止 跳转到不存在页面在返回时，pageNumber值回原来值的问题
  console.log("page.pageNumber为 ", page.pageNumber);

  if (page.pageNumber != -1) {
    page.pageDoms[page.pageNumber].className = "page_icon";
  } else {
    for (let i = 1; i <= page.pageCount; ++i) {
      page.pageDoms[i].className = "page_icon";
    }
  }
  page.selectPage(page.currentPage);
  page.pagePop = false;
};
