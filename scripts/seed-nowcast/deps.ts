import postgres from "https://deno.land/x/postgresjs@v3.2.4/mod.js";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { parse } from "https://deno.land/std@0.154.0/flags/mod.ts";
export { postgres, config, parse };
