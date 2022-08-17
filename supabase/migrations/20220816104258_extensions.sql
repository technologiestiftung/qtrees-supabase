CREATE EXTENSION IF NOT EXISTS "moddatetime" WITH SCHEMA "public" version '1.0';

CREATE EXTENSION IF NOT EXISTS "postgis" WITH SCHEMA "public" version '3.1.4';

-- DROP TYPE IF EXISTS "public"."geometry_dump";
-- DROP TYPE IF EXISTS "public"."valid_detail";
-- CREATE TYPE "public"."geometry_dump" AS (
-- 	"path" integer[],
-- 	"geom" geometry
-- );
-- CREATE TYPE "public"."valid_detail" AS (
-- 	"valid" boolean,
-- 	"reason" character varying,
-- 	"location" geometry
-- );
