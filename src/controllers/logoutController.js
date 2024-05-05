async function logout(req, res) {
  req.session.destroy(function (err) {
    if (err) return console.error("logout failed");
    console.log("logout succes");
    res.redirect("/login")
  });
}

module.exports = logout
