let canvas = document.querySelector(".canvas"); //画布
let $search_cont = document.querySelector(".search_content"); // 侧边栏搜索框
// 特效位置变量
let $div = document.createElement("div");
let $focus = document.createElement("span");
let $text = document.createElement("span");
let offset = elemOffset($search_cont); // 文本框在页面中的位置
let focusOffset = { left: 0, top: 0 };
let particles = []; //存放多个粒子组，每个粒子组有20个粒子
let particleId = null; // Animeframe的ID，当多次输入时停止当前ID。

let htmlHeight = document.documentElement.clientHeight;
let htmlWidth = document.documentElement.clientWidth;

$div.appendChild($text);
$div.appendChild($focus);
document.body.appendChild($div);

$focus.innerText = "|";
$text.style.cssText = "white-space: pre-wrap;";
$focus.style.cssText = "display:inline-block;width:0px;overflow:hidden;z-index:-100;";
$div.style.cssText =
  "visibility:hidden;display:inline-block;position:absolute;z-index:-100;overflow:hidden;";
$div.style.left = offset.left + "px"; //让 input 和 新创建的div重叠在一起
$div.style.top = offset.top + "px";

// 画布变量
canvas.height = htmlHeight;
canvas.width = htmlWidth;
let ctx = canvas.getContext("2d");

// 1. 根据搜索框的 输入 事件，执行 粒子动画效果
$search_cont.addEventListener("input", function () {
  offset = elemOffset($search_cont);
  $div.style.left = offset.left + "px"; //让 input 和 新创建的div重叠在一起
  $div.style.top = offset.top + "px";

  let focus_index = $search_cont.selectionStart;
  $text.innerText = $search_cont.value.substring(0, focus_index);
  focusOffset = elemOffset($focus);

  if (focusOffset.left > offset.left + offset.width) {
    focusOffset.left = offset.left + offset.width - 20;
  }

  // 有id就停止上一个粒子动画，不停止的话，前一个会影响下一个动画，会鬼畜加快
  if (particleId) {
    window.cancelAnimationFrame(particleId);
  }
  createParticles(~~focusOffset.left, ~~focusOffset.top);
  drawParticles();
});

// 创建粒子
function createParticles(posx, posy) {
  let ps = [];
  for (let i = 0; i < 5; ++i) {
    ps.push({
      x: random(posx + 20, posx + 30), //位置
      y: random(posy - 10, posy + 10),
      size: random(4, 8), //大小
      vx: random(-3, 3), //加速度
      vy: random(-3, 3),
      drag: 0.85, //拉扯力，凝聚力，平衡 vx,vy用
      theta: (random(0, 360) * Math.PI) / 180, //弧度
    });
  }

  particles.push(ps);
}

// 粒子效果定义
function effect(particle, index) {
  ctx.fillStyle = "#5f5";
  for (let i = 0; i < particle.length; ++i) {
    // 现在位置 = 原来位置 + 速度
    particle[i].x += particle[i].vx;
    particle[i].y += particle[i].vy;

    // 平衡加速度
    particle[i].vx *= particle[i].drag;
    particle[i].vy *= particle[i].drag;

    // 旋转弧度(加速度+旋转度)
    particle[i].theta += random(-0.5, 0.5);
    particle[i].vx += Math.sin(particle[i].theta) * 0.1;
    particle[i].vy += Math.cos(particle[i].theta) * 0.1;

    // let temp = random(-0.1, 0.1);
    // particle[i].vx += temp;
    // particle[i].vy += temp;
    // 大小
    particle[i].size *= 0.96;

    ctx.beginPath();
    ctx.arc(particle[i].x--, particle[i].y--, particle[i].size, 0, 2 * Math.PI);
    ctx.fill();

    if (particle[i].size < 0.1) {
      particle.splice(i, 1);
    }
  }

  // 粒子组里的粒子都为0时，删除该粒子组
  if (particle.length <= 1) {
    particles.splice(index, 1);
  }
}

// 循环真正描绘粒子特效
function drawParticles() {
  //开始前先清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //1. 根据 粒子组，将每组粒子画出来
  for (let i = 0; i < particles.length; i++) {
    effect(particles[i], i);
  }

  if (particles.length != 0) {
    particleId = window.requestAnimationFrame(() => {
      drawParticles();
    });
  }
}

function random(x, y) {
  return ~~(Math.random() * (y - x + 1)) + x;
}

// 找出位置用
function elemOffset(elem) {
  let box = elem.getBoundingClientRect(); //方法返回元素的大小及其相对于视口的位置。
  //box.left 即 box的最左边(不包括box的m,p,b)，right为最右边，包括了box的m,p,b

  //let doc = elem.ownerDocument; //即document，整个文档，ownerDocument 可返回某元素的根元素。HTML中, HTML 文档本身是元素的根元素。
  let body = document.body; //获取body
  let docElem = document.documentElement; //相当于 document,documentElement，获取 html

  let clientTop = docElem.clientTop || body.clientTop || 0, //clientTop 内边距到边框的大小
    clientLeft = docElem.clientLeft || body.clientLeft || 0;

  // + (window.pageYOffset || docElem.scrollTop)pageYOffset 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。滚动时会体现，类似scrollTop
  let top = box.top + (window.pageYOffset || docElem.scrollTop) - clientTop, // clientTop 即 border的大小
    left = box.left + (window.pageXOffset || docElem.scrollLeft) - clientLeft;

  return {
    left: left,
    top: top,
    right: left + box.width, //getBoundingClientRect().width 是包括了 border，padding
    bottom: top + box.height,
    width: box.width,
  };
}
