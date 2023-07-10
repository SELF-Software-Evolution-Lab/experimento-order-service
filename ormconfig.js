/* eslint-disable @typescript-eslint/no-var-requires */
const ormBasePath = ['development', 'test'].includes(process.env.NODE_ENV)
  ? 'src'
  : 'dist';

const path = require('path');
const dotenv = require('dotenv');

const envConfig = dotenv.config({
  path: path.resolve(
    __dirname,
    `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
  ),
});

function env(key) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (envConfig && envConfig.parsed && envConfig.parsed[key]) || process.env[key]
  );
}

module.exports = {
  host: env('POSTGRES_HOST'),
  port: env('POSTGRES_PORT'),
  username: env('POSTGRES_USERNAME'),
  password: env('POSTGRES_PASSWORD'),
  database: env('POSTGRES_DATABASE'),
  type: 'postgres',
  entities: [path.resolve(__dirname, ormBasePath, '**/*.entity{.ts,.js}')],
  migrations: [
    path.resolve(__dirname, ormBasePath, 'database/migrations/*{.ts,.js}'),
  ],
  logger: 'advanced-console',
  logging: ['warn', 'error'],
  keepConnectionAlive: true,
  cli: {
    migrationsDir: path.resolve(__dirname, ormBasePath, 'database/migrations'),
  },
  synchronize: true,
};
