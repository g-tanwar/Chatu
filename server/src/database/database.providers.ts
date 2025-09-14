import { Sequelize } from 'sequelize-typescript';
import { Channel } from 'src/channel/channel.entity';
import { Message } from 'src/message/message.entity';
import { User } from 'src/user/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'dpg-d33hh4adbo4c73b80fu0-a.oregon-postgres.render.com',
        port: 5432,
        username: 'chatu_user',
        password: process.env.DB_PASSWORD,
        database: 'chatu'
      });
      sequelize.addModels([User, Message, Channel]);
      await sequelize.sync();
      return sequelize;
    }
  }
];
