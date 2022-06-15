// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
const ml_pgrest_host = Deno.env.get("ML_PGREST_HOST");
const ml_pgrest_user = Deno.env.get("ML_PGREST_USER");
const ml_pgrest_password = Deno.env.get("ML_PGREST_PASSWORD");
const ml_pgrest_port = Deno.env.get("ML_PGREST_PORT");
const jwt_secret = Deno.env.get("JWT_SECRET");
import { supabaseClient } from "../_shared/supabase-client.ts";

if (ml_pgrest_host === undefined || ml_pgrest_user === undefined || ml_pgrest_password === undefined || ml_pgrest_port === undefined || jwt_secret === undefined) {
  console.error("Missing environment variables: ML_PGREST_HOST, ML_PGREST_USER, ML_PGREST_PASSWORD, ML_PGREST_PORT, JWT_SECRET");
  Deno.exit(1);
}


// find limit in url.search and replace with mx of 100000
function set_limit(url: URL, amount: number): URL {
  const limit = url.searchParams.get("limit");
  if (limit) {
    if (parseInt(limit, 10) > amount) {
      url.searchParams.set("limit", `${amount}`);
    }
  } else {
    url.searchParams.set("limit", `${amount}`);
  }
  return url;
}
const body_not_authorized = JSON.stringify({ message: "Not authorized" })
const header_not_authorized = { headers: { 'Content-Type': 'application/json' }, status: 401 };
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
}

serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response('ok', { headers: corsHeaders })
  }

  const session = supabaseClient.auth.setAuth(req.headers.get("Authorization")!.replace("Bearer ", ""))
  const { data, error } = await supabaseClient.from('profiles').select('*')
  console.log({ data, error });

  // if (session. ) {
  //   return new Response(body_not_authorized, header_not_authorized)
  // }
  // if (!user) {
  //   console.error("User not found");
  //   return new Response(body_not_authorized, header_not_authorized);
  // } else {
  //   console.log(user);
  // }


  let url = new URL(req.url);
  url = set_limit(url, 100_000);

  const target_url = `${ml_pgrest_host}:${ml_pgrest_port}${url.pathname}${url.search}`;
  const res = await fetch(target_url);


  if (!res.ok) {
    console.error(`Error fetching ${ml_pgrest_host}:${ml_pgrest_port}`);
    Deno.exit(1);
  }
  const json = await res.json();

  if (url.pathname === "/") {

    const paths = Object.keys(json.paths).filter(p => p !== "/" && p !== "/rpc/login");
    if (!paths.includes(url.pathname)) {
      return new Response(JSON.stringify({ paths }), { headers: { 'Content-Type': 'application/json' } });
    }
  }




  return new Response(
    JSON.stringify(json),
    { headers: { "Content-Type": "application/json" } },
  )
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
