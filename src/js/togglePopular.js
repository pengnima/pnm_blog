import page from "./Page.js";
let $tagsFrameHead = document.querySelector(".tags_frame .frame_head");
let $tagsFrameBody = document.querySelector(".tags_frame .frame_body");
let $popularTags = document.querySelector(".popular_tags");

let tempId = null;
let createPopular = () => {
  if (page.tags.length != 0) {
    for (let i = 0; i < page.tags.length; ++i) {
      let aNode = document.createElement("a");
      aNode.href = "javascript:;";
      aNode.style.fontSize = 16 * (Math.random() + 0.6).toFixed(2) + "px";
      let tNode = document.createTextNode(page.tags[i]);
      aNode.appendChild(tNode);
      $popularTags.appendChild(aNode);
    }
    window.cancelAnimationFrame(tempId);
  } else {
    tempId = window.requestAnimationFrame(createPopular);
  }
};
//创建流行标签
createPopular();

//按钮响应(通过判断按下的是父元素中的第几个子元素，来切换index)
let preIndex = 0;
let nowIndex = 0;
toggleIndex(preIndex, nowIndex);
$tagsFrameHead.addEventListener("click", function (e) {
  let ev = e || window.event;
  let preNode = e.target.previousElementSibling;

  preIndex = nowIndex;
  nowIndex = 0;

  while (preNode != null) {
    ++nowIndex;
    preNode = preNode.previousElementSibling;
  }
  toggleIndex(preIndex, nowIndex);
});

function toggleIndex(pre, now) {
  $tagsFrameHead.children[pre].classList.remove("is_select");
  $tagsFrameHead.children[now].classList.add("is_select");

  $tagsFrameBody.children[pre].classList.remove("is_show");
  $tagsFrameBody.children[now].classList.add("is_show");
}
