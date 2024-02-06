import Application from "./main";

async function bootstrap(): Promise<any> {
  const app = new Application();
  await app.Init();
}

(async () => {
  await bootstrap();
})();
