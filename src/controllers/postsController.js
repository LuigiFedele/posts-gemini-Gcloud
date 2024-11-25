import fs from "fs";
import {getTodosPosts ,criarPost, atualizarPost} from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req,  res) {
  const posts = await getTodosPosts();
  res.status(200).json(posts);
};


export async function postarNovoPost(req, res) {
  const conteudoBody = req.body;
  try {
    const postCriado = await criarPost(conteudoBody);
    res.status(200).json(postCriado);
  } catch (err){
    console.error(err.message);
    res.status(500).json({"Erro":"Falha na requisição"});
  }
}

export async function uploadImage(req, res) {
  const conteudoBody = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };
  try {
    const postCriado = await criarPost(conteudoBody);
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imagemAtualizada);
    res.status(200).json(postCriado);
  } catch (err){
    console.error(err.message);
    res.status(500).json({"Erro":"Falha na requisição"});
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImage = `http//localhost:3000/${id}.png`;
  
  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer)
    const post = {
      imgUrl: urlImage,
      descricao: descricao,
      alt: req.body.alt
    }
    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  } catch (err){
    console.error(err.message);
    res.status(500).json({"Erro":"Falha na requisição"});
  }
}
