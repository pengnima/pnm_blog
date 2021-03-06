import page from "./Page.js";
import { DateFormat } from "./utils.js";
let $newBlogs = document.querySelectorAll(".newblog");
let $randomBlogs = document.querySelectorAll(".randomblog");

let $main_content = document.querySelector(".main_content"); //主栏框
let $blog = document.querySelector(".blog.wrap"); // 第一个 blog 框(用来复制成其他框)
let $page = document.querySelector(".blog_page.wrap"); // 分页外框
let $nextPage = document.querySelector(".fa-arrow-right"); // 分页 下一个 按钮框

const BLOG_IMAGE_URL = "https://gitee.com/pengnima1/blogimage/raw/master/img/blog_image/";
(function () {
  try {
    // 初始化page类的实例，让其有List
    page.init().then(() => {
      //1. 创建 blog 节点
      for (let i = 1; i < 5; i++) {
        let tempNode = $blog.cloneNode(true);
        $main_content.insertBefore(tempNode, $page);
      }

      // 2. 给DOM相关的 赋值
      page.blogDoms = document.querySelectorAll(".blog.wrap");
      page.pageDoms = $page.children; //因为是引用的，所以后面添加了分页节点，也可以
      page.changeDom = function (m) {
        //添加 blog 数据(添加 5个)
        if (m !== undefined) {
          page.pageDoms[m].className = "page_icon page_true";
        }
        for (let i = 0; i < page.blogDoms.length; ++i) {
          page.blogDoms[i].className = "blog wrap";
          let j = (m - 1) * 5 + i;
          if (j < page.blen) {
            let temp = page.blogList[j];

            UpDate(page.blogDoms[i].children[0], parseInt(temp.date));
            UpHead(page.blogDoms[i].children[1], temp.link, temp.title, temp.tags);
            UpBody(page.blogDoms[i].children[2], temp.link, temp.img, temp.detail);
          } else {
            // 让 不存在的 blog 消失
            page.blogDoms[i].className = "blog wrap is_none";
          }
        }
      };

      //3. 创建 分页 节点
      for (let i = 0; i < page.pageCount; ++i) {
        let text = document.createTextNode(i + 1);
        let dom = document.createElement("div");
        dom.setAttribute("class", "page_icon");
        dom.appendChild(text);
        $page.insertBefore(dom, $nextPage);
      }

      //4. 执行添加blog数据的函数
      page.changeDom(page.currentPage);

      //5. 执行添加侧边栏数据的函数
      for (let i = 0; i < 5; ++i) {
        $newBlogs[i].children[0].children[0].href = page.blogList[i].link;
        $newBlogs[i].children[0].children[0].innerText = page.blogList[i].title;

        let dates = new Date(parseInt(page.blogList[i].date));
        $newBlogs[i].children[1].innerText = DateFormat(dates, "yyyy-MM-dd");
      }

      let set = new Set();
      for (let i = 0; i < 5; ++i) {
        // 利用 set 不会重复，且有has可以判断是否重复的特性，来整随机数
        let j = Math.floor(Math.random() * page.blen);
        while (set.has(j)) {
          j = Math.floor(Math.random() * page.blen);
        }
        set.add(j);

        $randomBlogs[i].children[0].children[0].href = page.blogList[j].link;
        $randomBlogs[i].children[0].children[0].innerText = page.blogList[j].title;

        let dates = new Date(parseInt(page.blogList[j].date));
        $randomBlogs[i].children[1].innerText = DateFormat(dates, "yyyy-MM-dd");
      }

      //6.
    });
  } catch (err) {
    console.log(err);
  }
})();

// ==============================================================================
function UpDate(el, num) {
  let m = new Date(num).getMonth() + 1;
  let d = new Date(num).getDate();
  el.children[0].innerText = m + "月";
  el.children[1].innerText = d < 10 ? "0" + d : d + "";
}

function UpHead(el, link, title, tags) {
  el.children[0].setAttribute("href", link);
  el.children[0].children[0].innerText = title;

  el.children[1].children[0].innerText = tags.join("，");
}
function UpBody(el, link, img, detail) {
  let newEl = el.children[0].children[0];
  newEl.setAttribute("href", link);
  if (img != "") {
    newEl.children[0].setAttribute("src", BLOG_IMAGE_URL + img);
  }

  newEl.children[1].innerText = detail + "……";
}
