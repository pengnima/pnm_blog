//登录等后台功能
Bmob.initialize("7d0d37c291c33193", "123456");
Bmob.debug(true);
const userQuery = Bmob.Query("_User");

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
function loginClick() {
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
}

function loginSuccess(name) {
  $form.classList.add("is_none");
  $loginaside.classList.add("is_none");
  $userframe.classList.remove("is_none");
  $username.innerText = name;
}

function loginOut() {
  Bmob.User.logout();
  location.href = "./index.html";
}
