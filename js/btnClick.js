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
