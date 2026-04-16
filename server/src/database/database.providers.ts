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
        host: 'dpg-d7gi3lnlk1mc73c58eeg-a.oregon-postgres.render.com',
        port: 5432,
        username: 'chatu_y3x4_user',
        password:  process.env.DB_PASSWORD,
        database: 'chatu_y3x4',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        },
        logging: false,
      });
      sequelize.addModels([User, Message, Channel]);
      await sequelize.sync();
      return sequelize;
    }
  }
];
