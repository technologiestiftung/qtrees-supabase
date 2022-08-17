ALTER TABLE "public"."issue_types" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."issues" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON "public"."issues" AS permissive
	FOR SELECT TO public
		USING (TRUE);

CREATE POLICY "Enable read access for all users" ON "public"."issue_types" AS permissive
	FOR SELECT TO public
		USING (TRUE);

