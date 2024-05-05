function contactGet(req, res) {
  let isLogin = req.session.isLogin;
  let user = req.session.user;
  if (user) {
    let username = user.name;
    console.log(username);
    res.render("contactMe", { isLogin, username });
  } else {
    res.render("contactMe", { isLogin });
  }
}

module.exports = contactGet;
