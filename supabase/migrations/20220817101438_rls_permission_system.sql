ALTER TABLE "public"."role_permissions" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."user_roles" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON "public"."role_permissions" AS permissive
    FOR SELECT TO public
        USING (TRUE);

CREATE POLICY "Enable read access for all users" ON "public"."user_roles" AS permissive
    FOR SELECT TO public
        USING (TRUE);

