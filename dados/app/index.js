const { Pool, Client } = require("pg");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  //Criar client de conexão com o Banco de dados Postgres
  const client = new Client({
    host: "172.28.128.8",
    user: "usr",
    password: "pass",
    database: "db",
    port: 5432,
  });
  //Realizar a conexão com Postgres
  await client.connect();

  //Faz a consulta ao BD para buscar a hora atual
  await client.query("SELECT NOW();", (err, resp) => {
    //Coleta o retorno da requisição
    const currentTime = resp.rows[0].now;
    const returnObj = {
      message: "Está funcionando",
      horario: currentTime,
    };
    res.send(returnObj);
    //Fecha a conexão
    client.end();
  });
});

app.listen(port, () => {
  console.log(`Aplicação rodando na porta : ${port}`);
});
