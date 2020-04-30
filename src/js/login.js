//登录等后台功能
Bmob.initialize("7d0d37c291c33193", "123456");
// Bmob.debug(true);
const userQuery = Bmob.Query("_User");

/*  ———— 登录框 */
let $form = document.querySelector(".form"); //登录前的 输入框
let $user = document.querySelector("#user");
let $pwd = document.querySelector("#pwd");
let $remeber = document.querySelector("#remeber");
let $loginaside = document.querySelector(".login_frame .aside_icon"); //因为登录成功后要让该icon消失。。所以获取了登录框的icon
let $userframe = document.querySelector(".user_frame"); //登录成功后的用户框
let $username = document.querySelector(".user_frame .username");
let $loginBtn = document.querySelector(".l_a_s button");
let $outBtn = document.querySelector(".user_frame button");

// 1. 先查询该账号是否过期(匹配)
if (localStorage.getItem("bmob")) {
  (async function () {
    let data = await Bmob.User.current();

    userQuery.get(data.objectId).then(res => {
      // 比较用户名，看看是否匹配
      if (
        res.username === data.username &&
        Date.parse(new Date(res.updatedAt)) + 7200000 > Date.parse(new Date())
      ) {
        //匹配且没过期
        console.log("匹配且没过期");
        // 登录成功
        loginSuccess(res.username);
      } else {
        localStorage.removeItem("bmob");
      }
    });
  })();
}

//2. 没匹配或过期，则可以通过点击按钮来登录
$loginBtn.addEventListener("click", function () {
  Bmob.User.login($user.value, $pwd.value)
    .then(res => {
      userQuery.get(res.objectId).then(res => {
        res.save();
        loginSuccess(res.username);
      });
    })
    .catch(err => {
      alert(err.error);
    });
});
$outBtn.addEventListener("click", function () {
  Bmob.User.logout();
  location.href = "./index.html";
});

function loginSuccess(name) {
  $form.classList.add("is_none");
  $loginaside.classList.add("is_none");
  $userframe.classList.remove("is_none");
  $username.innerText = name;
}
