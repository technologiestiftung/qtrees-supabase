CREATE POLICY "Enable insert for anon users only" ON "public"."issues" AS permissive
	FOR INSERT TO anon
		WITH CHECK (TRUE);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."issues" AS permissive
	FOR INSERT TO authenticated
		WITH CHECK (TRUE);

