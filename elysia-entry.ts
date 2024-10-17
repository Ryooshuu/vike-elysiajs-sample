import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { vite } from "elysia-vite-server";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { renderPage } from "vike/server";
import { appController } from "./server/_app";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;

export default (await main()) as unknown;

async function main() {
  const app = new Elysia();

  // Vite Middleware (Development) and Static Assets (Production)
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

  // Health check
  app.get("/health", async (c) => {
    return { status: "ok" };
  });

  // OpenAPI Documentation
  app.use(
    swagger({
      path: "/api/docs",
      // Don't include obvious endpoints in doc
      exclude: ["/api/docs", "api/docs/json", "/health"],
      scalarVersion: "latest",
      documentation: {
        info: {
          title: "",
          version: "0.0.1",
        },
        tags: [
          { name: "Todo", description: "Todo endpoints" },
          { name: "Auth", description: "Authentication endpoints" },
        ],
      },
    })
  );

  // Error Handler
  app.onError(({ error }) => {
    
    // Replace with your custom logger or add Sentry here.
    console.error(error);
  });

  // API Routes
  app.use(appController);

  // Vike Frontend Handler
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
