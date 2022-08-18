import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { Cors } from "https://deno.land/x/cors@v1.2.2/cors.ts";
export {
	type CorsOptions,
	type CorsOptionsDelegate,
} from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";

export { Application, Router, Cors, serve };
