import { ObjectId } from "mongodb";
import 'dotenv/config';
import conexaoBanco from "../config/dbConfig.js"

const conexao = await conexaoBanco(process.env.STRING_CONEXAO)

export async function getTodosPosts(){
  const db = conexao.db("imersao-instabytes");
  const collection = db.collection("posts");
  return collection.find().toArray();
}

export async function criarPost(novoPost) {
  const db = conexao.db("imersao-instabytes");
  const collection = db.collection("posts");
  return collection.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db("imersao-instabytes");
  const collection = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  return collection.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});
}

