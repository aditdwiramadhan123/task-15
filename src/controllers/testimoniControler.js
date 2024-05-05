function testimoni(req, res) {
  let isLogin = req.session.isLogin;
  let user = req.session.user;
  if (user) {
    let username = user.name;
    console.log(username);
    res.render("testimoni", { isLogin, username });
  } else {
    res.render("testimoni", { isLogin });
  }
}

module.exports = testimoni;
