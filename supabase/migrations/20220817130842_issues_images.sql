INSERT INTO storage.buckets (id, name)
	VALUES ('issue_images', 'issue_images');

CREATE POLICY "Public Access" ON "storage"."objects" AS permissive
	FOR SELECT TO public
		USING ((bucket_id = 'issue_images'::text));

