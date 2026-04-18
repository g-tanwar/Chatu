const { Client } = require('pg');
const client = new Client({
  host: 'dpg-d33hh4adbo4c73b80fu0-a.oregon-postgres.render.com',
  port: 5432,
  user: 'chatu_user',
  password: process.env.DB_PASSWORD,
  database: 'chatu',
  ssl: { rejectUnauthorized: false }
});
client.connect()
  .then(() => { console.log('Connected!'); client.end(); })
  .catch(e => console.error('Error connecting:', e));
