import Elysia from "elysia";

import { authController } from "./modules/auth/auth.controller";
import { todoController } from "./modules/todos/todos.controller";

export const appController = new Elysia({
  prefix: "/api",
})
  .use(todoController)
  .use(authController);

/** Can use this for Eden Treaty */
export type AppType = typeof appController;
