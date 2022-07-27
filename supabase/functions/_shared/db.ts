// db.js
// import postgres from "https://deno.land/x/postgresjs@v3.2.4/mod.js";
import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

const user = Deno.env.get("ML_PG_USER");
const password = Deno.env.get("ML_PG_PASSWORD");
const host = Deno.env.get("ML_PG_HOST");
const s_port = Deno.env.get("ML_PG_PORT");
const database = Deno.env.get("ML_PG_DB");
const port = s_port ? parseInt(s_port) : undefined;
if (
	user === undefined ||
	password === undefined ||
	database === undefined ||
	port === undefined ||
	host === undefined
) {
	console.error(
		"Missing environment variables: ML_PG_DB, ML_PG_PORT, ML_PG_HOST, ML_PG_USER, ML_PG_PASSWORD",
	);
	Deno.exit(1);
}

const client = new Client({
	user,
	database,
	hostname: host,
	port,
	password,
});

export default client;
