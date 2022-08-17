ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON "public"."profiles" AS permissive
    FOR SELECT TO public
        USING (TRUE);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" AS permissive
    FOR INSERT TO public
        WITH CHECK ((auth.uid () = id));

CREATE POLICY "Users can update their own profile." ON "public"."profiles" AS permissive
    FOR UPDATE TO public
        USING ((auth.uid () = id));

