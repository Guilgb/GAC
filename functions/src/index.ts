import * as functions from "firebase-functions";
import {NestFactory} from "@nestjs/core";
import {ExpressAdapter} from "@nestjs/platform-express";
import * as express from "express";
import {AppModule} from "../../src/app.module";

const server = express();

const createNestServer = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  );

  app.enableCors({
    origin: "*", // Permitir todas as origens
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Permitir todos os métodos HTTP
    credentials: true, // Permitir envio de cookies e cabeçalhos de autorização
  });
  await app.init();
};

createNestServer(server)
  .then(() => console.log("Nest Ready"))
  .catch((err) => console.error("Nest broken", err));

export const api = functions.https.onRequest(server);
