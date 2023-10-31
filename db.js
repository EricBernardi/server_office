import sql from "mssql";
import mysql from "mysql2";
import dotenv from "dotenv";
import { Sequelize, DataTypes } from "sequelize";
import * as tedious from "tedious";

dotenv.config();

class DB {
  requester = "";
  item = "";
  sequelize = "";
  constructor() {
    this.sequelize = new Sequelize(
      "OFFICE",
      "root",
      process.env.DATABASE_PASSWORD,
      {
        host: "localhost",
        dialect: "mysql",
      }
    );
  }

  async handleCreateTable() {
    this.requester = await this.sequelize.define("requesters", {
      name: {
        type: DataTypes.STRING,
      },
      item: {
        type: DataTypes.TEXT,
      },
    });

    this.item = await this.sequelize.define("items", {
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.STRING,
      },
    });

    this.sequelize
      .sync()
      .then(() => {
        console.log("Tabelas criadas com sucesso.");
      })
      .catch((error) => {
        console.error("Erro ao criar tabelas:", error);
      });
  }

  async setarRequester() {
    const requester = await this.requester.build({
      name: "Nome do Solicitante",
    });
    const item = await this.item.build({
      description: "Descrição do Item",
      price: "Preço do Item",
    });

    requester.save().then(() => {
      console.log('Deu certo!')
    }).catch((error) => {
      console.error('Erro ao adicionar solicitante:', error);
    });
        console.log('Item adicionado com sucesso.');
    item.save().then(() => {}).catch((error) => {
      console.error('Erro ao adicionar item: ', error)
    })
  }
}

export default DB;
