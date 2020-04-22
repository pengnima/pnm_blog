let $blog = document.querySelector(".blog.wrap");
let $main_content = document.querySelector(".main_content");

(async function () {
  let data = await fetch("./json/blogList.json").then(res => res.json());
  // console.log(data);
  // console.log($blog.children);
  let $date = $blog.children[0];
  let $head = $blog.children[1];
  let $body = $blog.children[2];

  for (let i = 1; i < 5; i++) {
    let tempNode = $blog.cloneNode(true);
    UpDate(tempNode.children[0], parseInt(data[i].date));
    UpHead(tempNode.children[1], data[i].link, data[i].title, data[i].tags);
    UpBody(tempNode.children[2], data[i].link, data[i].img, data[i].detail);

    $main_content.appendChild(tempNode);
  }

  UpDate($date, parseInt(data[0].date));
  UpHead($head, data[0].link, data[0].title, data[0].tags);
  UpBody($body, data[0].link, data[0].img, data[0].detail);
})();

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
    newEl.children[0].setAttribute("src", img);
  }

  newEl.children[1].innerText = detail + "……";
}
