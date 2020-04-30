import page from "./Page.js";
let canvas = document.querySelector(".canvas"); //画布

let $navBtn = document.querySelector(".nav_button"); //缩小宽度后的按钮
let $bar = document.querySelector(".nav_bar"); // 导航栏选项
let $pnms = document.querySelectorAll(".pnm_frame"); //侧边栏的每一个 关键框
let $vs_up = document.querySelectorAll(".fa-chevron-circle-up"); //侧边栏的每一个框head的按钮
let $cancle = document.querySelectorAll(".fa-times-circle");

let $page = document.querySelector(".blog_page.wrap"); // 分页外框

let htmlHeight = document.documentElement.clientHeight;
let htmlWidth = document.documentElement.clientWidth;
// 点击事件 ==============================================================================================
/**
 * 导航栏点击
 */
$navBtn.addEventListener("click", function () {
  if ($bar.className == "nav_bar") {
    $bar.className = "nav_bar nav_show";
  } else {
    $bar.className = "nav_bar";
  }
});

/**
 * 侧边栏，收起，删除按钮点击
 */
$vs_up.forEach(item => {
  item.addEventListener("click", function () {
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
  });
});

$cancle.forEach(item => {
  item.addEventListener("click", function () {
    if (Array.prototype.indexOf.call(this.parentNode.classList, "notice") != -1) {
      this.parentNode.style.display = "none";
    }

    let itemParent = this.parentNode.parentNode.parentNode;
    // classList 非 真数组，所以用 原型来call他
    if (Array.prototype.indexOf.call(itemParent.classList, "pnm_frame") != -1) {
      itemParent.style.display = "none";
    }
  });
});

/**
 * 控制切换页面
 */
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

// window事件 ==============================================================================================
/**
 * 调整大小
 */
window.onresize = function () {
  htmlHeight = document.documentElement.clientHeight;
  htmlWidth = document.documentElement.clientWidth;

  //修改画布
  canvas.height = htmlHeight;
  canvas.width = htmlWidth;
};

/**
 * 滑动滚轮，让侧边栏fade
 */
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
