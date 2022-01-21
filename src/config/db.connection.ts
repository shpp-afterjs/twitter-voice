import { createConnection } from 'typeorm';
import { Users } from '../entity/users';

export const db = async () => {
  try {
    const {
      HOST_DB, USERNAME_DB, PASSWORD_DB, NAME_DB,
    } = process.env;
    await createConnection({
      type: 'postgres',
      host: HOST_DB,
      port: 5432,
      entities: [Users],
      username: USERNAME_DB,
      password: PASSWORD_DB,
      database: NAME_DB,
      synchronize: true,
    });
    console.log('Connected to DB');
  } catch (e) {
    console.log(`Connection crashed with error: ${e}`);
  }
};
