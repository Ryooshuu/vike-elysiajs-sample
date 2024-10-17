import Elysia from "elysia";

export const todoController = new Elysia({
  tags: ["Todo"],
  prefix: "/todos",
}).get("/", async (c) => {
  return [{ id: 1, title: "todo 1" }];
});
