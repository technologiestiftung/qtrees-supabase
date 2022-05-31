import { readJson } from "https://deno.land/x/jsonfile/mod.ts";

const json = await readJson("./bezirksgrenzen.geojson") as {
  features: Record<string, any>[];
};
console.log(json.features);

const values = json.features.map((feature) => {
  const randIndex = (Math.floor(
    Math.random() * 7,
  ));
  const daysMap = new Map()
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `('${days[randIndex]
    } ${feature.properties.Gemeinde_name}', ST_GeomFromGeoJSON ('${JSON.stringify(feature.geometry)
    }'), '0 8 * * ${randIndex}', (
    SELECT
      id
    FROM
      public.profiles OFFSET floor(random() * (
        SELECT
          count(1)
        FROM public.profiles))
    LIMIT 1))`;
});

const statement =
  `INSERT INTO public.subscriptions (description, geom, cron, profile_id) VALUES ${values.join(",")
  };`;
// console.log(statement);

await Deno.writeTextFile("./subscriptions.sql", statement);
