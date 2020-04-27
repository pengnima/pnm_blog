import page from "./Page.js";
let $search_ul = document.querySelector(".search_bar ul");

//$input在 aside.js 中声明了
$input.addEventListener("input", function () {
  let val = $input.value;
  $search_ul.innerHTML = "";
  if ($input.value != "") {
    $input.style.backgroundColor = "#fff";

    page.tags.forEach(tag => {
      let reg = new RegExp(`${val}`, "i");
      if (reg.test(tag)) {
        addSearchNode(tag, reg);
      }
    });
  } else {
    $input.style.backgroundColor = "transparent";
  }
});

//失去焦点就清空所有li
$input.addEventListener("blur", function () {
  $search_ul.innerHTML = "";
});

$search_ul.addEventListener("click", function (e) {
  let ev = e || window.event;
  $input.value = ev.target.innerText;
  $search_ul.innerHTML = "";
});

//添加li
function addSearchNode(tag, reg) {
  let li = document.createElement("li");
  let txt = document.createTextNode(tag);

  li.appendChild(txt);
  //改变 输入的reg的颜色
  li.innerHTML = li.innerHTML.replace(reg, function (x) {
    return "<span style='font-weight:bolder;color:#aaa'>" + x + "</span>";
  });
  $search_ul.appendChild(li);
}
