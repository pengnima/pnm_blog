let $navBtn = document.querySelector(".nav_button");
let $bar = document.querySelector(".nav_bar");

// navbar的按钮点击
$navBtn.addEventListener("click", function () {
  if ($bar.className == "nav_bar") {
    $bar.className = "nav_bar nav_show";
  } else {
    $bar.className = "nav_bar";
  }
});

//控制切换页面
import page from "./Page.js";
let $page = document.querySelector(".blog_page.wrap");
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
