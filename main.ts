import { Hono } from 'hono';
import { MakeHome } from "./home.tsx";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const app = new Hono();

  app.get("/", (c) => {
    return MakeHome();
  })
  app.post("/create", (c) => {
    
  })

  Deno.serve(app.fetch);
}
