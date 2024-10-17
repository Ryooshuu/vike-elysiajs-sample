import Elysia from "elysia";
import { vite } from "elysia-vite-server";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { renderPage } from "vike/server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;

export default (await main()) as unknown;

async function main() {
  const app = new Elysia();

  app.use(vite({
    static: {
      assets: `${root}/dist/client`,
      alwaysStatic: false,
      noCache: true
    },
    vite: {
      root,
      server: { middlewareMode: true },
    }
  }));

  app.get("*", async ({ request }) => {
    const pageContextInit = {
      urlOriginal: request.url
    };

    const { httpResponse } = await renderPage(pageContextInit);

    if (!httpResponse)
      return;

    const { statusCode, headers } = httpResponse;
    const { readable, writable } = new TransformStream();

    httpResponse.pipe(writable);

    return new Response(readable, {
      status: statusCode,
      headers: headers
    });
  });

  app.listen(3000, () => {
    console.log(`Server listening at http://localhost:${3000}`);
  })
}
