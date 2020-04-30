// Dom相关=========================================================================================================================
let canvas = document.querySelector(".canvas"); //画布
/**
 * 1. 导航栏
 */
let $navBtn = document.querySelector(".nav_button"); //缩小宽度后的按钮
let $bar = document.querySelector(".nav_bar"); // 导航栏选项

/**
 * 2. 隐藏背景与右键菜单
 */
let $mask = document.querySelector(".mask_bg"); // 定位mask
let $bg_h = document.querySelector(".bg_h"); // 隐藏背景图
let $menu = document.querySelector(".menu"); //右键菜单

/**
 * 3. 回顶按钮
 */
let $topBtn = document.querySelector(".top_btn");

/**
 * 4. 侧边栏框框，按钮
 */
let $pnms = document.querySelectorAll(".pnm_frame"); //侧边栏的每一个 关键框
let $vs_up = document.querySelectorAll(".fa-chevron-circle-up"); //侧边栏的每一个框head的按钮
let $cancle = document.querySelectorAll(".fa-times-circle");

/* ———— 搜索框 */
let $search = document.querySelector(".search");
let $search_ul = document.querySelector(".search_bar ul");
let $search_cont = document.querySelector(".search_content"); // 侧边栏搜索框

/*  ———— 登录框 */
let $form = document.querySelector(".form"); //登录前的 输入框
let $user = document.querySelector("#user");
let $pwd = document.querySelector("#pwd");
let $remeber = document.querySelector("#remeber");

let $loginaside = document.querySelector(".login_frame .aside_icon"); //因为登录成功后要让该icon消失。。所以获取了登录框的icon
let $userframe = document.querySelector(".user_frame"); //登录成功后的用户框
let $username = document.querySelector(".user_frame .username");

/* ———— 最新框、随机框的每个项目 */
let $newBlogs = document.querySelectorAll(".newblog");
let $randomBlogs = document.querySelectorAll(".randomblog");

/* ———— 标签框 */
let tagsFrameHead = document.querySelector(".tags_frame .frame_head");
let tagsFrameBody = document.querySelector(".tags_frame .frame_body");
let popularTags = document.querySelector(".popular_tags");

/**
 * 5. 主栏框框
 */
let $main_content = document.querySelector(".main_content"); //主栏框
let $blog = document.querySelector(".blog.wrap"); // 第一个 blog 框(用来复制成其他框)
let $page = document.querySelector(".blog_page.wrap"); // 分页外框
let $nextPage = document.querySelector(".fa-arrow-right"); // 分页 下一个 按钮框

// 通用相关=========================================================================================================================
let htmlHeight = document.documentElement.clientHeight;
let htmlWidth = document.documentElement.clientWidth;

let BG_NUM = Math.floor(Math.random() * 30 + 1);
let BG_URA_URL = "https://gitee.com/pengnima1/blogimage/raw/master/img/background_ura/";
