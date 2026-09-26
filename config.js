// BuyQora — Supabase config
// Fill these in from your Supabase project:
// Project Settings → API → Project URL, and the "anon public" key
// (Never put your service_role key here — only the anon key belongs in client-side code.)

const SUPABASE_URL = "PASTE_YOUR_PROJECT_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_YOUR_ANON_KEY_HERE";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);