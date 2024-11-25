import { MongoClient } from "mongodb";

export default async function conexaoBanco(stringConexao) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(stringConexao);
    console.log('Conectando ao cluster do banco de dados...');
    await mongoClient.connect();
    console.log('Conectado com sucesso.');

    return mongoClient;
  } catch (erro) {
    console.error('Erro ao conectar ao cluster do bando de dados.', erro);
    process.exit();
  }

}