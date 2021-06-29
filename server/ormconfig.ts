export default {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "emric",
    password: process.env.TYPEORM_PASSWORD,
    database: "food-ordering",
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.*"],
    migrations: ["src/migration/**/*.*"],
    subscribers: ["src/subscriber/**/*.*"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  };
  