import { createClient } from "https://esm.sh/@supabase/supabase-js@1.35.4";

export const supabaseClient = createClient(
	// Supabase API URL - env var exported by default when deployed.
	Deno.env.get("SUPABASE_URL") ?? "",
	// Supabase API ANON KEY - env var exported by default when deployed.
	Deno.env.get("SUPABASE_ANON_KEY") ?? "",
);
