import page from "./Page.js";

//1. 右键隐藏图 =====================================================================
(function () {
  $bg_h.style.backgroundImage = `url('${BG_URA_URL}anime(${BG_NUM}).jpg')`;

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

//2. 前进后退 =====================================================================
(function () {
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
})();

//3. 回到顶部 =====================================================================
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

// 4. 搜索框 placeholder 动效 =====================================================================
(function () {
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

  setInterval(function () {
    if (len > arr[r].length) {
      if (len > arr[r].length + 10) {
        len = 0;
        r = ++r >= arr.length ? 0 : r;
      }
    } else {
      let str = arr[r].substr(0, len);
      $search_cont.setAttribute("placeholder", str);
    }
    len++;
  }, 100);
})();
