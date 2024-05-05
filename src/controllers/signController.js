const generalService = require("../service/generalService");
const handleData = require("../service/handleData");
const bcrypt = require("bcrypt");


async function signGet(req, res) {
  let isLogin = req.session.isLogin
  res.render("signPage",{isLogin});
}

async function signPost(req, res) {
  let dataForm = req.body;
  let data = handleData.getDataUser_formForm(dataForm);
  if (data.status == "register") {
    let { registerName, registerEmail, registerPassword } = data.data;
    const salt = 10;
    const hashedPassword = await bcrypt.hash(registerPassword, salt);
    let payload = {
      registerName,
      registerEmail,
      hashedPassword,
    };
    console.log("data", data);
    console.log("payload", payload);

    const newUser = await generalService.postNewUser(payload);
    if (newUser) {
      res.redirect("/project");
    }
  } else if (data.status == "login") {
    let { loginEmail, loginPassword } = data.data;
    let dataDb = await generalService.getOneUser(loginEmail);
    if (dataDb) {
      const isPasswordValid = await bcrypt.compare(
        loginPassword,
        dataDb.password
      );
      if (isPasswordValid) {
        console.log("login sukses");
        req.session.isLogin = true
        req.session.user = {
          name : dataDb.name,
          email : dataDb.email
        }
        res.redirect("/")
    

      } else {
        console.log("password tidak valid");
      }
    } else {
      console.log("email tidak ada");
    }
  }
}

module.exports = {
  get: signGet,
  post: signPost,
};
