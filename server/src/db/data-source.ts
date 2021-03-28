import knex from 'knex';

export const DB = knex({
  client: 'pg',
  connection: {
    user: 'admin',
    password: 'password',
    port: 5432,
    database: 'project',
    host: 'db',
  },
});

export default DB;
