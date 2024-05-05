const generalService = require("../service/generalService");
const handleData = require("../service/handleData");

let data = [];

// Menampilkan halaman proyek
async function getProjects(req, res) {
  let dataDb = await generalService.getAllProject();
  let data = handleData.sendViewDataProject_toForm(dataDb);
  console.log("data1",data)

  // mengambil 50 karakter pertama dari description
  data.forEach((data) => {
    if (data.description.length > 50) {
      data.description = data.description.substring(0, 50) + "...";
    }
  });
  console.log("data2",data)
  let isLogin = req.session.isLogin;
  let user = req.session.user;
  if (user) {
    let username = user.name;
    res.render("myProject", { data, isLogin, username });
  } else {
    res.render("myProject", { data, isLogin });
  }
}

// Menampilkan halaman penambahan proyek
function addProjectGet(req, res) {
  let isLogin = req.session.isLogin;
  let user = req.session.user;
  if (user) {
    let username = user.name;
    res.render("addProject", { data, isLogin, username });
  } else {
    res.render("addProject", { data, isLogin });
  }
}

// Menambahkan proyek
async function addProjectPost(req, res) {
  let dataForm = req.body;
  let data = handleData.getDataProject_fromForm(dataForm);
  const post = await generalService.postProject(data);
  if (post) {
    res.redirect("/project");
    console.log("input benar");
  } else {
    console.log("salah input");
  }
}

// Menampilkan halaman edit proyek
async function editProjectGet(req, res) {
  let id = parseInt(req.params.id);
  let dataDB = await generalService.getOneProject(id);
  let data = handleData.sendViewDataProject_toForm(dataDB)[0];
  let isLogin = req.session.isLogin;
  let user = req.session.user;
  if (user) {
    let username = user.name;
    res.render("editProject", { data, isLogin, username });
  } else {
    res.render("editProject", { data, isLogin });
  }
}

// Mengedit proyek
async function editProjectPost(req, res) {
  let dataForm = req.body;
  let id = parseInt(req.params.id);
  let data = handleData.getDataProject_fromForm(dataForm);
  const edit = await generalService.updateProject(id, data);
  if (edit) {
    res.redirect("/project");
    console.log("input benar");
  } else {
    console.log("salah input");
  }
}

// Menghapus proyek
async function deleteProjectPost(req, res) {
  let id = parseInt(req.params.id);
  await generalService.deleteProject(id);
  res.redirect("/project");
}

// Menampilkan halaman detail proyek
async function viewProjectGet(req, res) {
  let id = parseInt(req.params.id);
  let dataDB = await generalService.getOneProject(id);
  let data = handleData.sendViewDataProject_toForm(dataDB)[0];
  let isLogin = req.session.isLogin;
  let user = req.session.user;
  if (user) {
    let username = user.name;
    res.render("detilProject", { data, isLogin, username });
  } else {
    res.render("detilProject", { data, isLogin });
  }
}

// Objek untuk mengekspor fungsi-fungsi
const projectController = {
  get: getProjects,
  add: {
    get: addProjectGet,
    post: addProjectPost,
  },
  edit: {
    get: editProjectGet,
    post: editProjectPost,
  },
  del: {
    post: deleteProjectPost,
  },
  view: {
    viewProjectGet: viewProjectGet,
  },
};

module.exports = projectController;
