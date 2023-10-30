import mysql from "mysql2";
import dotenv from "dotenv";
import Sequelize from "sequelize";
import * as tedious from "tedious";

dotenv.config();

class DB {
  constructor() {
    this.con = new Sequelize({
      dialect: "mssql",
      dialectModule: tedious,
      host: "ERICBERNARDIMSSQLSERVER01",
      database: "OFFICE",
      username: "ERICBERNARDI", // Substitua pelo nome de usuário do Windows
      dialectOptions: {
        authentication: {
          type: "ntlm", // Usar autenticação do Windows
        },
      },
    });
  }

  testConnection() {
    try {
      this.con.authenticate();
      console.log("Conexão com o banco de dados bem-sucedida.");
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
    }
  }

  handleCreateTable() {
    this.con.define("requester", {
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      item_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      item_price: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  }

  updateDatabase() {
    this.con
      .sync()
      .then(() => {
        console.log("Tabela de Requester criada com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao criar a tabela de Requester:", error);
      });
  }
}

export default DB;
