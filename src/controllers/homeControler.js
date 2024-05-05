function homeGet(req, res) {
  let isLogin = req.session.isLogin;
  let user = req.session.user;
  if (user) {
    let username = user.name
    console.log(username)
    res.render("index", { isLogin,username});

  }
  else {
    res.render("index", { isLogin });
  }

}

module.exports = homeGet;
