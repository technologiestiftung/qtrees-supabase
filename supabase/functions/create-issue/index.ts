// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { corsHeaders } from "../_shared/cors.ts";
import { Application, Router } from "./deps.ts";
import { oakCors } from "./cors_oak.ts";

// serve((req: Request) => {
// 	console.log(req);
// 	// This is needed if you're planning to invoke your function from a browser.
// 	if (req.method === "OPTIONS") {
// 		return new Response("ok", { headers: corsHeaders });
// 	}
// 	return new Response(JSON.stringify({ data: "foo" }), {
// 		headers: { "Content-Type": "application/json" },
// 	});
// });

const router = new Router();

const app = new Application();

router.post("/", (ctx) => {
	console.log(ctx.request);
	ctx.response.body = JSON.stringify({ data: "foo" });
});
app.use(
	oakCors({
		origin: (requestOrigin) => {
			if (!requestOrigin) {
				console.log("requestOrigin is undefined");
				return false;
			} else {
				throw new Error("Not allowed by CORS");
			}
		},
		allowedHeaders: corsHeaders["Access-Control-Allow-Headers"],
		// optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	}),
);
app.use(router.routes());

console.info("CORS-enabled web server listening on port 8000");
await app.listen({ port: 8000 });

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
