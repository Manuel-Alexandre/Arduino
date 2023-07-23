const { Client } = require('pg');
const dbConfig = require('./dbConfig');

const insertData = (temp, humid) => {
  // if (isNaN(temp) || isNaN(humid)) {
  //   console.error("Dados inválidos");
  //   process.exit(1);
  // }

  const client = new Client(dbConfig);

  client.connect((err) => {
    if (err) {
      console.error("Não foi possível estabelecer conexão com o BD:", err.message);
      process.exit(1);
    }

    const sql = `INSERT INTO weather (wea_temp, wea_humid) VALUES ($1, $2)`;
    const values = [temp, humid];

    client.query(sql, values, (err, result) => {
      client.end();

      if (err) {
        console.error("Erro na gravação dos dados no BD:", err.message);
        process.exit(1);
      }

      console.log("Dados gravados com sucesso");
      process.exit(0);
    });
  });
};

// Obtém os valores de temperatura e umidade a partir dos argumentos da linha de comando
const temp = parseFloat(process.argv[2]);
const humid = parseFloat(process.argv[3]);

insertData(temp, humid);
