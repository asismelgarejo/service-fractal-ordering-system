import { configure as serverlessExpress } from "@vendia/serverless-express";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import Application from "./main";

async function bootstrap(): Promise<any> {
  const app = new Application();
  await app.Init();
  return serverlessExpress({
    app: app.app,
  });
}
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const cachedServer = await bootstrap();
  return cachedServer(event, context);
};
