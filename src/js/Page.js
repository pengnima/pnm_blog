/*
  利用类来做分页功能，封装成单独的模块

  分页图标颜色控制：
      1. true的颜色：
          调用changeDom(m)时 根据 m 改变【因为如果在其他地方弄，如赋值curr时，则在初始页面无法就没颜色】
                            【而在 获取curr时调用又不太好】
      2. false的颜色：
          回退、前进时 ： pageNumber
          给currentPage 赋值时。
*/
class Page {
  constructor() {
    this.blogList = null;
    this.blen = 0;
    this.pageCount = 0;

    // 与Dom相关(切换页面)
    this.changeDom = null; //该方法在 createBlog.js 中实现，会根据传入的 参数 改变页面内容
    this.blogDoms = null;
    this.pageDoms = null;
    this.tags = [];

    // pagePop 用来判断是否要将页面 pushState()，如果是回退就不push
    this.pagePop = false;
    // 用来改变回退时的分页图标颜色，当为-1时，清空一次所有图标
    this.pageNumber = -1;
  }

  init() {
    return new Promise(async (resolve, reject) => {
      try {
        let list = await fetch("./json/blogList.json").then(res => res.json());
        this.blogList = list;
        this.blen = this.blogList.length;
        this.pageCount = Math.ceil(this.blen / 5);

        this.tags = this.getTags();

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  getTags() {
    let arr = [];
    this.blogList.forEach(item => {
      item.tags.forEach(tag => {
        arr.push(tag);
      });
    });
    arr = [...new Set(arr)];
    return arr;
  }
  /* 利用 history 做单页跳转 */
  //选择某页
  selectPage(page) {
    if (page <= this.pageCount) {
      this.currentPage = page;
      this.changeDom(page);
    }
  }

  //上一页
  pre() {
    if (this.currentPage > 1) {
      --this.currentPage;
      this.changeDom(this.currentPage);
    }
  }

  //下一页
  next() {
    if (this.currentPage < this.pageCount) {
      ++this.currentPage;
      this.changeDom(this.currentPage);
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
      this.pageNumber = newPage; //回退时用这个属性来 还原图标颜色

      //还原图标颜色
      if (this.pageDoms[this.getUrlPage]) {
        this.pageDoms[this.getUrlPage].className = "page_icon";
      }

      //添加历史记录
      if (!this.pagePop) {
        history.pushState({}, null, `?page=${newPage}`);
      }
    }
  }
  get currentPage() {
    let page = this.getUrlPage; //先获取网页page
    if (page <= this.pageCount && page >= 1) {
      return page;
    }
  }
}

let page = new Page();

export default page;
