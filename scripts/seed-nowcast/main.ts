import { postgres, config, parse } from "./deps.ts";
import { noise } from "./noise.ts";

// const db_url = "postgres://postgres:postgres@localhost:5432/postgres";
const envs = config();
// console.log(envs);
const { ML_PG_PASSWORD, ML_PG_HOST, ML_PG_USER, ML_PG_DB, ML_PG_PORT } = envs;

const parsed_args: {
	u: boolean;
	update: boolean;
	h: boolean;
	help: boolean;
} = parse(Deno.args, {
	boolean: ["help", "update"],
	default: { update: true, help: false },
	alias: { u: "update", h: "help" },
});

if (parsed_args.help) {
	console.info(
		`Usage: deno run --allow-net --allow-env --allow-read  --unstable main.ts
Options:
  -u, --update  Update the database nowcast table with new data for today (default: true)",

  -h, --help    Show this help message`,
	);
	Deno.exit(0);
}

// const db_url = `postgres://${ML_PG_USER}:${ML_PG_PASSWORD}@${ML_PG_HOST}:${ML_PG_PORT}/${ML_PG_DB}`;

const sql = postgres({
	host: ML_PG_HOST,
	port: !isNaN(parseInt(ML_PG_PORT, 10)) ? parseInt(ML_PG_PORT, 10) : 5432,
	user: ML_PG_USER,
	password: ML_PG_PASSWORD,
	database: ML_PG_DB,
});
/*
Need to restart the process using this query
SELECT
	t.gml_id
FROM
	api.trees t
	JOIN api.nowcast n ON t.gml_id = n.baum_id
WHERE
	n.baum_id IS NULL
	AND t.bezirk = 'Mitte'
	OR t.bezirk = 'Neukölln';
*/
let tree_ids: postgres.RowList<postgres.Row[]>;

if (!parsed_args.update) {
	// This will create new nowcasts for all trees in the bezirk
	tree_ids =
		await sql`SELECT gml_id FROM api.trees where bezirk = 'Neukölln' or bezirk = 'Mitte'`;
} else {
	// This will update only half of all trees to have new values
	tree_ids =
		await sql`SELECT gml_id FROM api.trees WHERE bezirk = ANY (ARRAY ['Neukölln','Mitte']) ORDER BY random() LIMIT (( SELECT count(1) FROM api.trees t WHERE t.bezirk = ANY (ARRAY ['Neukölln','Mitte'])) / 2);`;
}

const forecast_types = await sql`SELECT id FROM api.forecast_types`;

const last_nowcast_ids =
	await sql`SELECT id FROM api.nowcast ORDER BY id DESC LIMIT 1`;

const last_nowcast_id =
	last_nowcast_ids.length > 0 ? (last_nowcast_ids[0].id as number) : 1;

const createValues: (xoff: number) => number = (xoff) => {
	switch (xoff) {
		case 1:
			return noise(xoff) * 100;
		case 2:
			return noise(xoff) * 150;
		case 3:
			return noise(xoff) * 200;
		case 4:
			return noise(xoff) * 239;
		default:
			return Math.random() * 239;
	}
};
let id_counter = last_nowcast_id + 1;
for (const id of tree_ids) {
	const { gml_id } = id;
	let xoff = 0.0;
	for (const type of forecast_types) {
		// console.log(`${type_id.id} ${gml_id}`);
		xoff += 0.01;
		await sql`INSERT INTO api.nowcast (
			id,
			baum_id,
			type_id,
			model_id,
			value,
			timestamp,
			created_at
			) VALUES
			(
				${id_counter},
				${gml_id},
				${type.id},
				'dummy data',
				${createValues(xoff)},
					NOW(),
					NOW())`;
		id_counter++;
	}
}

sql.end();
