/*
  利用类来做分页功能，封装成单独的模块
*/
class Page {
  constructor() {
    this.blogList = null;
    this.blen = 0;
    this.pageCount = 0;

    // 与Dom相关(切换页面)
    this.changeDom = null; //该方法在 createBlog.js 中实现，会根据 currentPage 改变页面内容
    this.blogDoms = null;
    this.pageDoms = null;
  }

  init() {
    return new Promise(async (resolve, reject) => {
      try {
        let list = await fetch("./json/blogList.json").then(res => res.json());
        this.blogList = list;
        this.blen = this.blogList.length;
        this.pageCount = Math.ceil(this.blen / 5);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
  /* 利用 history 做单页跳转 */
  //选择某页
  selectPage(page) {
    if (page <= this.pageCount) {
      this.currentPage = page;
      this.changeDom();
    }
  }

  //上一页
  pre() {
    if (this.currentPage > 1) {
      --this.currentPage;
      // history.pushState({}, null, `?page=${--this.currentPage}`);
      this.changeDom();
    }
  }

  //下一页
  next() {
    if (this.currentPage < this.pageCount) {
      ++this.currentPage;
      // history.pushState({}, null, `?page=${++this.currentPage}`);
      this.changeDom();
    }
  }

  //获取网页上的page
  get getUrlPage() {
    let search = location.search.substr(1);
    if (search != "") {
      let querys = search.split("=");
      // 0和NaN不会进来
      if (Number(querys[1])) {
        return Number(querys[1]);
      }
    } else {
      return 1; //给予其第一页
    }

    return -1;
  }

  //当前页，控制 页面图标的 背景色
  set currentPage(newPage) {
    if (newPage <= this.pageCount && newPage >= 1) {
      if (this.pageDoms[this.currentPage]) {
        this.pageDoms[this.currentPage].className = "page_icon";
      }
      this.pageDoms[newPage].className = "page_icon page_true";
      history.pushState({}, null, `?page=${newPage}`);
    }
  }
  get currentPage() {
    let page = this.getUrlPage; //先获取网页page
    if (page <= this.pageCount && page >= 1) {
      this.pageDoms[page].className = "page_icon page_true";
      return page;
    }
  }
}

let page = new Page();

export default page;
