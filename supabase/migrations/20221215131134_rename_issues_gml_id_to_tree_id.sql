alter table "public"."issues" drop column "gml_id";

alter table "public"."issues" add column "tree_id" text not null;


