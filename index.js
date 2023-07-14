const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path"); //para buscar a extensão do arquivo

app.set("view engine", "ejs");

//Função para renomear arquivos e trazer a extensão
const storage = multer.diskStorage({
  destination: function (req, arquivo, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, arquivo, cb) {
    //Pegando o nome do arquivo, data atual, extensão do arquivo
    cb(
      null,
      arquivo.originalname + Date.now() + path.extname(arquivo.originalname)
    );
  },
});

const upload = multer({ storage }); //conf multer

//Rota para receber o arquivo com nome do campo de envio
app.post("/upload", upload.single("arquivo"), (req, res) => {
  res.send("Arquivo recebido");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(8080, () => {
  console.log("Servidor Rodando");
});
