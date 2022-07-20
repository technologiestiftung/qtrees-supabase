// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "./deps.ts";
import { set_limit } from "./utils.ts";
// import { verify } from "https://deno.land/x/djwt@v2.7/mod.ts";
const ml_pgrest_host = Deno.env.get("ML_PGREST_HOST");
const ml_pgrest_user = Deno.env.get("ML_PGREST_USER");
const ml_pgrest_password = Deno.env.get("ML_PGREST_PASSWORD");
const ml_pgrest_port = Deno.env.get("ML_PGREST_PORT");
const jwt_secret = Deno.env.get("SB_JWT_SECRET");
// import { supabaseClient } from "../_shared/supabase-client.ts";

if (
	ml_pgrest_host === undefined ||
	ml_pgrest_user === undefined ||
	ml_pgrest_password === undefined ||
	ml_pgrest_port === undefined ||
	jwt_secret === undefined
) {
	console.error(
		"Missing environment variables: ML_PGREST_HOST, ML_PGREST_USER, ML_PGREST_PASSWORD, ML_PGREST_PORT, JWT_SECRET",
	);
	Deno.exit(1);
}

// const body_internal_server_error = JSON.stringify({
// 	message: "internal server error",
// });
// const body_not_authorized = JSON.stringify({ message: "Not authorized" });
// const header_not_authorized = {
// 	headers: { "Content-Type": "application/json" },
// 	status: 401,
// };

const body_missing_gml_id_param = JSON.stringify({
	message: "missing gml_id search param",
});
const header_wrong_request = {
	headers: { "Content-Type": "application/json" },
	status: 400,
};

const header_internal_server_error = {
	headers: { "Content-Type": "application/json" },
	status: 500,
};
const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "authorization, x-client-info, apikey",
};

serve(async (req: Request) => {
	try {
		// This is needed if you're planning to invoke your function from a browser.
		if (req.method === "OPTIONS") {
			return new Response("ok", { headers: corsHeaders });
		}

		/*
  // This block of code adds auth using supabase js sdk
  // not needed right now but good to keep around for the next iteration


	const session = supabaseClient.auth.setAuth(
	  req.headers.get("Authorization")!.replace("Bearer ", ""),
	);
	server side user verfification
	https://github.com/supabase/supabase/issues/147#issuecomment-949953227

	const { data: user, error: user_error } = await supabaseClient.auth.api
	  .getUser(session.access_token);

	if (user_error) {
	  return new Response(body_internal_server_error, header_internal_server_error);
	}
	if (!user) {
	  return new Response(body_not_authorized, header_not_authorized);
	}

	console.log({ token: session.access_token, jwt_secret, user });
	const { data: profile, error: error_profile } = await supabaseClient.from("profiles").select(
	  `
	    id,
	    user_roles (
	      role, user_id
	    )
	  `,
	).eq("id", user.id).single();

	if (error_profile) {
	  return new Response(body_internal_server_error, header_internal_server_error);
	}
	if (!profile) {
	  return new Response(body_not_authorized, header_not_authorized);
	}
	if (!profile.user_roles.some((user_role: { role: "admin" | "viewer" | "editor" }) => user_role.role === "admin")) {
	  return new Response(body_not_authorized, header_not_authorized);
	}

	if (session. ) {
	  return new Response(body_not_authorized, header_not_authorized)
	}
	if (!user) {
	  console.error("User not found");
	  return new Response(body_not_authorized, header_not_authorized);
	} else {
	  console.log(user);
	}
  */

		let url = new URL(req.url);

		const searchParams = url.searchParams;
		if (
			url.pathname.replace("/ml-api-passthrough", "") === "/trees" &&
			!searchParams.has("gml_id")
		) {
			return new Response(body_missing_gml_id_param, header_wrong_request);
		}
		url = set_limit(url, 100_000);

		const target_url = `${ml_pgrest_host}:${ml_pgrest_port}${url.pathname.replace(
			"/ml-api-passthrough",
			"",
		)}${url.search}`;

		const res = await fetch(target_url);

		if (!res.ok) {
			const message = await res.text();
			console.error(
				`Error fetching ${ml_pgrest_host}:${ml_pgrest_port} status: ${res.status} message: ${message}`,
			);

			return new Response(
				JSON.stringify({ message }),
				header_internal_server_error,
			);
		}
		const json = await res.json();

		if (url.pathname === "/") {
			const paths = Object.keys(json.paths).filter(
				(p) => p !== "/" && p !== "/rpc/login",
			);
			if (!paths.includes(url.pathname)) {
				return new Response(JSON.stringify({ paths }), {
					headers: { "Content-Type": "application/json" },
				});
			}
		}

		return new Response(JSON.stringify(json), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ message: error.message }),
			header_internal_server_error,
		);
	}
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
