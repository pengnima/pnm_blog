let $navBtn = document.querySelector(".nav_button");
let $bar = document.querySelector(".nav_bar");

let $mask = document.querySelector(".mask_bg");
let $bg_h = document.querySelector(".bg_h");
let $menu = document.querySelector(".menu");
let $topBtn = document.querySelector(".top_btn");

//1. navbar的按钮点击===================================================
$navBtn.addEventListener("click", function () {
  if ($bar.className == "nav_bar") {
    $bar.className = "nav_bar nav_show";
  } else {
    $bar.className = "nav_bar";
  }
});

//2. 右键隐藏图============================================================
// 随机选择图片
(function () {
  let num = Math.floor(Math.random() * 30 + 1);
  let BG_URA_URL = "https://gitee.com/pengnima1/blogimage/raw/master/img/background_ura/";
  $bg_h.style.backgroundImage = `url('${BG_URA_URL}anime(${num}).jpg')`;

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
})();

//3. 前进后退 ===============================================================
import page from "./Page.js";
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

//4. 回到顶部
(function () {
  let timer = null;
  let _top = 0;
  window.addEventListener("scroll", function (e) {
    _top = document.body.scrollTop || document.documentElement.scrollTop;
    if (_top > 500) {
      $topBtn.classList.remove("is_none");
    } else {
      $topBtn.classList.add("is_none");
    }
  });
  $topBtn.onclick = function () {
    timer = window.requestAnimationFrame(function fn() {
      window.scrollBy(0, -100);
      if (_top > 0) {
        timer = window.requestAnimationFrame(fn);
      } else {
        window.cancelAnimationFrame(timer);
        timer = null;
        console.log("停止");
      }
    });
  };

  window.onmousewheel = function () {
    if (timer) {
      window.cancelAnimationFrame(timer);
      timer = null;
      console.log("停止");
    }
  };
})();
