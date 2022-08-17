CREATE TABLE "public"."issue_types" (
	"id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text
);

CREATE TABLE "public"."issues" (
	"id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
	"issue_type_id" integer NOT NULL,
	"created_at" timestamp with time zone NOT NULL DEFAULT now(),
	"gml_id" text NOT NULL
);

CREATE UNIQUE INDEX issue_types_pkey ON public.issue_types USING btree (id);

CREATE UNIQUE INDEX issues_pkey ON public.issues USING btree (id);

ALTER TABLE "public"."issue_types"
	ADD CONSTRAINT "issue_types_pkey" PRIMARY KEY USING INDEX "issue_types_pkey";

ALTER TABLE "public"."issues"
	ADD CONSTRAINT "issues_pkey" PRIMARY KEY USING INDEX "issues_pkey";

ALTER TABLE "public"."issues"
	ADD CONSTRAINT "fk_issue_type" FOREIGN KEY (issue_type_id) REFERENCES issue_types (id) ON DELETE CASCADE NOT valid;

ALTER TABLE "public"."issues" validate CONSTRAINT "fk_issue_type";

