import page from "./Page.js";
let shakeTime, last_time;
let $search = document.querySelector(".search");
let $search_ul = document.querySelector(".search_bar ul");
let $search_cont = document.querySelector(".search_content"); // 侧边栏搜索框

$search_cont.addEventListener("input", function () {
  //输入前都要给震动效果赋初始值
  shakeTime = 500;
  last_time = null;

  //震动效果（利用requestAnimationFrame，递减shakeTime，然后translate位移）
  shakeLoop();
});

//搜索框模糊查询，点击li =======================================================================================================
$search_ul.addEventListener("click", function (e) {
  let ev = e || window.event;
  // 避免点击到 span标签
  if (ev.target.nodeName === "SPAN") {
    $search_cont.value = ev.target.parentNode.innerText;
  } else {
    $search_cont.value = ev.target.innerText;
  }
  $search_ul.innerHTML = "";
});

// 搜索查询 =====================================================================================================================
$search_cont.addEventListener("input", function () {
  //模糊查询
  let val = $search_cont.value;
  $search_ul.innerHTML = "";
  if ($search_cont.value != "") {
    $search_cont.style.backgroundColor = "#fff";

    page.tags.forEach(tag => {
      let reg = new RegExp(`${val}`, "i");
      if (reg.test(tag)) {
        addSearchNode(tag, reg);
      }
    });
  } else {
    $search_cont.style.backgroundColor = "transparent";
  }
});

//失去焦点就清空所有li =================================================================================================
$search_cont.addEventListener("blur", function (e) {
  let ev = e || window.event;
  // relatedTarget属性的返回值是Element类型，返回当前事件涉及到的其他DOM元素(如果存在的话)。
  // 对于"blur"事件而言，relatedTarget属性返回获得焦点的DOM元素(如果有的话，应该会跟冒泡这样向上发现是否有相关的DOM)
  // 给 search_bar 添加了属性 tabindex="1"，让其跟 input 一样，所以 blur 事件对其有用，会让 relatedTarget 有值
  if (!ev.relatedTarget) {
    $search_ul.innerHTML = "";
  }
});

// 函数 ====================================================================================================
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

// 震动
function shakeLoop() {
  if (shakeTime > 0) {
    let now_time = new Date();

    if (!last_time) {
      last_time = now_time;
    }

    shakeTime -= now_time - last_time;
    last_time = now_time;

    let shakeX = ~((Math.random() * shakeTime) / 150);
    let shakeY = ~((Math.random() * shakeTime) / 150);

    $search.style.transform = `translate(${shakeX}px,${shakeY}px) `;

    window.requestAnimationFrame(shakeLoop);
  } else {
    $search.style.transform = `translate(0) `;
  }
}
