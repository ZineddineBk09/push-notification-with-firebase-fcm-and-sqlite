import { Sequelize } from "sequelize";

// In case of using MySQL, uncomment the following lines
/**import { MySqlDialect } from '@sequelize/mysql';

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: 'mydb',
  user: 'myuser',
  password: 'mypass',
  host: 'localhost',
  port: 3306,
}); */

// In case of using MySQL, comment the following lines
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "notifications.sqlite",
});

export default sequelize;
