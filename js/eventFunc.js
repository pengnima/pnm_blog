import page from "./Page.js";
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
    let itemParent = this.parentNode.parentNode.parentNode;
    itemParent.style.display = "none";
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
