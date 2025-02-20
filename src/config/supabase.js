import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = ""; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = ""; // Replace with your Supabase Anon Key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
