import Elysia from "elysia";

export const authController = new Elysia({
  tags: ["Auth"],
  prefix: "/auth",
}).get("/", async (c) => {
  return [{ id: 1, name: "Saryu" }];
});
